
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainHeader from "../Components/header/MainHeader";
import MainFooter from "../Components/footer/MainFooter";
import { base44, User as Base44User } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, User, Lock, Bell, History } from "lucide-react";

export default function Profile() {
    const [user, setUser] = useState<Base44User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        title: "Student",
        bio: "",
        location: "",
        website: "",
        twitter: "",
        linkedin: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await base44.auth.me();
                setUser(currentUser);
                if (currentUser) {
                    setFormData({
                        full_name: currentUser.full_name || "",
                        email: currentUser.email || "",
                        title: "Student", // Mock fields for now
                        bio: "Passionate learner exploring new technologies.",
                        location: "San Francisco, CA",
                        website: "",
                        twitter: "",
                        linkedin: ""
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                toast.error("Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, we would update the user object via API
            // await base44.auth.updateProfile(formData);

            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Password updated successfully");
        } catch (error) {
            toast.error("Failed to update password");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#1d69db]" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <MainHeader />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
                        <Link to="/login">
                            <Button>Log In</Button>
                        </Link>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MainHeader />

            <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <nav className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start font-medium bg-white shadow-sm text-[#1d69db] hover:text-[#1d69db] hover:bg-blue-50">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium text-gray-600 hover:bg-white hover:shadow-sm">
                                <Lock className="w-4 h-4 mr-2" />
                                Security
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium text-gray-600 hover:bg-white hover:shadow-sm">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium text-gray-600 hover:bg-white hover:shadow-sm">
                                <History className="w-4 h-4 mr-2" />
                                Billing History
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Profile Header */}
                        <Card>
                            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative">
                                    <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                                        <AvatarImage src={user.photo_url} />
                                        <AvatarFallback className="text-2xl">{user.full_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0" variant="secondary">
                                        <User className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
                                    <p className="text-gray-500">{formData.email}</p>
                                    <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                                        <Button variant="outline" size="sm">Change Avatar</Button>
                                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete Account</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="general">
                            <TabsList className="bg-white p-1 border">
                                <TabsTrigger value="general">General Info</TabsTrigger>
                                <TabsTrigger value="social">Social Links</TabsTrigger>
                                <TabsTrigger value="security">Password</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Update your personal details here.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="full_name">Full Name</Label>
                                                    <Input
                                                        id="full_name"
                                                        name="full_name"
                                                        value={formData.full_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="title">Job Title</Label>
                                                    <Input
                                                        id="title"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        placeholder="e.g. UX Designer"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    placeholder="Tell us about yourself"
                                                    rows={4}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="City, Country"
                                                />
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <Button type="submit" disabled={isSaving}>
                                                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="social">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Social Profiles</CardTitle>
                                        <CardDescription>Add your social media links.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="website">Website</Label>
                                                <Input
                                                    id="website"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="twitter">Twitter</Label>
                                                <Input
                                                    id="twitter"
                                                    name="twitter"
                                                    value={formData.twitter}
                                                    onChange={handleInputChange}
                                                    placeholder="@username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="linkedin">LinkedIn</Label>
                                                <Input
                                                    id="linkedin"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleInputChange}
                                                    placeholder="Profile URL"
                                                />
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <Button type="submit" disabled={isSaving}>
                                                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                                    Save Socials
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Change Password</CardTitle>
                                        <CardDescription>Update your password to keep your account secure.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="current_password">Current Password</Label>
                                                <Input id="current_password" type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="new_password">New Password</Label>
                                                <Input id="new_password" type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirm_password">Confirm New Password</Label>
                                                <Input id="confirm_password" type="password" />
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <Button type="submit" disabled={isSaving}>
                                                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                                    Update Password
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <MainFooter />
        </div>
    );
}
