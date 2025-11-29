// Mock Base44 client for local development
// In production, this would connect to Base44 BaaS

interface Entity<T> {
  list: (sort?: string) => Promise<T[]>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  filter: (query: Record<string, any>) => Promise<T[]>;
}

interface Auth {
  me: () => Promise<{ id: string; full_name: string; email: string }>;
}

interface Base44Client {
  auth: Auth;
  entities: {
    Course: Entity<any>;
    Question: Entity<any>;
    Bookmark: Entity<any>;
    UserProgress: Entity<any>;
    CourseView: Entity<any>;
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

  async filter(query: Record<string, any>): Promise<T[]> {
    return this.data.filter((item) =>
      Object.entries(query).every(
        ([key, value]) => (item as any)[key] === value
      )
    );
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
