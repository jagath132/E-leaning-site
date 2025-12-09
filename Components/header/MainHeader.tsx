import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44, User as Base44User } from "@/api/base44Client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Compass,
  Search,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  Settings,
  Bell,
  Blocks,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Generative AI",
  "AI & Machine Learning",
  "Data Science",
  "Project Management",
  "Cyber Security",
  "Agile & Scrum",
  "Cloud & DevOps",
  "Software Dev",
];

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<Base44User | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        // console.error("Auth check failed", error);
      }
    }
    checkUser();
  }, [location.pathname]); // Re-check on route change

  const handleLogout = async () => {
    try {
      await base44.auth.logout();
      setUser(null);
      toast.success("See you next time!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm py-2"
          : "bg-white border-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">

            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center group">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8 gap-6">

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none">
                  <Blocks className="w-4 h-4" />
                  Explore
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="start">
                  <DropdownMenuItem asChild>
                    <Link to="/courses" className="flex items-center gap-2 w-full cursor-pointer p-2.5 rounded-md font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 mb-2">
                      <Compass className="w-4 h-4" />
                      Browse All Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuLabel className="text-xs text-gray-400 font-normal uppercase tracking-wider px-2 py-1.5">Top Categories</DropdownMenuLabel>
                  {categories.map((category) => (
                    <Link key={category} to={`/courses?search=${encodeURIComponent(category)}`}>
                      <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-md text-gray-600 hover:text-gray-900">
                        {category}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Animated Search Bar */}
              <form
                onSubmit={handleSearch}
                className={`flex-1 relative transition-all duration-300 ease-in-out ${searchFocused ? 'scale-105' : ''}`}
              >
                <div className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200
                        ${searchFocused
                    ? 'bg-white border-blue-500 ring-4 ring-blue-500/10 shadow-lg'
                    : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm'
                  }
                    `}>
                  <Search className={`w-4 h-4 ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="bg-transparent border-none focus:outline-none w-full text-sm text-gray-900 placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  {/* Quick Action Hint */}
                  {!searchQuery && !searchFocused && (
                    <div className="hidden xl:flex text-[10px] font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
                      /
                    </div>
                  )}
                </div>
              </form>

            </div>

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-4">

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium">
                      My Learning
                    </Button>
                  </Link>

                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 p-1 pl-2 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all bg-white group focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <div className="text-right hidden xl:block">
                          <p className="text-xs font-semibold text-gray-900 leading-none">{user.full_name}</p>
                          <p className="text-[10px] text-gray-500 leading-none mt-1">Student</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200 group-hover:border-blue-200 transition-colors">
                          {user.photo_url ? (
                            <img src={user.photo_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xs">
                              {user.full_name?.charAt(0) || "U"}
                            </div>
                          )}
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2" align="end">
                      <div className="p-2 border-b border-gray-100 mb-1 xl:hidden">
                        <p className="font-semibold">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/profile">
                        <DropdownMenuItem className="cursor-pointer gap-2 py-2.5">
                          <User className="w-4 h-4 text-gray-500" />
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/dashboard">
                        <DropdownMenuItem className="cursor-pointer gap-2 py-2.5">
                          <LayoutDashboard className="w-4 h-4 text-gray-500" />
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer gap-2 py-2.5">
                        <Settings className="w-4 h-4 text-gray-500" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" className="font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
                  <span className="font-bold text-lg">Menu</span>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                {user && (
                  <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{user.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      className="pl-9 bg-gray-50 border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>

                <div className="space-y-1">
                  {user && (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-base font-normal h-11 text-gray-600">
                          <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
                          My Dashboard
                        </Button>
                      </Link>
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-base font-normal h-11 text-gray-600">
                          <User className="w-5 h-5 mr-3 text-gray-400" />
                          My Profile
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link to="/courses" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base font-normal h-11 text-gray-600">
                      <Compass className="w-5 h-5 mr-3 text-gray-400" />
                      Explore Courses
                    </Button>
                  </Link>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                  <div className="space-y-1">
                    {categories.slice(0, 5).map(cat => (
                      <Link key={cat} to={`/courses?search=${encodeURIComponent(cat)}`} onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-sm font-normal text-gray-600 h-9">
                          {cat}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t bg-gray-50">
                {user ? (
                  <Button onClick={handleLogout} variant="destructive" className="w-full shadow-none bg-red-100 text-red-600 hover:bg-red-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
