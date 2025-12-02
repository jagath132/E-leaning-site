import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/home";
import Dashboard from "../pages/Dashboard";
import CoursePage from "../pages/CoursePage";
import Preloader from "../Components/Preloader";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
