import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Grid3X3,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categories = [
  "Generative AI",
  "AI & Machine Learning",
  "Data Science & Business Analytics",
  "Project Management",
  "Cyber Security",
  "Agile and Scrum",
  "Cloud Computing & DevOps",
  "Software Development",
  "Digital Marketing",
];

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Simplilearn"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* All Courses Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#1d69db] hover:bg-[#1557b8] text-white rounded-full px-5 py-2 flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  All Courses
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className="cursor-pointer py-3 px-4 rounded-lg hover:bg-gray-50"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-72 rounded-full border-gray-200 focus:border-[#1d69db] focus:ring-[#1d69db]"
              />
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-700 hover:text-[#1d69db] font-medium transition-colors"
              >
                For Business
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#1d69db] font-medium transition-colors"
              >
                Resources
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#1d69db] font-medium transition-colors">
                  More
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>About Us</DropdownMenuItem>
                  <DropdownMenuItem>Careers</DropdownMenuItem>
                  <DropdownMenuItem>Blog</DropdownMenuItem>
                  <DropdownMenuItem>Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Dashboard & Login Buttons */}
            <Link to={createPageUrl("Dashboard")}>
              <Button
                variant="ghost"
                className="rounded-full px-4 hover:text-[#1d69db]"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                My Learning
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full px-6 border-gray-300 hover:border-[#1d69db] hover:text-[#1d69db]"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="What do you want to learn?"
                className="pl-11 pr-4 py-2.5 w-full rounded-full border-gray-200"
              />
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-gray-700 py-2 font-medium">
                All Courses
              </a>
              <a href="#" className="text-gray-700 py-2 font-medium">
                For Business
              </a>
              <a href="#" className="text-gray-700 py-2 font-medium">
                Resources
              </a>
              <a href="#" className="text-gray-700 py-2 font-medium">
                About Us
              </a>
              <Button className="bg-[#1d69db] hover:bg-[#1557b8] text-white rounded-full mt-2">
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
