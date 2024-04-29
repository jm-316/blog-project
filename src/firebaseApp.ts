import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { CategoryType, PostProps } from "./typings/post.types";

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_API_ID,
};

try {
  app = getApp("app");
} catch (error) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;

export async function createPost(
  title: string,
  content: string,
  category: string,
  user: User | null
) {
  await addDoc(collection(db, "posts"), {
    title,
    content,
    createdAt: new Date()?.toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    email: user?.email,
    uid: user?.uid,
    category,
  });
}

export async function getPost(id: string, callback: (post: PostProps) => void) {
  if (id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    callback({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  }
}

export async function updatePost(
  id: string,
  title: string,
  content: string,
  category: CategoryType
) {
  const postRef = doc(db, "posts", id);

  await updateDoc(postRef, {
    title: title,
    content: content,
    updatedAt: new Date()?.toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    category: category,
  });
}
