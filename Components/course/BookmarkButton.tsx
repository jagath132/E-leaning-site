import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44, Bookmark } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Bookmark as BookmarkIcon, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

interface BookmarkButtonProps {
  courseId: string;
  courseTitle: string;
  lessonTitle: string;
  lessonIndex: number;
  isBookmarked?: boolean;
  bookmarkId?: string | null;
  onBookmarkChange?: () => void;
}

export default function BookmarkButton({
  courseId,
  courseTitle,
  lessonTitle,
  lessonIndex,
  isBookmarked = false,
  bookmarkId = null,
  onBookmarkChange,
}: BookmarkButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();

  const createBookmarkMutation = useMutation({
    mutationFn: (data: Partial<Bookmark>) =>
      base44.entities.Bookmark.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Lesson bookmarked!");
      setShowDialog(false);
      setNotes("");
      onBookmarkChange?.();
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (id: string) => base44.entities.Bookmark.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark removed");
      onBookmarkChange?.();
    },
  });

  const handleToggleBookmark = () => {
    if (isBookmarked && bookmarkId) {
      deleteBookmarkMutation.mutate(bookmarkId);
    } else {
      setShowDialog(true);
    }
  };

  const handleSaveBookmark = () => {
    createBookmarkMutation.mutate({
      course_id: courseId,
      course_title: courseTitle,
      lesson_title: lessonTitle,
      lesson_index: lessonIndex,
      notes: notes,
    });
  };

  return (
    <>
      <Button
        variant={isBookmarked ? "default" : "outline"}
        size="sm"
        onClick={handleToggleBookmark}
        className={isBookmarked ? "bg-[#ff6b35] hover:bg-[#e55a2b]" : ""}
      >
        {isBookmarked ? (
          <>
            <BookmarkCheck className="w-4 h-4 mr-1" />
            Bookmarked
          </>
        ) : (
          <>
            <BookmarkIcon className="w-4 h-4 mr-1" />
            Bookmark
          </>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bookmark Lesson</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Course</p>
              <p className="font-medium">{courseTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Lesson</p>
              <p className="font-medium">{lessonTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Add notes (optional)</p>
              <Textarea
                placeholder="Why are you bookmarking this lesson?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveBookmark}
              disabled={createBookmarkMutation.isPending}
              className="bg-[#1d69db] hover:bg-[#1557b8]"
            >
              Save Bookmark
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
