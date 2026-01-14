"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxQuotes() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const quotes = [
    {
      chinese: "Giải phóng con người là mục tiêu cốt lõi",
      english: "Human liberation is a core objective",
      context: "Đặc trưng về giải phóng",
      meaning:
        "Hướng tới xóa bỏ áp bức, bóc lột và tạo điều kiện phát triển toàn diện",
    },
    {
      chinese: "Nhân dân lao động là chủ thể của xã hội",
      english: "Working people are the subject of society",
      context: "Đặc trưng chính trị",
      meaning: "Mở rộng quyền làm chủ và thực hiện dân chủ ngày càng đầy đủ",
    },
    {
      chinese: "Bình đẳng và đoàn kết giữa các dân tộc",
      english: "Equality and solidarity among nations",
      context: "Đặc trưng quốc tế",
      meaning:
        "Thúc đẩy hữu nghị, hợp tác và xóa bỏ tình trạng dân tộc này bóc lột dân tộc khác",
    },
  ];

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Background with animated gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      />

      {/* Decorative background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
                            radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)
                        `,
            backgroundSize: "100px 100px, 100px 100px",
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity, scale }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Giá Trị
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              Chủ Nghĩa Xã Hội
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Những nội dung cốt lõi về đặc trưng, mục tiêu và lý tưởng của chủ
            nghĩa xã hội
          </p>
        </motion.div>

        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            className="max-w-5xl mx-auto mb-32"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-12 border shadow-2xl">
              {/* Decorative corner elements */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-primary/30 rounded-tl-2xl" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-primary/30 rounded-br-2xl" />

              {/* Main quote */}
              <motion.div
                className="text-center"
                whileInView={{
                  background: [
                    "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary)))",
                    "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                    "linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--primary)))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="text-4xl md:text-6xl lg:text-7xl text-primary mb-8 leading-tight tracking-wide"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {quote.chinese}
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground italic mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  "{quote.english}"
                </motion.p>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-lg text-foreground font-medium">
                    {quote.meaning}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    — {quote.context}
                  </p>
                </motion.div>
              </motion.div>

              {/* Animated decorative elements */}
              <motion.div
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-6xl text-primary/10"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                ❝
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-8 text-6xl text-primary/10"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                ❞
              </motion.div>

              {/* Floating wisdom characters */}
              {["💡", "📊", "🎯", "🌍"].map((char, i) => (
                <motion.div
                  key={char}
                  className="absolute text-2xl text-primary/20 font-bold"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${10 + (i % 2) * 80}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {char}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom decorative divider */}
        <motion.div
          className="flex justify-center items-center mt-16 space-x-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent to-primary"></div>
          <motion.div
            className="text-4xl text-primary"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            ⚊⚊⚊
          </motion.div>
          <div className="w-32 h-px bg-gradient-to-l from-transparent to-primary"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
