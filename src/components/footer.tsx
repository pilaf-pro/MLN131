"use client";

import {
  Heart,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const navItems = [
    { href: "/", label: "Trang Chủ", icon: BookOpen },
    { href: "/biography", label: "Góc Độ Tiếp Cận", icon: Award },
    { href: "/theory", label: "Giai Đoạn Phát Triển", icon: TrendingUp },
    { href: "/teachings", label: "Điều Kiện Ra Đời", icon: BookOpen },
    { href: "/timeline", label: "Đặc Trưng & Lý Tưởng", icon: Calendar },
    { href: "/quiz", label: "Quiz", icon: Award },
    { href: "/about", label: "Về Chúng Tôi", icon: Heart },
  ];

  const keynesQuotes = [
    {
      text: "Chủ nghĩa xã hội là một hệ thống mà các phương tiện sản xuất được sở hữu và kiểm soát bởi cộng đồng",
      source: "Nguyên Lý Cơ Bản",
    },
    {
      text: "Từ mỗi người theo khả năng, cho mỗi người theo nhu cầu",
      source: "Lý Tưởng Xã Hội Chủ Nghĩa",
    },
    {
      text: "Sự bình đẳng và công bằng xã hội là nền tảng của một xã hội tiến bộ",
      source: "Nguyên Tắc Phân Phối",
    },
  ];

  const currentQuote = keynesQuotes[0];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Economic pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
          `,
        }}
      ></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Chủ Nghĩa</h3>
                <p className="text-blue-300 text-sm">Xã Hội</p>
              </div>
            </div>
            {/* <p className="text-slate-300 leading-relaxed text-sm">
              Trang web giáo dục về chủ nghĩa xã hội - một hệ thống tổ chức xã
              hội dựa trên sở hữu công đoàn hoặc nhà nước về các phương tiện sản
              xuất.
            </p> */}
            {/* <div className="flex space-x-3 pt-4">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Điều Hướng
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>© 2024 Chủ Nghĩa Xã Hội.</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Mọi quyền được bảo lưu.</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>Được tạo với</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>để khám phá chủ nghĩa xã hội</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Chính Sách Bảo Mật
            </a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Điều Khoản Sử Dụng
            </a>
          </div>
        </div>

        {/* Year Timeline */}
        <div className="mt-8 flex items-center justify-center space-x-4 text-xs text-slate-500">
          <span className="px-3 py-1 bg-slate-800/50 rounded-full">
            Hệ thống xã hội
          </span>
          <span className="text-slate-600">•</span>
          <span className="px-3 py-1 bg-slate-800/50 rounded-full">
            Công bằng & bình đẳng
          </span>
          <span className="text-slate-600">•</span>
          <span className="px-3 py-1 bg-slate-800/50 rounded-full">
            Phúc lợi cộng đồng
          </span>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
    </footer>
  );
}
