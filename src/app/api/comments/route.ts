import dbConnection from "@/dbConfigs/db";
import CommentModel from "@/models/comment/comment";

export const GET = async () => {
  try {
    await dbConnection();
    const allComments = await CommentModel.find({}, "-__V");
    return Response.json({ data: allComments });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
