This project is built on the Base44 platform with the following tech stack:

Frontend
Technology Purpose
React Core UI framework
Tailwind CSS Styling and responsive design
shadcn/ui Pre-built UI components (Button, Card, Dialog, Tabs, etc.)
Lucide React Icon library
Framer Motion Animations and transitions
React Router DOM Navigation between pages
TanStack React Query Data fetching and state management
date-fns Date formatting
Backend (Base44 BaaS)
Feature Description
Entities/Database JSON schema-based data storage (Course, Question, Bookmark, UserProgress, CourseView)
Authentication Built-in user auth with base44.auth
CRUD Operations base44.entities.EntityName.list(), .create(), .update(), .delete(), .filter()
Key Entities Created
Course - Program listings with category, duration, partner info
Question - Q&A with answers, upvotes, resolution status
Bookmark - Saved lessons with notes
UserProgress - Learning tracking, completed lessons, time spent
CourseView - View history for recommendations
Features Implemented
Personalized recommendation engine
Q&A discussion system
Lesson bookmarking
Progress tracking dashboard
Animated hero section
Responsive design throughout
