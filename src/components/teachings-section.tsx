"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Award, Calendar, Quote } from "lucide-react";

const conditions = [
  {
    category: "Điều Kiện Kinh Tế",
    items: [
      {
        title: "Sự Phát Triển Của Lực Lượng Sản Xuất",
        content:
          "Nền đại công nghiệp cơ khí làm cho lực lượng sản xuất có tính xã hội hóa ngày càng cao.",
      },
      {
        title: "Mâu Thuẫn Cơ Bản",
        content:
          "Xuất hiện mâu thuẫn gay gắt giữa lực lượng sản xuất mang tính xã hội hóa với quan hệ sản xuất tư bản chủ nghĩa dựa trên chế độ chiếm hữu tư nhân về tư liệu sản xuất.",
      },
      {
        title: "Tính Tất Yếu Khách Quan",
        content:
          "Mâu thuẫn này đòi hỏi phải được giải quyết thông qua việc thay thế quan hệ sản xuất cũ bằng một quan hệ sản xuất mới (xã hội chủ nghĩa) phù hợp với trình độ phát triển của lực lượng sản xuất.",
      },
      {
        title: "Vai Trò Của Chủ Nghĩa Tư Bản",
        content:
          "Chính chủ nghĩa tư bản đã tạo ra những tiền đề vật chất và kỹ thuật quan trọng nhất cho sự ra đời của xã hội mới.",
      },
    ],
  },
  {
    category: "Điều Kiện Chính Trị - Xã Hội",
    items: [
      {
        title: "Sự Trưởng Thành Của Giai Cấp Công Nhân",
        content:
          'Là "con đẻ" của nền đại công nghiệp, giai cấp công nhân phát triển vượt bậc cả về số lượng và chất lượng.',
      },
      {
        title: "Cuộc Đấu Tranh Giai Cấp",
        content:
          "Mâu thuẫn kinh tế chuyển hóa thành mâu thuẫn chính trị giữa giai cấp công nhân và giai cấp tư sản, dẫn đến cuộc cách mạng vô sản.",
      },
      {
        title: "Sự Lãnh Đạo Của Đảng Cộng Sản",
        content:
          "Đây là nhân tố chủ quan quyết định; Đảng lãnh đạo giai cấp công nhân và nhân dân lao động thực hiện bước quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội.",
      },
      {
        title: "Thiết Lập Chính Quyền Mới",
        content:
          "Thông qua cách mạng, giai cấp công nhân thiết lập nhà nước chuyên chính vô sản (nhà nước xã hội chủ nghĩa) để cải tạo xã hội cũ và xây dựng xã hội mới.",
      },
    ],
  },
];

const colorClasses = {
  blue: {
    gradient: "from-blue-50 to-blue-100/50",
    badge: "bg-blue-500/20 text-blue-700 group-hover:bg-blue-500/30",
    border: "border-blue-200",
    icon: "text-blue-600",
  },
  amber: {
    gradient: "from-amber-50 to-amber-100/50",
    badge: "bg-amber-500/20 text-amber-700 group-hover:bg-amber-500/30",
    border: "border-amber-200",
    icon: "text-amber-600",
  },
  green: {
    gradient: "from-green-50 to-green-100/50",
    badge: "bg-green-500/20 text-green-700 group-hover:bg-green-500/30",
    border: "border-green-200",
    icon: "text-green-600",
  },
  purple: {
    gradient: "from-purple-50 to-purple-100/50",
    badge: "bg-purple-500/20 text-purple-700 group-hover:bg-purple-500/30",
    border: "border-purple-200",
    icon: "text-purple-600",
  },
  red: {
    gradient: "from-red-50 to-red-100/50",
    badge: "bg-red-500/20 text-red-700 group-hover:bg-red-500/30",
    border: "border-red-200",
    icon: "text-red-600",
  },
  indigo: {
    gradient: "from-indigo-50 to-indigo-100/50",
    badge: "bg-indigo-500/20 text-indigo-700 group-hover:bg-indigo-500/30",
    border: "border-indigo-200",
    icon: "text-indigo-600",
  },
};

function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function TeachingsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // FIX: Sử dụng useMemo để tạo vị trí cố định cho floating icons
  // Tránh hydration error do Math.random() tạo giá trị khác nhau giữa server và client
  const floatingPositions = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      left: `${(i * 13 + 15) % 90}%`,
      top: `${(i * 17 + 10) % 85}%`,
    }));
  }, []);

  return (
    <section
      id="teachings"
      className="py-24 bg-gradient-to-br from-amber-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Floating book icons in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {floatingPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={position}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <BookOpen className="w-16 h-16 text-secondary" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isHeaderInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">
              Nền Tảng Lý Thuyết
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6 pb-1 pt-1"
          >
            Điều Kiện Ra Đời Của Chủ Nghĩa Xã Hội
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Sự ra đời của chủ nghĩa xã hội không phải ngẫu nhiên mà là kết quả
            của các điều kiện khách quan cụ thể
          </motion.p>
        </motion.div>

        {/* Works Grid */}
        <div className="space-y-16">
          {conditions.map((section, sectionIndex) => {
            const iconCycle = [Award, FileText, BookOpen, Quote];

            return (
              <div key={sectionIndex}>
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                    {section.category}
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent =
                      iconCycle[itemIndex % iconCycle.length];
                    const colors =
                      colorClasses[
                        Object.keys(colorClasses)[
                          (sectionIndex * 3 + itemIndex) %
                            Object.keys(colorClasses).length
                        ] as keyof typeof colorClasses
                      ];

                    return (
                      <AnimatedCard
                        key={`${sectionIndex}-${itemIndex}`}
                        delay={0.1 + (sectionIndex * 4 + itemIndex) * 0.1}
                      >
                        <Card
                          className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${colors.gradient} group h-full cursor-pointer`}
                        >
                          <CardContent className="p-8">
                            {/* Icon & Badge Section */}
                            <div className="text-center mb-6">
                              <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-white/60 rounded-2xl shadow-md mb-4"
                              >
                                <IconComponent
                                  className={`w-8 h-8 ${colors.icon}`}
                                />
                              </motion.div>

                              <motion.div
                                className={`inline-block ${colors.badge} font-bold text-2xl px-5 py-2 rounded-xl mb-4 transition-all duration-300 shadow-sm`}
                                whileHover={{ scale: 1.05 }}
                              >
                                Mục {itemIndex + 1}
                              </motion.div>

                              {/* Title */}
                              <p className="text-base font-bold text-primary mb-2 leading-relaxed">
                                {item.title}
                              </p>

                              {/* Category */}
                              <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">
                                &quot;{section.category}&quot;
                              </p>
                            </div>

                            {/* Description */}
                            <div
                              className={`border-t-2 ${colors.border} pt-6 space-y-4`}
                            >
                              <p className="text-muted-foreground leading-relaxed text-sm">
                                {item.content}
                              </p>

                              {/* Badge */}
                              <motion.div
                                className="bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200"
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="flex items-center justify-center space-x-2">
                                  <Calendar className="w-4 h-4 text-secondary" />
                                  <span className="text-xs font-semibold text-secondary">
                                    {section.category}
                                  </span>
                                </div>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
