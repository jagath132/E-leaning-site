import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, Send } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call with faster response
        await new Promise((resolve) => setTimeout(resolve, 600));
        setLoading(false);
        setSubmitted(true);
        toast.success("Reset link sent to your email");
    };

    return (
        <AuthLayout title="Reset Password" subtitle="We'll send you instructions to reset it">
            <div className="space-y-4 sm:space-y-5">
                {!submitted ? (
                    <form onSubmit={handleReset} className="space-y-4 sm:space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <motion.div
                                className="relative group"
                                animate={{
                                    scale: focusedField === 'email' ? 1.02 : 1,
                                }}
                                transition={{ duration: 0.15 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-200" />
                                <Mail className={`absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 ${focusedField === 'email' ? 'text-purple-600 scale-110' : 'text-gray-400'}`} />
                                <Input
                                    type="email"
                                    placeholder="Email address"
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="relative pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 text-slate-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus-visible:border-purple-500 transition-all duration-200 rounded-xl"
                                    required
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <Button
                                type="submit"
                                className="relative w-full h-11 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/50 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/60 active:scale-[0.98] rounded-xl overflow-hidden group"
                                disabled={loading}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            Send Reset Link
                                        </>
                                    )}
                                </span>
                            </Button>
                        </motion.div>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="text-center p-5 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                        >
                            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </motion.div>
                        <p className="text-green-700 font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                            Check your email!
                        </p>
                        <p className="text-green-600 text-xs sm:text-sm">
                            We've sent password reset instructions to your email address.
                        </p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-4 sm:mt-6"
                >
                    <Link
                        to="/login"
                        className="inline-flex items-center text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                        Back to Sign In
                    </Link>
                </motion.div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
