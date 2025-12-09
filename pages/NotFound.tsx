
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <HelpCircle className="w-16 h-16 text-[#1d69db]" />
                    </div>
                </div>

                <h1 className="text-9xl font-bold text-gray-900 tracking-tighter">404</h1>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
                    <p className="text-gray-500">
                        Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link to="/">
                        <Button className="w-full sm:w-auto bg-[#1d69db] hover:bg-[#1557b8]">
                            Generate Home
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.history.back()}>
                        <MoveLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
