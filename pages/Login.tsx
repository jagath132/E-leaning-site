import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Github, Eye, EyeOff, Zap } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call with faster response
        await new Promise((resolve) => setTimeout(resolve, 600));
        setLoading(false);
        navigate("/dashboard");
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to continue your learning journey">
            <form onSubmit={handleLogin} className="space-y-5">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                >
                    <motion.div
                        className="relative group"
                        animate={{
                            scale: focusedField === 'email' ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />
                        <Mail className={`absolute left-3 top-3 h-5 w-5 transition-all duration-300 ${focusedField === 'email' ? 'text-purple-600 scale-110' : 'text-gray-400'}`} />
                        <Input
                            type="email"
                            placeholder="Email address"
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="relative pl-10 h-12 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 text-slate-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus-visible:border-purple-500 transition-all duration-300 rounded-xl"
                            required
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                >
                    <motion.div
                        className="relative group"
                        animate={{
                            scale: focusedField === 'password' ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />
                        <Lock className={`absolute left-3 top-3 h-5 w-5 transition-all duration-300 ${focusedField === 'password' ? 'text-purple-600 scale-110' : 'text-gray-400'}`} />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            className="relative pl-10 pr-10 h-12 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 text-slate-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus-visible:border-purple-500 transition-all duration-300 rounded-xl"
                            required
                        />
                        <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-3 top-3 text-gray-400 hover:text-purple-600 transition-colors focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </motion.button>
                    </motion.div>
                </motion.div>

                <div className="flex justify-end">
                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        Forgot password?
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <Button
                        type="submit"
                        className="relative w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/60 active:scale-[0.98] rounded-xl overflow-hidden group"
                        disabled={loading}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Zap className="h-4 w-4" />
                                    Sign In
                                </>
                            )}
                        </span>
                    </Button>
                </motion.div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-500 font-medium">
                            Or continue with
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white border-2 border-slate-200 text-slate-700 hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:border-purple-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                        >
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white border-2 border-slate-200 text-slate-700 hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-center text-sm text-gray-600 mt-6"
                >
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        Sign up
                    </Link>
                </motion.p>
            </form>
        </AuthLayout>
    );
};

export default Login;
