"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="socialism-transition"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-amber-50 to-slate-100"></div>

            {/* Main document container */}
            <motion.div
              className="relative w-full max-w-4xl mx-auto px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Paper document */}
              <motion.div
                className="relative bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 shadow-2xl border-2 border-slate-400 min-h-[65vh] p-12"
                initial={{ height: 0, scaleY: 0 }}
                animate={{ height: "auto", scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{
                  backgroundImage: `
                                        repeating-linear-gradient(
                                            0deg,
                                            transparent,
                                            transparent 30px,
                                            rgba(100, 116, 139, 0.05) 30px,
                                            rgba(100, 116, 139, 0.05) 31px
                                        )
                                    `,
                }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                                            radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.3) 1px, transparent 1px),
                                            radial-gradient(circle at 70% 60%, rgba(139, 69, 19, 0.3) 1px, transparent 1px)
                                        `,
                      backgroundSize: "20px 20px",
                    }}
                  ></div>
                </div>

                {/* Content area */}
                <motion.div
                  className="relative z-10 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {/* Symbol */}
                  {/* <motion.div
                    className="text-7xl mb-6 text-red-800 font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1, type: "spring" }}
                  >
                    CHỦ NGHĨA XÃ HỘI
                  </motion.div> */}

                  {/* Title */}
                  <motion.div
                    className="text-3xl font-serif text-slate-900 mb-3 tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    Chủ Nghĩa Xã Hội
                  </motion.div>

                  <motion.div
                    className="text-sm text-slate-600 mb-6 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Đặc trưng • Lý tưởng • Mục tiêu
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    className="text-lg text-slate-700 mb-4 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    Hướng tới công bằng, tiến bộ và phát triển con người
                  </motion.div>

                  <motion.div
                    className="text-xl text-slate-800 italic mb-4 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    Xóa bỏ áp bức, bóc lột và phân chia giai cấp
                  </motion.div>

                  <motion.div
                    className="text-base text-slate-600 mb-6 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Nền tảng là lực lượng sản xuất hiện đại và xây dựng xã hội
                    do nhân dân lao động làm chủ
                  </motion.div>

                  {/* Key principle */}
                  <motion.div
                    className="text-base text-red-800 font-medium mb-8 max-w-2xl mx-auto bg-red-50 p-4 rounded border border-red-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    “Làm theo năng lực, hưởng theo nhu cầu”
                  </motion.div>

                  {/* 6 pillars */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    {[
                      { k: "Giải phóng", v: "Con người & xã hội" },
                      { k: "Kinh tế", v: "Công hữu chủ yếu" },
                      { k: "Chính trị", v: "Nhân dân làm chủ" },
                      { k: "Nhà nước", v: "Kiểu mới" },
                      { k: "Văn hóa", v: "Chân • Thiện • Mỹ" },
                      { k: "Quốc tế", v: "Bình đẳng • Đoàn kết" },
                    ].map((item) => (
                      <div
                        key={item.k}
                        className="rounded-lg border border-slate-300 bg-white/60 px-4 py-3 text-center"
                      >
                        <div className="text-base text-red-700 font-bold">
                          {item.k}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {item.v}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Decorative line */}
                  <div className="flex justify-center items-center mt-8 space-x-4">
                    <div className="w-24 h-px bg-slate-400"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <div className="w-24 h-px bg-slate-400"></div>
                  </div>
                </motion.div>

                {/* Document corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-400"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-400"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-400"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-400"></div>

                {/* Paper shadow edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-300/30 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-300/30 to-transparent pointer-events-none"></div>
              </motion.div>

              {/* Stamp effect */}
              <motion.div
                className="absolute top-8 right-8 w-28 h-28 border-4 border-red-600 rounded-full flex items-center justify-center transform rotate-12"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ duration: 0.4, delay: 1.8, type: "spring" }}
              >
                <div className="text-center">
                  <div className="text-xs text-red-600 font-bold">
                    CHỦ NGHĨA
                  </div>
                  <div className="text-xs text-red-600 font-bold">XÃ HỘI</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating keywords */}
            {["XH", "CN", "CB", "ĐK"].map((symbol, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl text-red-900/15 font-bold"
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${25 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {symbol}
              </motion.div>
            ))}

            {/* Graph lines animation */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute w-1 bg-blue-400/20"
                style={{
                  left: `${30 + i * 15}%`,
                  bottom: "10%",
                  height: "30%",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1, 0.7, 1] }}
                transition={{
                  duration: 1.5,
                  delay: 1 + i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
