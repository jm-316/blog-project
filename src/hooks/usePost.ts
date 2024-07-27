import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
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
  const queries = useQueries({
    queries: [
      {
        enabled: !!activeTab && !!user,
        queryKey: ["posts", activeTab],
        queryFn: () => {
          if (activeTab && user) {
            return getPosts(activeTab, user);
          }
        },
      },
      {
        enabled: !!id,
        queryKey: ["post", id],
        queryFn: () => {
          if (id) return getPost(id);
        },
      },
    ],
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

  const posts = queries[0].data;
  const post = queries[1].data;

  const isLoadingPosts = queries[0].isLoading;
  const isLoadingPost = queries[1].isLoading;
  const isLoading = isLoadingPosts || isLoadingPost;

  const refetchPosts = queries[0].refetch;
  const refetchPost = queries[1].refetch;

  return {
    posts,
    post,
    isLoading,
    refetchPost,
    refetchPosts,
    newPost,
    addPost,
    removePost,
  };
}
