"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const timelineEvents = [
  {
    year: "Đặc Trưng 1",
    phase: "Giải Phóng",
    title: "Giải Phóng Giai Cấp, Dân Tộc, Xã Hội và Con Người",
    description: "Xóa bỏ áp bức, bóc lột và phân chia giai cấp",
    details:
      "Chủ nghĩa xã hội hướng tới xóa bỏ tình trạng áp bức, bóc lột, tạo điều kiện để con người phát triển toàn diện. Mục tiêu cao nhất là thực hiện nguyên tắc: 'làm theo năng lực, hưởng theo nhu cầu' và xóa bỏ sự phân chia giai cấp.",
    category: "Đặc Trưng",
  },
  {
    year: "Đặc Trưng 2",
    phase: "Kinh Tế",
    title: "Nền Kinh Tế Phát Triển Cao",
    description: "Chế độ công hữu về tư liệu sản xuất chủ yếu",
    details:
      "Có nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu. Việc thiết lập chế độ công hữu phải là một quá trình dần dần, phù hợp với trình độ phát triển thực tế.",
    category: "Đặc Trưng",
  },
  {
    year: "Đặc Trưng 3",
    phase: "Chính Trị",
    title: "Chế Độ Xã Hội do Nhân Dân Lao Động Làm Chủ",
    description: "Nhân dân lao động là chủ thể của xã hội",
    details:
      "Là chế độ xã hội do nhân dân lao động làm chủ, trong đó nhân dân lao động là chủ thể của xã hội, thực hiện quyền làm chủ ngày càng rộng rãi và đầy đủ trong quá trình cải tạo và xây dựng xã hội mới.",
    category: "Đặc Trưng",
  },
  {
    year: "Đặc Trưng 4",
    phase: "Nhà Nước",
    title: "Nhà Nước Kiểu Mới Mang Bản Chất Giai Cấp Công Nhân",
    description: "Công cụ của nhân dân lao động để xây dựng xã hội mới",
    details:
      "Có nhà nước kiểu mới mang bản chất giai cấp công nhân, đại biểu cho lợi ích và ý chí của nhân dân lao động. Nhà nước xã hội chủ nghĩa (chuyên chính vô sản) là một công cụ để nhân dân lao động thực hiện quyền dân chủ của mình và quản lý, xây dựng xã hội mới.",
    category: "Đặc Trưng",
  },
  {
    year: "Đặc Trưng 5",
    phase: "Văn Hóa",
    title: "Nền Văn Hóa Phát Triển Cao",
    description: "Kế thừa và phát huy giá trị văn hóa nhân loại",
    details:
      "Có nền văn hóa phát triển cao, kế thừa và phát huy những giá trị văn hóa dân tộc và tinh hoa văn hóa nhân loại. Văn hóa xã hội chủ nghĩa được xây dựng nhằm giải quyết các vấn đề từ kinh tế, chính trị đến con người, biến con người thành những cá nhân 'chân, thiện, mỹ' và giàu tri thức.",
    category: "Đặc Trưng",
  },
  {
    year: "Đặc Trưng 6",
    phase: "Quốc Tế",
    title: "Bình Đẳng, Đoàn Kết Giữa Các Dân Tộc",
    description: "Quan hệ hữu nghị, hợp tác với nhân dân các nước",
    details:
      "Bảo đảm bình đẳng, đoàn kết giữa các dân tộc và có quan hệ hữu nghị, hợp tác với nhân dân các nước trên thế giới. Chủ nghĩa xã hội xóa bỏ tình trạng người bóc lột người, từ đó xóa bỏ tình trạng dân tộc này bóc lột dân tộc khác, thiết lập sự gắn bó chặt chẽ giữa giai cấp và dân tộc trên tinh thần quốc tế vô sản.",
    category: "Đặc Trưng",
  },
];

const categoryColors = {
  "Đặc Trưng": "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200",
  "Thời thơ ấu": "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  "Giáo dục": "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  "Sự nghiệp":
    "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  "Công bố": "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200",
  "Cuối đời": "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
};

const categoryActiveColors = {
  "Đặc Trưng": "bg-rose-600 text-white border-rose-700",
  "Thời thơ ấu": "bg-blue-600 text-white border-blue-700",
  "Giáo dục": "bg-green-600 text-white border-green-700",
  "Sự nghiệp": "bg-purple-600 text-white border-purple-700",
  "Công bố": "bg-amber-600 text-white border-amber-700",
  "Cuối đời": "bg-gray-600 text-white border-gray-700",
};

function TimelineEvent({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const [selectedEvent, setSelectedEvent] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative"
    >
      <motion.div
        className="absolute left-5 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg hidden md:block z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3, type: "spring" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={
            isInView
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1 + 0.5,
          }}
        />
      </motion.div>

      <Card
        className={`ml-0 md:ml-20 cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-2xl ${
          selectedEvent
            ? "ring-2 ring-primary shadow-2xl scale-[1.02] bg-gradient-to-r from-blue-50 to-amber-50"
            : "hover:scale-[1.01] bg-white"
        }`}
      >
        <CardHeader
          onClick={() => setSelectedEvent(!selectedEvent)}
          className="pb-3 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.div
                className="flex items-center gap-3 mb-3 flex-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <Badge
                  variant="outline"
                  className={
                    categoryColors[
                      event.category as keyof typeof categoryColors
                    ]
                  }
                >
                  {event.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  {event.phase}
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <CardTitle className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-primary font-bold text-lg mb-3">
                  {event.year}
                </CardDescription>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="ml-4 shrink-0 text-primary hover:text-primary"
              >
                {selectedEvent ? "Thu gọn" : "Chi tiết"}
              </Button>
            </motion.div>
          </div>
        </CardHeader>

        <motion.div
          initial={false}
          animate={{
            height: selectedEvent ? "auto" : 0,
            opacity: selectedEvent ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <CardContent className="pt-0 border-t-2 border-blue-100">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg mt-4">
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {event.details}
              </p>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export default function TimelineSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 1], ["0%", "100%"]);

  const filteredEvents = selectedCategory
    ? timelineEvents.filter((event) => event.category === selectedCategory)
    : timelineEvents;

  const categories = Array.from(
    new Set(timelineEvents.map((event) => event.category))
  );
  const shouldShowCategoryFilter = categories.length > 1;

  return (
    <section
      id="timeline"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isHeaderInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Bản Chất và Mục Tiêu
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-red-600 to-secondary bg-clip-text text-transparent mb-6 pb-1 pt-1 text-balance"
          >
            Đặc Trưng & Lý Tưởng Của Chủ Nghĩa Xã Hội
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Sáu đặc trưng cơ bản xác định bản chất và lý tưởng của chủ nghĩa xã
            hội
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {shouldShowCategoryFilter && (
              <>
                {/* Nút Toàn bộ */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isHeaderInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
                    selectedCategory === null
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Toàn bộ
                </motion.button>

                {/* Các nút category */}
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isHeaderInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? categoryActiveColors[
                            category as keyof typeof categoryActiveColors
                          ]
                        : categoryColors[
                            category as keyof typeof categoryColors
                          ]
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </>
            )}
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Animated timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-secondary to-primary"
                style={{ height: lineHeight }}
              />
            </div>

            <motion.div className="space-y-6" layout>
              {filteredEvents.map((event, index) => (
                <TimelineEvent
                  key={`${event.year}-${event.title}`}
                  event={event}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
