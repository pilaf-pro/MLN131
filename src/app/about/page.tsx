"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { FallingLeaves } from "@/components/falling-leaves";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bot, Sparkles } from "lucide-react";

const teamMembers = [
  {
    name: "Vòng Tải Đông",
    mssv: "SE183673",
    role: "Researcher",
    avatar: "👨‍💼",
  },
  {
    name: "Nguyễn Phúc Tần",
    mssv: "SE184364",
    role: "Developer",
    avatar: "👨‍💼",
  },
  {
    name: "Huỳnh Nhật Tú",
    mssv: "SE183768",
    role: "Developer",
    avatar: "👨‍💼",
  },
];

const aiTools = [
  {
    name: "v0.dev",
    description: "Công cụ tạo giao diện người dùng với AI từ Vercel",
    icon: "🚀",
    features: ["Tạo UI components", "Responsive design", "Modern styling"],
  },
  {
    name: "GitHub Copilot",
    description: "Trợ lý lập trình AI của GitHub",
    icon: "🤖",
    features: ["Code completion", "Bug fixing", "Code optimization"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <FallingLeaves />
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Team Members Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
              <Users className="w-8 h-8 text-red-600" />
              <span>Thành Viên Nhóm</span>
            </h2>
            <p className="text-muted-foreground">Đội ngũ phát triển dự án</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.mssv}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.avatar}
                    </motion.div>
                    <CardTitle className="text-xl font-bold">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="font-medium text-red-600">
                      MSSV: {member.mssv}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
                    >
                      {member.role}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
              <Bot className="w-8 h-8 text-red-600" />
              <span>Công Cụ AI Đã Sử Dụng</span>
            </h2>
            <p className="text-muted-foreground">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors underline"
              >
                Các công nghệ AI hỗ trợ phát triển dự án
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <motion.div
                        className="text-4xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tool.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl font-bold">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-red-600" />
                        <span>Tính năng chính:</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-xs bg-background hover:bg-red-50 hover:border-red-200 transition-colors"
                            >
                              {feature}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["£", "$", "€", "¥"].map((char, index) => (
            <motion.div
              key={index}
              className="absolute text-8xl font-bold opacity-[0.02] text-primary"
              style={{
                left: `${10 + index * 20}%`,
                top: `${20 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
