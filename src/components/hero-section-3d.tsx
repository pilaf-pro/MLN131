"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { motion } from "framer-motion";

function KeynesCharacter() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        fontSize={2}
        color="#1e40af"
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        K
      </Text>
    </Float>
  );
}

function LibraryBuilding() {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={[3, -1, -2]} scale={0.5}>
        {/* Building base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color="#7c3aed" />
        </mesh>
        {/* Building pillars */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 1, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 2]} />
            <meshStandardMaterial color="#6d28d9" />
          </mesh>
        ))}
        {/* Building roof */}
        <mesh position={[0, 2.2, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[2.5, 0.8, 4]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      </group>
    </Float>
  );
}

function ScrollingText() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={[-3, 1, -1]} rotation={[0, 0.3, 0]}>
        <Text
          fontSize={0.3}
          color="#1e40af"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          Economics
        </Text>
      </group>
    </Float>
  );
}

export function HeroSection3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#1e40af"
            />

            <KeynesCharacter />
            <LibraryBuilding />
            <ScrollingText />

            <Sparkles
              count={50}
              scale={10}
              size={2}
              speed={0.5}
              color="#1e40af"
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center bg-background/85 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl px-8 py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex flex-wrap justify-center gap-2 mb-6"
          >
            <Badge
              variant="outline"
              className="border-blue-300 text-blue-700 px-3 py-1"
            >
              Thế Kỷ XIX - XX
            </Badge>
            <Badge
              variant="outline"
              className="border-purple-300 text-purple-700 px-3 py-1"
            >
              Chủ Nghĩa Xã Hội
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-300 text-amber-700 px-3 py-1"
            >
              Lý Thuyết Chính Trị
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 text-balance py-5"
          >
            Chủ Nghĩa Xã Hội
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl text-blue-700 font-semibold mb-2"
          >
            & Thời Kỳ Quá Độ
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty"
          >
            Khám Phá Lịch Sử và Lý Thuyết Chính Trị
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto mb-8"
          />

          {/* Interactive Quote */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20 mb-10 hover:bg-primary/15 transition-colors"
          >
            <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-3 text-balance">
              Khám Phá Hành Trình Lịch Sử và Lý Thuyết Chính Trị
            </blockquote>
            <cite className="text-base text-muted-foreground">-</cite>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transform hover:scale-105 transition-transform"
            >
              <a href="/philosophy">Khám Phá Các Giai Đoạn Phát Triển</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg transform hover:scale-105 transition-transform bg-transparent"
            >
              <a href="/biography">Tìm Hiểu Các Góc Độ Tiếp Cận</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
