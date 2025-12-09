
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import MainHeader from "../Components/header/MainHeader";
import MainFooter from "../Components/footer/MainFooter";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Clock,
    Star,
    Users,
    Filter,
    Search,
    BookOpen,
    LayoutGrid,
    List,
    User
} from "lucide-react";
import { motion } from "framer-motion";

export default function Courses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearch = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popular");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Sync state with URL search param
    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => base44.entities.Course.list(),
    });

    const categories = Array.from(new Set(courses.map((c) => c.category))).filter(Boolean);

    // Filter and Sort Logic
    const filteredCourses = courses.filter((course) => {
        // Search
        if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !course.category.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Categories
        if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
            return false;
        }

        // Price (Assuming course entity has price, if not we mock it or skip)
        // Note: Mock entity might not have price, checking typings later. 
        // For now, skipping price filter logic if field missing.

        // Rating
        // Assuming mock entity has rating or reviews

        return true;
    }).sort((a, b) => {
        if (sortBy === "newest") return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        if (sortBy === "popular") return (b.enrollment_count || 0) - (a.enrollment_count || 0);
        // Price sort would go here
        return 0;
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams(prev => {
            if (searchQuery) prev.set("search", searchQuery);
            else prev.delete("search");
            return prev;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MainHeader />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {searchQuery ? `Results for "${searchQuery}"` : "All Courses"}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Showing {filteredCourses.length} courses
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="md:hidden flex-1">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </Button>
                        </div>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="rating">Highest Rated</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="hidden md:flex bg-white rounded-lg border p-1">
                            <button
                                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500"
                                    }`}
                                onClick={() => setViewMode("grid")}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500"
                                    }`}
                                onClick={() => setViewMode("list")}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Filters Overlay */}
                {isMobileFiltersOpen && (
                    <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileFiltersOpen(false)} />
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`
            lg:w-64 space-y-8 
            ${isMobileFiltersOpen ? 'fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-xl overflow-y-auto' : 'hidden lg:block'}
          `}>
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <Button variant="ghost" size="sm" onClick={() => setIsMobileFiltersOpen(false)}>Close</Button>
                        </div>

                        {/* Search within results */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Search keywords</h3>
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search courses..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        <Separator />

                        {/* Categories */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${category}`}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <label
                                            htmlFor={`cat-${category}`}
                                            className="text-sm text-gray-600 cursor-pointer"
                                        >
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Price (Mock) */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Price Range</h3>
                            <Slider
                                value={priceRange}
                                max={200}
                                step={10}
                                onValueChange={setPriceRange}
                                className="my-4"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}+</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Ratings */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Ratings</h3>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`rating-${rating}`}
                                            checked={selectedRating === rating}
                                            onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                        />
                                        <label htmlFor={`rating-${rating}`} className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span>& Up</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* Course Grid */}
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <div key={n} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                                <Button
                                    variant="link"
                                    className="mt-4 text-[#1d69db]"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategories([]);
                                        setSelectedRating(null);
                                    }}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        ) : (
                            <div className={`
                    grid gap-6 
                    ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}
                `}>
                                {filteredCourses.map((course) => (
                                    <Link key={course.id} to={`/course?id=${course.id}`}>
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className={`bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all h-full flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}
                                        >
                                            <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'w-full h-48'}`}>
                                                <img
                                                    src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
                                                    {course.category}
                                                </Badge>
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
                                                    <div className="flex items-center gap-1">
                                                        <BookOpen className="w-3 h-3" />
                                                        <span>24 Lessons</span>
                                                    </div>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{course.duration}</span>
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 flex-grow">
                                                    {course.title}
                                                </h3>

                                                {viewMode === 'list' && (
                                                    <p className="text-sm text-gray-600 line-clamp-2 marginBottom-4">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Quisquam voluptatum, quibusdam, quia, quod voluptate voluptas
                                                        quos exercitationem.
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between mt-4 md:mt-auto pt-4 border-t border-gray-50">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <User className="w-3 h-3 text-gray-500" />
                                                        </div>
                                                        <span className="text-xs text-gray-600">{course.partner || "Instructor"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-bold text-gray-700">4.8</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination (Mock) */}
                        {filteredCourses.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="outline" size="sm" className="bg-[#1d69db] text-white border-[#1d69db]">1</Button>
                                    <Button variant="outline" size="sm">2</Button>
                                    <Button variant="outline" size="sm">3</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <MainFooter />
        </div>
    );
}
