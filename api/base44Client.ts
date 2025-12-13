
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDoc,
  setDoc,

} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { db, auth as firebaseAuth } from "@/lib/firebase";

// Mock Base44 client for local development
// Using localStorage for persistence to simulate a real backend

export interface User {
  id: string;
  full_name: string;
  email: string;
  password?: string; // Not stored in Firestore, just for type compatibility
  created_at?: string;
  photo_url?: string;
}

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
  user_id: string;
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
  me: () => Promise<User | null>;
  login: (email: string, password: string) => Promise<User>;
  signup: (data: Partial<User>) => Promise<User>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<User>;
  loginWithGithub: () => Promise<User>;
  handleRedirectResult: () => Promise<User | null>;
}

interface Base44Client {
  auth: Auth;
  entities: {
    Course: Entity<Course>;
    Question: Entity<Question>;
    Bookmark: Entity<Bookmark>;
    UserProgress: Entity<UserProgress>;
    CourseView: Entity<CourseView>;
    User: Entity<User>;
  };
}

class FirebaseEntity<T extends { id: string }> implements Entity<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async list(sortStr?: string): Promise<T[]> {
    const colRef = collection(db, this.collectionName);
    let q = query(colRef);

    if (sortStr) {
      const [field, order] = sortStr.startsWith("-")
        ? [sortStr.slice(1), "desc"]
        : [sortStr, "asc"];
      q = query(colRef, orderBy(field, order as "asc" | "desc"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
  }

  async create(data: Partial<T>): Promise<T> {
    const colRef = collection(db, this.collectionName);
    // If ID is provided, use setDoc, otherwise addDoc
    if (data.id) {
      const docRef = doc(db, this.collectionName, data.id);
      await setDoc(docRef as any, data as any);
      return { ...data } as T;
    } else {
      const docRef = await addDoc(colRef as any, data as any);
      return { ...data, id: docRef.id } as T;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, data as any);
    const snap = await getDoc(docRef);
    return { ...snap.data(), id: snap.id } as T;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async filter(queryObj: Record<string, any>, sortStr?: string): Promise<T[]> {
    const colRef = collection(db, this.collectionName);
    const constraints: any[] = [];

    Object.entries(queryObj).forEach(([key, value]) => {
      constraints.push(where(key, "==", value));
    });

    if (sortStr) {
      const [field, order] = sortStr.startsWith("-")
        ? [sortStr.slice(1), "desc"]
        : [sortStr, "asc"];
      constraints.push(orderBy(field, order as "asc" | "desc"));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
  }
}


import { GoogleAuthProvider, GithubAuthProvider, getRedirectResult } from "firebase/auth";


// Auth implementation
const authImplementation: Auth = {
  me: () => new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      unsubscribe();
      if (user) {
        resolve({
          id: user.uid,
          full_name: user.displayName || "User",
          email: user.email || "",
          photo_url: user.photoURL || undefined
        });
      } else {
        resolve(null);
      }
    });
  }),

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    return {
      id: user.uid,
      full_name: user.displayName || "User",
      email: user.email || "",
      photo_url: user.photoURL || undefined
    };
  },

  signup: async (data) => {
    if (!data.email || !data.password) throw new Error("Email and password required");

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
    const user = userCredential.user;

    if (data.full_name) {
      await updateProfile(user, { displayName: data.full_name });
    }

    const userData: User = {
      id: user.uid,
      full_name: data.full_name || "User",
      email: data.email,
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  },

  logout: async () => {
    await signOut(firebaseAuth);
  },


  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Use popup for better reliability
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      // Check if user exists in 'users' collection, if not add them
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const userData: User = {
          id: user.uid,
          full_name: user.displayName || "User",
          email: user.email || "",
          created_at: new Date().toISOString(),
          photo_url: user.photoURL || undefined
        };
        await setDoc(userDocRef, userData);
        return userData;
      }

      const existingUserData = userDocSnap.data();
      return {
        id: user.uid,
        full_name: user.displayName || existingUserData?.full_name || "User",
        email: user.email || "",
        photo_url: user.photoURL || existingUserData?.photo_url || undefined
      };
    } catch (error: any) {
      console.error('Google login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      throw new Error(error.message || 'Google login failed');
    }
  },

  loginWithGithub: async () => {
    const provider = new GithubAuthProvider();
    try {
      // Use popup for better reliability
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      // Check if user exists in 'users' collection, if not add them
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const userData: User = {
          id: user.uid,
          full_name: user.displayName || "User",
          email: user.email || "",
          created_at: new Date().toISOString(),
          photo_url: user.photoURL || undefined
        };
        await setDoc(userDocRef, userData);
        return userData;
      }

      const existingUserData = userDocSnap.data();
      return {
        id: user.uid,
        full_name: user.displayName || existingUserData?.full_name || "User",
        email: user.email || "",
        photo_url: user.photoURL || existingUserData?.photo_url || undefined
      };
    } catch (error: any) {
      console.error('GitHub login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      throw new Error(error.message || 'GitHub login failed');
    }
  },


  // Handle redirect result after OAuth login
  handleRedirectResult: async () => {
    try {
      const result = await getRedirectResult(firebaseAuth);
      if (result) {
        const user = result.user;
        console.log('OAuth redirect successful:', user.email);

        // Check if user exists in 'users' collection, if not add them
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log('Creating new user document for:', user.email);
          const userData: User = {
            id: user.uid,
            full_name: user.displayName || "User",
            email: user.email || "",
            created_at: new Date().toISOString(),
            photo_url: user.photoURL || undefined
          };
          await setDoc(userDocRef, userData);
          return userData;
        }

        // Return existing user data
        const existingUserData = userDocSnap.data();
        return {
          id: user.uid,
          full_name: user.displayName || existingUserData?.full_name || "User",
          email: user.email || "",
          photo_url: user.photoURL || existingUserData?.photo_url || undefined
        };
      }
      return null;
    } catch (error: any) {
      console.error('OAuth redirect error:', error);
      // Re-throw with more context
      throw new Error(error.message || 'OAuth authentication failed');
    }
  }
};

export const base44: Base44Client = {
  auth: authImplementation,
  entities: {
    Course: new FirebaseEntity<Course>("courses"),
    Question: new FirebaseEntity<Question>("questions"),
    Bookmark: new FirebaseEntity<Bookmark>("bookmarks"),
    UserProgress: new FirebaseEntity<UserProgress>("user_progress"),
    CourseView: new FirebaseEntity<CourseView>("course_views"),
    User: new FirebaseEntity<User>("users")
  },
};

