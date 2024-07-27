import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "../firebaseApp";
import { CommentsInterface } from "../typings/post.types";

export function useComment(id: string) {
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: (commentObj: CommentsInterface) =>
      createComment(id, commentObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  const removeComment = useMutation({
    mutationFn: (data: { comment: CommentsInterface }) =>
      deleteComment(id, data.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return { addComment, removeComment };
}
