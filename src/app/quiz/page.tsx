"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FallingLeaves } from "@/components/falling-leaves";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Brain,
  Trophy,
  RotateCcw,
  Clock,
  BookOpen,
  Loader2,
} from "lucide-react";

// Type cho câu hỏi quiz
type QuizQuestion = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
};

type ApiQuizQuestion = Partial<QuizQuestion> & Record<string, unknown>;

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "Đặc Trưng": {
    bg: "bg-rose-100",
    text: "text-rose-800",
    border: "border-rose-200",
  },
  "Kinh Tế": {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  "Chính Trị": {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-200",
  },
  "Nhà Nước": {
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-200",
  },
  "Văn Hóa": {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  "Quốc Tế": {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    border: "border-cyan-200",
  },
  "Tiểu Sử": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  "Lý Thuyết": {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-200",
  },
  "Triết Học": {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  "Giáo Lý": {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  "Tác Phẩm": {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  "Giáo Dục": {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    border: "border-cyan-200",
  },
  "Lịch Sử": {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
  "Khái Niệm": {
    bg: "bg-teal-100",
    text: "text-teal-800",
    border: "border-teal-200",
  },
  "Chính Sách": {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200",
  },
  "Ảnh Hưởng": {
    bg: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-200",
  },
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Dễ: { bg: "bg-green-100", text: "text-green-700" },
  "Trung bình": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Trung Bình": { bg: "bg-yellow-100", text: "text-yellow-700" },
  Khó: { bg: "bg-red-100", text: "text-red-700" },
};

const CATEGORY_LABELS = [
  "Khái Niệm",
  "Đặc Trưng",
  "Kinh Tế",
  "Chính Trị",
  "Nhà Nước",
  "Văn Hóa",
  "Quốc Tế",
];

const normalizeCategory = (rawValue?: string): string => {
  if (!rawValue) {
    return "Khái Niệm";
  }

  const normalized = rawValue.trim().toLowerCase();
  const directMatch = CATEGORY_LABELS.find(
    (label) => label.toLowerCase() === normalized
  );

  if (directMatch) {
    return directMatch;
  }

  if (normalized.includes("đặc")) return "Đặc Trưng";
  if (normalized.includes("kinh")) return "Kinh Tế";
  if (normalized.includes("trị")) return "Chính Trị";
  if (normalized.includes("nhà")) return "Nhà Nước";
  if (normalized.includes("văn")) return "Văn Hóa";
  if (normalized.includes("quốc")) return "Quốc Tế";

  return "Khái Niệm";
};

const normalizeDifficulty = (rawValue?: string): string => {
  if (!rawValue) {
    return "Trung bình";
  }

  const normalized = rawValue.trim().toLowerCase();
  if (normalized.includes("dễ")) return "Dễ";
  if (normalized.includes("khó")) return "Khó";
  return "Trung bình";
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState(false);

  const startQuiz = async () => {
    setIsLoadingQuiz(true);
    setQuizError(false);

    try {
      const response = await fetch("/api/quiz", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch quiz");
      }

      const data = await response.json();
      const rawQuestions: ApiQuizQuestion[] = Array.isArray(data.questions)
        ? (data.questions as unknown[]).filter(
            (item): item is ApiQuizQuestion =>
              typeof item === "object" && item !== null
          )
        : [];

      const sanitizedQuestions = rawQuestions.map((question, index) => {
        const optionsRaw = Array.isArray(question.options)
          ? question.options.slice(0, 4)
          : [];
        const options =
          optionsRaw.length === 4
            ? optionsRaw.map((option) => String(option))
            : [];

        const correctIndexRaw = Number.isInteger(question.correct)
          ? Number(question.correct)
          : -1;
        const correctIndex =
          correctIndexRaw >= 0 && correctIndexRaw <= 3 ? correctIndexRaw : -1;

        return {
          id: index + 1,
          category: normalizeCategory(question.category as string | undefined),
          question:
            typeof question.question === "string" ? question.question : "",
          options,
          correct: correctIndex,
          explanation:
            typeof question.explanation === "string"
              ? question.explanation
              : "",
          difficulty: normalizeDifficulty(
            question.difficulty as string | undefined
          ),
        } satisfies QuizQuestion;
      });

      const validQuestions = sanitizedQuestions.filter(
        (question) =>
          question.question &&
          question.options.length === 4 &&
          question.correct >= 0 &&
          question.correct <= 3 &&
          question.explanation
      );

      if (validQuestions.length < 12) {
        throw new Error("Not enough valid questions from AI");
      }

      const preparedQuestions = validQuestions
        .slice(0, 12)
        .map((question, index) => ({
          ...question,
          id: index + 1,
        }));

      setQuizQuestions(preparedQuestions);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setAnswers([]);
      setQuizCompleted(false);
      setTimeLeft(30);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setQuizQuestions([]);
      setQuizStarted(false);
      setQuizCompleted(false);
      setQuizError(true);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setSelectedAnswer(null);
      setShowResult(true);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = false;
      setAnswers(newAnswers);
    }
  }, [
    timeLeft,
    quizStarted,
    quizCompleted,
    showResult,
    answers,
    currentQuestion,
  ]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = isCorrect;
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    void startQuiz();
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90)
      return {
        message: "Xuất sắc! Bạn hiểu rất vững về chủ nghĩa xã hội!",
        emoji: "🎉",
        color: "text-green-600",
      };
    if (percentage >= 70)
      return {
        message: "Rất tốt! Bạn nắm khá chắc các nội dung cơ bản",
        emoji: "🎊",
        color: "text-blue-600",
      };
    if (percentage >= 50)
      return {
        message: "Khá ổn! Bạn có thể ôn thêm các đặc trưng và khái niệm",
        emoji: "📚",
        color: "text-yellow-600",
      };
    return {
      message: "Hãy học thêm về chủ nghĩa xã hội nhé!",
      emoji: "📖",
      color: "text-red-600",
    };
  };

  // Loading state
  if (isLoadingQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
        <FallingLeaves />
        <Header />
        <main>
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-primary/20 shadow-2xl"
              >
                <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Đang tạo quiz mới về chủ nghĩa xã hội...
                </h2>
                <p className="text-muted-foreground">
                  AI đang chuẩn bị những câu hỏi thú vị cho bạn
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
        <FallingLeaves />
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/4septembrevoiture-560x356-1.jpg')] bg-cover bg-center opacity-10"></div>

            {/* Floating keywords */}
            <div className="absolute inset-0 pointer-events-none">
              {["XH", "CN", "CB", "ĐK"].map((char, index) => (
                <motion.div
                  key={index}
                  className="absolute text-6xl font-bold opacity-5 text-primary"
                  style={{
                    left: `${15 + index * 18}%`,
                    top: `${25 + (index % 2) * 35}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  {char}
                </motion.div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 text-lg px-6 py-2 bg-amber-100 text-amber-800 border-amber-300">
                  <Brain className="w-5 h-5 mr-2" />
                  Trắc Nghiệm
                </Badge>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Quiz Chủ Nghĩa Xã Hội
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Kiểm tra kiến thức của bạn về đặc trưng, khái niệm và nội dung
                  cơ bản của chủ nghĩa xã hội
                </motion.p>

                {!quizError && (
                  <motion.div
                    className="mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200 px-4 py-2">
                      <Brain className="w-4 h-4 mr-2" />
                      Quiz được tạo bởi AI Gemini 2.5 Pro
                    </Badge>
                  </motion.div>
                )}

                {quizError && (
                  <motion.div
                    className="mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-4 py-2">
                      ⚠️ Không thể tạo quiz từ AI, vui lòng thử lại
                    </Badge>
                  </motion.div>
                )}
              </motion.div>

              {/* Quiz Info Cards */}
              <motion.div
                className="grid md:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {quizQuestions.length || 12} Câu Hỏi
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Đa dạng chủ đề về chủ nghĩa xã hội
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 hover:border-amber-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">
                      30 Giây/Câu
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thử thách tốc độ tư duy
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 hover:border-green-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">
                      Nhiều Cấp Độ
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Từ dễ đến khó
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  onClick={() => void startQuiz()}
                  disabled={isLoadingQuiz}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl transform hover:scale-105 transition-all duration-300"
                >
                  Bắt Đầu Quiz
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (quizCompleted) {
    const scoreData = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
        <FallingLeaves />
        <Header />

        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-primary/20 shadow-2xl"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-8xl mb-6"
                >
                  {scoreData.emoji}
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold text-foreground mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Quiz Hoàn Thành!
                </motion.h1>

                <motion.div
                  className="text-6xl font-bold mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                >
                  <span className="text-primary">{score}</span>
                  <span className="text-muted-foreground">
                    /{quizQuestions.length}
                  </span>
                </motion.div>

                <motion.p
                  className={`text-xl font-medium mb-8 ${scoreData.color}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {scoreData.message}
                </motion.p>

                {/* Score Breakdown */}
                <motion.div
                  className="grid md:grid-cols-3 gap-4 mb-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {score}
                    </div>
                    <div className="text-sm text-green-700">Câu đúng</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="text-2xl font-bold text-red-600">
                      {quizQuestions.length - score}
                    </div>
                    <div className="text-sm text-red-700">Câu sai</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((score / quizQuestions.length) * 100)}%
                    </div>
                    <div className="text-sm text-blue-700">Tỷ lệ đúng</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Button
                    onClick={handleRestartQuiz}
                    size="lg"
                    className="px-8 py-3 text-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Làm Lại Quiz
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => (window.location.href = "/")}
                    className="px-8 py-3 text-lg"
                  >
                    Về Trang Chủ
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
        <FallingLeaves />
        <Header />

        <main>
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-primary/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Không thể tải câu hỏi quiz
              </h2>
              <p className="text-muted-foreground mb-8">
                Vui lòng thử tạo lại quiz mới.
              </p>
              <Button size="lg" onClick={handleRestartQuiz}>
                Thử Lại
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  const categoryStyle = categoryColors[question.category] ?? {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
  };
  const difficultyStyle =
    difficultyColors[question.difficulty] ?? difficultyColors["Trung bình"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
      <FallingLeaves />
      <Header />

      <main>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {quizError && (
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-4 py-2">
                  ⚠️ Không thể tạo quiz từ AI, vui lòng thử lại
                </Badge>
              </motion.div>
            )}

            {/* Progress Bar */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Câu {currentQuestion + 1} / {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Điểm: {score}
                </span>
              </div>
              <Progress
                value={(currentQuestion / quizQuestions.length) * 100}
                className="h-2"
              />
            </motion.div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
                <CardHeader>
                  {/* Category and Difficulty Badges */}
                  <div className="flex justify-between items-center mb-4">
                    <Badge
                      className={`${categoryStyle?.bg} ${categoryStyle?.text} border-0`}
                    >
                      {question.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${difficultyStyle?.bg} ${difficultyStyle?.text} border-0`}
                      >
                        {question.difficulty}
                      </Badge>
                      {!showResult && (
                        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono">{timeLeft}s</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold text-foreground text-balance">
                    {question.question}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    <AnimatePresence>
                      {question.options.map((option: string, index: number) => {
                        let buttonStyle =
                          "bg-white border-2 border-border hover:border-primary/50 text-foreground";

                        if (showResult) {
                          if (index === question.correct) {
                            buttonStyle =
                              "bg-green-100 border-2 border-green-500 text-green-800";
                          } else if (
                            index === selectedAnswer &&
                            selectedAnswer !== question.correct
                          ) {
                            buttonStyle =
                              "bg-red-100 border-2 border-red-500 text-red-800";
                          }
                        } else if (selectedAnswer === index) {
                          buttonStyle =
                            "bg-primary/10 border-2 border-primary text-foreground";
                        }

                        return (
                          <motion.button
                            key={index}
                            className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-200 ${buttonStyle}`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            whileTap={!showResult ? { scale: 0.98 } : {}}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showResult && (
                                <div>
                                  {index === question.correct && (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  )}
                                  {index === selectedAnswer &&
                                    selectedAnswer !== question.correct && (
                                      <XCircle className="w-5 h-5 text-red-600" />
                                    )}
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                      >
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Giải thích:
                        </h4>
                        <p className="text-blue-700">{question.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    {!showResult ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="px-8 py-2"
                        size="lg"
                      >
                        Xác Nhận
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="px-8 py-2"
                        size="lg"
                      >
                        {currentQuestion < quizQuestions.length - 1
                          ? "Câu Tiếp Theo"
                          : "Xem Kết Quả"}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={handleRestartQuiz}
                      className="px-8 py-2"
                      size="lg"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Bắt Đầu Lại
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
