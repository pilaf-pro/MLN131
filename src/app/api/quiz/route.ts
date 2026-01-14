import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Khởi tạo Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

type RawQuizQuestion = {
  category?: unknown;
  question?: unknown;
  options?: unknown;
  correct?: unknown;
  explanation?: unknown;
  difficulty?: unknown;
} & Record<string, unknown>;

type QuizQuestionPayload = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
};

// System prompt để tạo quiz về chủ nghĩa xã hội
const QUIZ_SYSTEM_PROMPT = `
Bạn là một trợ lý học thuật chuyên về CHỦ NGHĨA XÃ HỘI. Hãy tạo một bộ câu hỏi trắc nghiệm về chủ nghĩa xã hội.

Yêu cầu:
1. Tạo CHÍNH XÁC 12 câu hỏi
2. Mỗi câu hỏi phải có 4 đáp án
3. Các câu hỏi phải đa dạng về các chủ đề: Khái Niệm, Đặc Trưng, Kinh Tế, Chính Trị, Nhà Nước, Văn Hóa, Quốc Tế
4. Mỗi câu hỏi phải có độ khó: Dễ, Trung bình, hoặc Khó
5. Mỗi câu hỏi phải có giải thích chi tiết cho đáp án đúng
6. Nội dung phải chính xác, mang tính giáo dục; tránh tuyên truyền cực đoan và không bịa số liệu

Trả về kết quả CHÍNH XÁC theo định dạng JSON sau (KHÔNG thêm bất kỳ text nào khác):
{
  "questions": [
    {
      "id": 1,
      "category": "Tiểu Sử",
      "question": "Câu hỏi ở đây?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correct": 0,
      "explanation": "Giải thích chi tiết",
      "difficulty": "Dễ"
    }
  ]
}

CHÚ Ý:
- "correct" là index của đáp án đúng (0, 1, 2, hoặc 3)
- "category" phải là một trong: "Khái Niệm", "Đặc Trưng", "Kinh Tế", "Chính Trị", "Nhà Nước", "Văn Hóa", "Quốc Tế"
- "difficulty" phải là một trong: "Dễ", "Trung bình", "Khó"
- CHỈ trả về JSON, KHÔNG thêm markdown, code block hay text giải thích
`;

export async function GET() {
  try {
    // Kiểm tra API key
    if (!ai) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return NextResponse.json(
        { error: "API key chưa được cấu hình cho Gemini." },
        { status: 500 }
      );
    }

    // Gửi request đến Gemini để tạo quiz
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        {
          role: "user",
          parts: [{ text: QUIZ_SYSTEM_PROMPT }],
        },
      ],
    });

    const responseText = response.text?.trim() || "";

    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    let cleanedText = responseText;
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(cleanedText);
    const rawQuestions: unknown[] = Array.isArray(parsed.questions)
      ? parsed.questions
      : [];

    const sanitizedQuestions = rawQuestions
      .filter(
        (item: unknown): item is RawQuizQuestion =>
          typeof item === "object" && item !== null
      )
      .map<QuizQuestionPayload>((question: RawQuizQuestion, index: number) => {
        const optionsRaw: unknown[] = Array.isArray(question.options)
          ? question.options.slice(0, 4)
          : [];
        const options =
          optionsRaw.length === 4
            ? optionsRaw.map((option) => String(option))
            : [];

        const correctIndexRaw = Number.isInteger(question.correct)
          ? Number(question.correct)
          : -1;
        const correctIndex =
          correctIndexRaw >= 0 && correctIndexRaw <= 3 ? correctIndexRaw : -1;

        return {
          id: index + 1,
          category:
            typeof question.category === "string" && question.category.trim()
              ? (question.category as string)
              : "Khái Niệm",
          question:
            typeof question.question === "string"
              ? question.question.trim()
              : "",
          options,
          correct: correctIndex,
          explanation:
            typeof question.explanation === "string"
              ? question.explanation.trim()
              : "",
          difficulty:
            typeof question.difficulty === "string" &&
            question.difficulty.trim()
              ? (question.difficulty as string)
              : "Trung bình",
        };
      })
      .filter(
        (question: QuizQuestionPayload) =>
          question.question &&
          question.options.length === 4 &&
          question.correct >= 0 &&
          question.correct <= 3 &&
          question.explanation
      );

    if (sanitizedQuestions.length < 12) {
      throw new Error("Gemini returned insufficient questions");
    }

    const preparedQuestions = sanitizedQuestions
      .slice(0, 12)
      .map((question: QuizQuestionPayload, index: number) => ({
        ...question,
        id: index + 1,
      }));

    return NextResponse.json({ questions: preparedQuestions });
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return NextResponse.json(
      { error: "Không thể tạo quiz từ Gemini ngay lúc này." },
      { status: 500 }
    );
  }
}
