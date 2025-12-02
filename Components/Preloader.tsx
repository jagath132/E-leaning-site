import { motion } from "framer-motion";

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <h2 className="text-2xl font-bold text-primary tracking-wider">Simplilearn</h2>
            </div>
        </motion.div>
    );
}
