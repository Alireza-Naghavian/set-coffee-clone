import { getAllComments } from "@/services/comments/commentsServices";
import { CommentModeltype } from "@/types/models/comment.type";
import { useQuery } from "@tanstack/react-query";

const useGetAllComments = (CommentsData:CommentModeltype) => {
  const { data: comments, isPending: isCommentsLoading } = useQuery({
    queryKey: ["allComments"],
    queryFn: getAllComments,
    initialData:CommentsData
  });
  return { comments, isCommentsLoading };
};
export default useGetAllComments;
