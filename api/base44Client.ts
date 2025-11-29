// Mock Base44 client for local development
// In production, this would connect to Base44 BaaS

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  cohort_start: string;
  partner: string;
  image_url: string;
  is_popular: boolean;
}

export interface Question {
  id: string;
  course_id: string;
  question_text: string;
  lesson_title: string;
  author_name: string;
  author_email: string;
  answers: Answer[];
  upvotes: number;
  is_resolved: boolean;
  created_date?: string;
}

export interface Answer {
  id?: string;
  answer_text: string;
  author_name: string;
  author_email: string;
  upvotes: number;
  created_at: string;
  is_instructor?: boolean;
}

export interface Bookmark {
  id: string;
  course_id: string;
  course_title: string;
  lesson_title: string;
  lesson_index: number;
  notes: string;
  created_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  completed_lessons: number[];
  last_accessed: string;
  time_spent_minutes: number;
  total_lessons?: number;
  is_saved?: boolean;
  course_image?: string;
  course_title?: string;
  course_category?: string;
  course_duration?: string;
}

export interface CourseView {
  id: string;
  course_id: string;
  user_id: string;
  is_saved: boolean;
  last_accessed: string;
  course_category?: string;
  view_count?: number;
}

interface Entity<T> {
  list: (sort?: string) => Promise<T[]>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  filter: (query: Record<string, any>, sort?: string) => Promise<T[]>;
}

interface Auth {
  me: () => Promise<{ id: string; full_name: string; email: string }>;
}

interface Base44Client {
  auth: Auth;
  entities: {
    Course: Entity<Course>;
    Question: Entity<Question>;
    Bookmark: Entity<Bookmark>;
    UserProgress: Entity<UserProgress>;
    CourseView: Entity<CourseView>;
  };
}

// Load initial data from JSON files
const loadData = async (filename: string) => {
  try {
    const response = await fetch(`/Entites/${filename}`);
    return await response.json();
  } catch (error) {
    console.warn(`Failed to load ${filename}, using empty array`);
    return [];
  }
};

class MockEntity<T extends { id: string }> implements Entity<T> {
  private data: T[] = [];
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadData();
  }

  private async loadData() {
    this.data = await loadData(this.filename);
  }

  async list(sort?: string): Promise<T[]> {
    let result = [...this.data];
    if (sort) {
      const [field, order] = sort.startsWith("-")
        ? [sort.slice(1), "desc"]
        : [sort, "asc"];
      result.sort((a, b) => {
        const aVal = (a as any)[field];
        const bVal = (b as any)[field];
        if (order === "desc") {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    return result;
  }

  async create(data: Partial<T>): Promise<T> {
    const newItem = { ...data, id: Date.now().toString() } as T;
    this.data.push(newItem);
    return newItem;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    this.data[index] = { ...this.data[index], ...data };
    return this.data[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    this.data.splice(index, 1);
  }

  async filter(query: Record<string, any>, sort?: string): Promise<T[]> {
    let result = this.data.filter((item) =>
      Object.entries(query).every(
        ([key, value]) => (item as any)[key] === value
      )
    );
    if (sort) {
      const [field, order] = sort.startsWith("-")
        ? [sort.slice(1), "desc"]
        : [sort, "asc"];
      result.sort((a, b) => {
        const aVal = (a as any)[field];
        const bVal = (b as any)[field];
        if (order === "desc") {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    return result;
  }
}

const mockAuth: Auth = {
  me: async () => ({
    id: "1",
    full_name: "John Doe",
    email: "john@example.com",
  }),
};

export const base44: Base44Client = {
  auth: mockAuth,
  entities: {
    Course: new MockEntity("Courses.json"),
    Question: new MockEntity("Question.json"),
    Bookmark: new MockEntity("Bookmark.json"),
    UserProgress: new MockEntity("UserProgress.json"),
    CourseView: new MockEntity("CourseView.json"),
  },
};
