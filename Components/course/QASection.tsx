import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44, Question } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Send,
  ChevronDown,
  ChevronUp,
  User,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface QASectionProps {
  courseId: string;
  courseLessons?: string[];
}

export default function QASection({
  courseId,
  courseLessons = [],
}: QASectionProps) {
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const queryClient = useQueryClient();

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["questions", courseId],
    queryFn: () =>
      base44.entities.Question.filter({ course_id: courseId }, "-created_date"),
  });

  const createQuestionMutation = useMutation({
    mutationFn: (data: Partial<Question>) =>
      base44.entities.Question.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", courseId] });
      setNewQuestion("");
      setSelectedLesson("");
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Question> }) =>
      base44.entities.Question.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["questions", courseId] }),
  });

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return;
    const user = await base44.auth.me();
    createQuestionMutation.mutate({
      course_id: courseId,
      question_text: newQuestion,
      lesson_title: selectedLesson,
      author_name: user?.full_name || "Anonymous",
      author_email: user?.email || "",
      answers: [],
      upvotes: 0,
      is_resolved: false,
    });
  };

  const handleSubmitAnswer = async (question: Question) => {
    if (!newAnswer.trim()) return;
    const user = await base44.auth.me();
    const updatedAnswers = [
      ...(question.answers || []),
      {
        answer_text: newAnswer,
        author_name: user?.full_name || "Anonymous",
        author_email: user?.email || "",
        is_instructor: false,
        created_at: new Date().toISOString(),
        upvotes: 0,
      },
    ];
    updateQuestionMutation.mutate({
      id: question.id,
      data: { answers: updatedAnswers },
    });
    setNewAnswer("");
  };

  const handleUpvote = (question: Question) => {
    updateQuestionMutation.mutate({
      id: question.id,
      data: { upvotes: (question.upvotes || 0) + 1 },
    });
  };

  const handleMarkResolved = (question: Question) => {
    updateQuestionMutation.mutate({
      id: question.id,
      data: { is_resolved: true },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#1d69db]" />
          Q&A Discussion ({questions.length})
        </h3>
      </div>

      {/* Ask Question Form */}
      <Card className="border-2 border-dashed border-gray-200 hover:border-[#1d69db]/50 transition-colors">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1d69db]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#1d69db]" />
            </div>
            <span className="font-medium text-gray-700">Ask a question</span>
          </div>

          <Textarea
            placeholder="What would you like to know about this course?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="min-h-[100px] resize-none"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#1d69db]/20 focus:border-[#1d69db]"
            >
              <option value="">General Question</option>
              {courseLessons.map((lesson, idx) => (
                <option key={idx} value={lesson}>
                  {lesson}
                </option>
              ))}
            </select>

            <Button
              onClick={handleSubmitQuestion}
              disabled={!newQuestion.trim() || createQuestionMutation.isPending}
              className="bg-[#1d69db] hover:bg-[#1557b8]"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No questions yet. Be the first to ask!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card
                  className={`overflow-hidden ${
                    question.is_resolved
                      ? "border-green-200 bg-green-50/30"
                      : ""
                  }`}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <span className="font-semibold text-gray-600">
                            {question.author_name?.charAt(0) || "A"}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900">
                              {question.author_name}
                            </span>
                            {question.lesson_title && (
                              <Badge variant="outline" className="text-xs">
                                {question.lesson_title}
                              </Badge>
                            )}
                            {question.is_resolved && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {question.created_date &&
                              format(
                                new Date(question.created_date),
                                "MMM d, yyyy"
                              )}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvote(question)}
                        className="flex items-center gap-1 text-gray-500 hover:text-[#1d69db]"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.upvotes || 0}</span>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-2">
                    <p className="text-gray-700 mb-4">
                      {question.question_text}
                    </p>

                    {/* Answers */}
                    <div className="border-t border-gray-100 pt-4">
                      <button
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === question.id
                              ? null
                              : question.id
                          )
                        }
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1d69db]"
                      >
                        {expandedQuestion === question.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        {question.answers?.length || 0} Answers
                      </button>

                      <AnimatePresence>
                        {expandedQuestion === question.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-4">
                              {question.answers?.map((answer, idx) => (
                                <div
                                  key={idx}
                                  className="pl-4 border-l-2 border-gray-200"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-gray-800">
                                      {answer.author_name}
                                    </span>
                                    {answer.is_instructor && (
                                      <Badge className="bg-purple-100 text-purple-700 text-xs">
                                        <Award className="w-3 h-3 mr-1" />
                                        Instructor
                                      </Badge>
                                    )}
                                    <span className="text-xs text-gray-400">
                                      {answer.created_at &&
                                        format(
                                          new Date(answer.created_at),
                                          "MMM d"
                                        )}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 text-sm">
                                    {answer.answer_text}
                                  </p>
                                </div>
                              ))}

                              {/* Add Answer */}
                              <div className="flex gap-2 pt-2">
                                <Input
                                  placeholder="Write an answer..."
                                  value={newAnswer}
                                  onChange={(e) => setNewAnswer(e.target.value)}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleSubmitAnswer(question)}
                                  disabled={!newAnswer.trim()}
                                  className="bg-[#1d69db] hover:bg-[#1557b8]"
                                >
                                  Reply
                                </Button>
                              </div>

                              {!question.is_resolved && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkResolved(question)}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Mark as Resolved
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
