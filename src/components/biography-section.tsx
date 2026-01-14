"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Heart,
  Award,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function AnimatedCard({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants =
    direction === "left"
      ? fadeInLeft
      : direction === "right"
      ? fadeInRight
      : direction === "scale"
      ? scaleIn
      : fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function BiographySection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
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
              Góc Độ Tiếp Cận
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent mb-6 pb-1 text-balance"
          >
            Các Góc Độ Tiếp Cận Chủ Nghĩa Xã Hội
          </motion.h2>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-lg font-semibold text-primary">
              1883 - 1946
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
          </motion.div> */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Chủ nghĩa xã hội được các nhà kinh điển của chủ nghĩa Mác - Lênin
            tiếp cận theo bốn góc độ chính để hiểu rõ bản chất và sứ mệnh của
            nó.
          </motion.p>
        </motion.div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatedCard delay={0.2} direction="left">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100/50 h-fit group">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-primary/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-primary/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Phong Trào Thực Tiễn
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Chủ nghĩa xã hội là một phong trào đấu tranh của nhân dân
                    lao động chống lại áp bức và bất công. Đây là sức mạnh to
                    lớn của giai cấp công nhân trong cuộc chiến giành quyền lợi
                    của mình.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.4} direction="right">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-amber-50 to-amber-100/50 h-full group">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-secondary/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-secondary/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="w-8 h-8 text-secondary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Trào Lưu Tư Tưởng
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Chủ nghĩa xã hội là một trào lưu tư tưởng và lý luận phản
                    ánh lý tưởng giải phóng nhân dân lao động. Nó tìm cách giải
                    thích các quy luật xã hội để hướng dẫn hành động cách mạng.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.4} direction="right">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100/50 h-full group">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-green-500/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-green-500/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-500 mb-6">
                  Khoa Học
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Chủ nghĩa xã hội khoa học nghiên cứu về sứ mệnh lịch sử của
                    giai cấp công nhân. Nó dựa trên phân tích khoa học về hình
                    thái kinh tế - xã hội và quy luật phát triển của xã hội.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.4} direction="right">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100/50 h-full group">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-purple-500/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="w-8 h-8 text-purple-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-500 mb-6">
                  Chế Độ Xã Hội
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Chủ nghĩa xã hội là một chế độ xã hội tốt đẹp, giai đoạn đầu
                    của hình thái kinh tế - xã hội cộng sản chủ nghĩa, nơi các
                    quan hệ sản xuất phù hợp với lực lượng sản xuất.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
        <AnimatedCard>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/10 via-blue-50 to-secondary/10">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold text-primary mb-8 text-center">
                Ý Nghĩa Toàn Diện
              </h3>
              <p className="text-muted-foreground text-center text-lg leading-relaxed">
                Chủ nghĩa xã hội không chỉ là một học thuyết lý luận mà còn là
                một phong trào xã hội có sức sống mãnh liệt, phản ánh khát vọng
                giải phóng của nhân dân lao động trên toàn thế giới.
              </p>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </section>
  );
}
