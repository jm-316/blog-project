import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../firebaseApp";
import { CategoryType, TabType } from "../typings/post.types";

export function usePost(
  id?: string,
  activeTab?: TabType | CategoryType | null,
  user?: User | null
) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    enabled: !!activeTab,
    queryKey: ["posts", activeTab],
    queryFn: () => {
      if (activeTab !== null && activeTab !== undefined) {
        return getPosts(activeTab, user ?? null);
      }
    },
  });

  const postQuery = useQuery({
    enabled: !!id,
    queryKey: ["post", id],
    queryFn: () => {
      if (id) return getPost(id);
    },
  });

  const newPost = useMutation({
    mutationFn: (post: {
      title: string;
      content: string;
      category: string;
      user: User | null;
    }) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const addPost = useMutation({
    mutationFn: (post: {
      id: string;
      title: string;
      content: string;
      category: CategoryType;
    }) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const removePost = useMutation({
    mutationFn: (id: string) => deletePost(id),
  });

  return {
    posts: postsQuery.data,
    post: postQuery.data,
    isLoading: postsQuery.isLoading || postQuery.isLoading,
    refetchPosts: postsQuery.refetch,
    refetchPost: postQuery.refetch,
    newPost,
    addPost,
    removePost,
  };
}
