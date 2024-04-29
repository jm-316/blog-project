import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebaseApp";
import { useEffect, useState } from "react";
import { CategoryType, PostProps, TabType } from "../typings/post.types";

export default function UseGetPosts(
  activeTab: TabType | CategoryType,
  user: User | null
) {
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function fetchPosts() {
    setPosts([]);

    const postRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      postsQuery = query(
        postRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
    } else if (activeTab === "all") {
      postsQuery = query(postRef, orderBy("createdAt", "asc"));
    } else {
      postsQuery = query(
        postRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }

    const datas = await getDocs(postsQuery);

    datas?.forEach((data) => {
      const dataObj = { ...data.data(), id: data.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  }
  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  return { posts, getPosts: fetchPosts };
}
