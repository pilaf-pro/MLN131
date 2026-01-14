"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const cardData = [
  {
    title: "Góc Độ Tiếp Cận",
    description: "4 góc độ chính tiếp cận chủ nghĩa xã hội theo Mác - Lênin",
    icon: "📚",
    href: "/biography",
    gradient: "from-blue-500 to-cyan-500",
    bgPattern:
      "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Giai Đoạn Phát Triển",
    description: "Hình thái kinh tế - xã hội cộng sản chủ nghĩa",
    icon: "📊",
    href: "/theory",
    gradient: "from-purple-500 to-pink-500",
    bgPattern:
      "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Điều kiện ra đời",
    description: "Điều kiện kinh tế, chính trị - xã hội của chủ nghĩa xã hội",
    icon: "📖",
    href: "/teachings",
    gradient: "from-green-500 to-emerald-500",
    bgPattern:
      "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Đặc trưng của chủ nghĩa xã hội",
    description: "Đặc trưng bản chất và mục tiêu của chủ nghĩa xã hội",
    icon: "✨",
    href: "/timeline",
    gradient: "from-orange-500 to-red-500",
    bgPattern:
      "radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
  },
  //   {
  //     title: "Ảnh Hưởng",
  //     description: "Tác động của Keynes đến kinh tế học và chính sách thế giới",
  //     icon: "🌍",
  //     href: "/quiz",
  //     gradient: "from-indigo-500 to-purple-500",
  //     bgPattern:
  //       "radial-gradient(circle at 60% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
  //   },
];

function Card3D({ card, index }: { card: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]));

  return (
    <motion.div
      className="relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="relative bg-card rounded-3xl border overflow-hidden group cursor-pointer h-80"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
          style={{
            background: card.bgPattern,
          }}
        />

        <div className="relative p-8 z-10 h-full flex flex-col">
          {/* Floating icon */}
          <motion.div
            className="text-6xl mb-6 inline-block"
            animate={{
              y: isHovered ? [-5, 5, -5] : 0,
              rotateZ: isHovered ? [-5, 5, -5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {card.icon}
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
            {card.title}
          </h3>

          <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
            {card.description}
          </p>

          <Link href={card.href}>
            <motion.div
              className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors duration-300"
              whileHover={{ x: 10 }}
            >
              Khám phá ngay
              <motion.span
                className="ml-2"
                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                transition={{
                  duration: 1,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                }}
              >
                →
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -skew-x-12"
          animate={{
            x: isHovered ? [-200, 400] : -200,
            opacity: isHovered ? [0, 0.1, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            delay: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function EnhancedCardsSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const leftPos = (i * 17) % 100;
          const topPos = (i * 23) % 100;
          const duration = 4 + (i % 4);
          const delay = (i * 0.8) % 5;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl font-bold mb-6 text-foreground text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Khám Phá Chủ Nghĩa Xã Hội Và
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              Thời Kỳ Quá Độ
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hành Trình Qua Các Giai Đoạn Phát Triển và Lý Thuyết Chính Trị Của
            Chủ Nghĩa Xã Hội
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => (
            <Card3D key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
