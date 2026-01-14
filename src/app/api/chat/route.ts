import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Khởi tạo Gemini AI
const ai = new GoogleGenAI({});

// System prompt để định hình AI chỉ trả lời về chủ nghĩa xã hội
const SYSTEM_PROMPT = `
Bạn là một trợ lý học thuật chuyên về CHỦ NGHĨA XÃ HỘI. Bạn CHỈ trả lời các câu hỏi liên quan đến chủ nghĩa xã hội, bao gồm:

1. Khái niệm, mục tiêu, lý tưởng và giá trị cốt lõi của chủ nghĩa xã hội
2. Sáu đặc trưng cơ bản của chủ nghĩa xã hội (giải phóng; kinh tế; chính trị; nhà nước; văn hóa; quốc tế)
3. Nguyên tắc tổ chức và vận hành xã hội theo định hướng xã hội chủ nghĩa (công bằng, dân chủ, tiến bộ xã hội...)
4. Các thuật ngữ thường gặp (công hữu, tư liệu sản xuất, nhân dân lao động làm chủ, nhà nước kiểu mới...)
5. Phân biệt khái quát giữa chủ nghĩa xã hội và các mô hình/quan điểm khác (ở mức giải thích giáo dục)

Quy tắc trả lời:
- Nếu câu hỏi KHÔNG liên quan đến chủ nghĩa xã hội, hãy từ chối lịch sự và gợi ý người dùng hỏi lại theo chủ đề chủ nghĩa xã hội
- Trả lời bằng tiếng Việt, ngắn gọn nhưng rõ ý; ưu tiên gạch đầu dòng khi phù hợp
- Không bịa đặt số liệu/sự kiện; nếu không chắc, hãy nói rõ mức độ không chắc và đề xuất hướng kiểm chứng

Giọng điệu: khách quan, dễ hiểu, mang tính giáo dục.
`;

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Tin nhắn không được để trống" },
        { status: 400 }
      );
    }

    const allowedModels = ["gemini-2.5-pro", "gemini-2.5-flash"] as const;
    type AllowedModel = (typeof allowedModels)[number];
    const selectedModel = allowedModels.includes(model as AllowedModel)
      ? (model as AllowedModel)
      : "gemini-2.5-pro";

    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key chưa được cấu hình" },
        { status: 500 }
      );
    }

    // Tạo prompt hoàn chỉnh
    const fullPrompt = `${SYSTEM_PROMPT}

Câu hỏi của người dùng: ${message}

Hãy trả lời:`;

    // Tạo ReadableStream để streaming response với buffer tối ưu
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Gửi request đến Gemini với streaming
          const response = await ai.models.generateContentStream({
            model: selectedModel,
            contents: fullPrompt,
          });

          let buffer = "";
          const encoder = new TextEncoder();

          // Đọc stream từng chunk với buffer để tối ưu hiệu suất
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              buffer += text;

              // Gửi buffer theo từng đoạn nhỏ để mượt mà hơn
              while (buffer.length > 0) {
                const sendLength = Math.min(buffer.length, 3); // Gửi tối đa 3 ký tự mỗi lần
                const sendText = buffer.substring(0, sendLength);
                buffer = buffer.substring(sendLength);

                const data =
                  JSON.stringify({
                    type: "chunk",
                    content: sendText,
                  }) + "\n";

                controller.enqueue(encoder.encode(data));

                // Thêm delay nhỏ để tạo hiệu ứng typing mượt mà
                if (buffer.length > 0) {
                  await new Promise((resolve) => setTimeout(resolve, 30));
                }
              }
            }
          }

          // Gửi signal kết thúc
          const endData =
            JSON.stringify({
              type: "end",
            }) + "\n";
          controller.enqueue(encoder.encode(endData));
          controller.close();
        } catch (error) {
          console.error("Gemini AI Streaming Error:", error);

          // Gửi fallback response
          const fallbackResponses = ["Xin lỗi, tôi đang gặp sự cố kỹ thuật!!!"];

          const randomResponse =
            fallbackResponses[
              Math.floor(Math.random() * fallbackResponses.length)
            ];

          const errorData =
            JSON.stringify({
              type: "chunk",
              content: randomResponse,
            }) + "\n";
          controller.enqueue(new TextEncoder().encode(errorData));

          const endData =
            JSON.stringify({
              type: "end",
            }) + "\n";
          controller.enqueue(new TextEncoder().encode(endData));
          controller.close();
        }
      },
    });

    // Trả về streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi không mong muốn" },
      { status: 500 }
    );
  }
}
