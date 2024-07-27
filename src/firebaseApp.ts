import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  CategoryType,
  CommentsInterface,
  PostProps,
  TabType,
} from "./typings/post.types";

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
const auth = getAuth(app);

export const db = getFirestore(app);

export default firebase;

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function createPost({
  title,
  content,
  category,
  user,
}: {
  title: string;
  content: string;
  category: string;
  user: User | null;
}): Promise<void> {
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

export async function getPosts(
  activeTab: TabType | CategoryType,
  user: User | null
): Promise<PostProps[]> {
  const postRef = collection(db, "posts");
  let postQuery;

  if (activeTab === "my" && user) {
    postQuery = query(
      postRef,
      where("uid", "==", user.uid),
      orderBy("createdAt", "asc")
    );
  } else if (activeTab === "all") {
    postQuery = query(postRef, orderBy("createdAt", "asc"));
  } else {
    postQuery = query(
      postRef,
      where("category", "==", activeTab),
      orderBy("createdAt", "asc")
    );
  }

  const datas = await getDocs(postQuery);
  const posts: PostProps[] = [];

  datas?.forEach((data) => {
    const dataObj = { ...data.data(), id: data.id } as PostProps;
    posts.push(dataObj);
  });

  return posts;
}

export async function getPost(id: string): Promise<PostProps> {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...(docSnap.data() as PostProps) };
}

export async function updatePost({
  id,
  title,
  content,
  category,
}: {
  id: string;
  title: string;
  content: string;
  category: CategoryType;
}): Promise<void> {
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

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}

export async function createComment(
  id: string,
  commentObj: CommentsInterface
): Promise<void> {
  const postRef = doc(db, "posts", id);

  await updateDoc(postRef, {
    comments: arrayUnion(commentObj),
    updatedAt: new Date()?.toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  });
}

export async function deleteComment(
  id: string,
  data: CommentsInterface
): Promise<void> {
  const postRef = doc(db, "posts", id);

  await updateDoc(postRef, {
    comments: arrayRemove(data),
  });
}
