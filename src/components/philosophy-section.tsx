"use client";

import { useRef } from "react";
import { color, motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  BookOpen,
  BarChart3,
  CheckCircle,
} from "lucide-react";

const theories = [
  {
    icon: TrendingUp,
    title: "Thời Kỳ Quá Độ",
    description: "Giai đoạn cải biến cách mạng",
    color: "blue",
    content:
      "Thời kỳ quá độ là giai đoạn cải biến cách mạng từ xã hội cũ (tư bản chủ nghĩa) sang xã hội mới (chủ nghĩa xã hội). Đây là một quá trình đấu tranh giai cấp, dưới sự lãnh đạo của Đảng Cộng sản.",
  },
  {
    icon: Zap,
    title: "Giai Đoạn Thấp (CNXH)",
    description: "Chủ nghĩa xã hội hoàn toàn",
    color: "amber",
    content:
      "Xã hội vừa thoát thai từ xã hội tư bản nên còn mang nhiều 'dấu vết' về kinh tế, đạo đức và tinh thần. Xây dựng nền kinh tế mới trên cơ sở công hữu hóa các tư liệu sản xuất.",
  },
  {
    icon: Users,
    title: "Giai Đoạn Cao (CNCS)",
    description: "Cộng sản chủ nghĩa",
    color: "green",
    content:
      "Khi lực lượng sản xuất phát triển cực kỳ mạnh mẽ, rào cản về giai cấp bị xóa bỏ hoàn toàn, thực hiện nguyên tắc 'làm theo năng lực, hưởng theo nhu cầu'. Nhà nước sẽ tự động biến mất.",
  },
  {
    icon: CheckCircle,
    title: "Thời Kỳ Quá Độ Lâu Dài",
    color: "purple",
    description: "Con đường Lênin",
    content:
      "V.I. Lênin khẳng định đối với các nước chưa trải qua tư bản chủ nghĩa phát triển, cần một thời kỳ quá độ lâu dài để tiến lên chủ nghĩa xã hội. Đây là con đường độc đáo dựa trên điều kiện cụ thể.",
  },
];

const keyPrinciples = [
  {
    title: "Nguyên lý Cầu Hữu Hiệu",
    description:
      "Lượng cung hàng hóa được quyết định bởi lượng cầu, không phải ngược lại",
  },
  {
    title: "Hệ số Nhân (Multiplier)",
    description:
      "Mỗi đồng chi tiêu của chính phủ tạo ra nhiều hơn một đồng GDP",
  },
  {
    title: "Xu Hướng Tiêu Dùng Biên",
    description:
      "Tỷ lệ thu nhập tăng thêm được dùng để tiêu dùng giảm khi thu nhập tăng",
  },
  {
    title: "Bẫy Thanh Khoản",
    description: "Lãi suất quá thấp khiến chính sách tiền tệ mất hiệu lực",
  },
];

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function PhilosophySection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const colorClasses = {
    blue: {
      gradient: "from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-500/15 group-hover:bg-blue-500/25",
      icon: "text-blue-600",
      badge: "bg-blue-100 text-blue-700 border-blue-200",
    },
    amber: {
      gradient: "from-amber-50 to-amber-100/50",
      iconBg: "bg-amber-500/15 group-hover:bg-amber-500/25",
      icon: "text-amber-600",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
    },
    green: {
      gradient: "from-green-50 to-green-100/50",
      iconBg: "bg-green-500/15 group-hover:bg-green-500/25",
      icon: "text-green-600",
      badge: "bg-green-100 text-green-700 border-green-200",
    },
    purple: {
      gradient: "from-purple-50 to-purple-100/50",
      iconBg: "bg-purple-500/15 group-hover:bg-purple-500/25",
      icon: "text-purple-600",
      badge: "bg-purple-100 text-purple-700 border-purple-200",
    },
  };

  return (
    <section
      id="philosophy"
      className="py-24 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Các Giai Đoạn Phát Triển
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-1 pt-1 text-balance"
          >
            Giai Đoạn Đầu Của Hình Thái Kinh Tế - Xã Hội Cộng Sản
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Khám phá quá trình phát triển từ chủ nghĩa tư bản lên chủ nghĩa xã
            hội và cộng sản chủ nghĩa
          </motion.p>

          {/* Animated decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isHeaderInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto mt-8"
          />
        </motion.div>

        {/* Main Theories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {theories.map((theory, index) => {
            const IconComponent = theory.icon;
            const colors =
              colorClasses[theory.color as keyof typeof colorClasses];

            return (
              <AnimatedCard key={index} delay={0.2 + index * 0.1}>
                <Card
                  className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br ${colors.gradient} group cursor-pointer`}
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </motion.div>

                    <CardTitle className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {theory.title}
                    </CardTitle>

                    <CardDescription className="text-primary font-semibold text-sm">
                      {theory.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center leading-relaxed text-sm">
                      {theory.content}
                    </p>

                    {/* Formula Badge */}
                    {/* <motion.div
                      className={`${colors.badge} px-3 py-2 rounded-lg text-center font-mono text-sm font-semibold border`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {theory.formula}
                    </motion.div> */}
                  </CardContent>
                </Card>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
