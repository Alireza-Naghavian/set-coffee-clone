import { getAllComments } from "@/services/comments/commentsServices";
import { CommentModeltype } from "@/types/models/comment.type";
import { useQuery } from "@tanstack/react-query";

const useGetAllComments = () => {
  const { data , isPending: isCommentsLoading } = useQuery({
    queryKey: ["allComments"],
    queryFn: getAllComments,
  });
  const comments = data || []
  return { comments, isCommentsLoading };
};
export default useGetAllComments;
