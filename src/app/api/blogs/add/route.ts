import webPush from "web-push";
import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import { MainBlogType } from "@/types/blog.type";
import { authAdmin, getUser } from "@/utils/auth/authHelper";
import { blogSchema } from "@/utils/validator/blogs/blogsValidator";
import subscribeModel from "@/models/subscription/subsctipton";
export const dynamic = "force-dynamic";
webPush.setVapidDetails(
  `mailto:${process.env.MYMAIL}`,
  process.env.VAPID_PUBLIC_KEY! ,
  process.env.VAPID_PRIVATE_KEY!
);
webPush.setGCMAPIKey(process.env.GCMSERVERKEY!)
export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const user = await getUser();
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      return Response.json(
        { message: "شما اجازه دسترسی ندارید" },
        { status: 403 }
      );
    }
    const reqBody: MainBlogType = await req.json();
    const { cover, longDesc, provider, shortDesc, title,isActiveNotif } = reqBody;
    await blogSchema.validateAsync({ cover, longDesc, provider, shortDesc, title });

    const newBlog = await BlogsModel.create({ cover, longDesc, provider, shortDesc, title });
    if(isActiveNotif){
      const subscription = await subscribeModel.find();
      const payload = JSON.stringify({
        title:`مقاله جدید ${title} متتشر شد`,
        body:shortDesc,
        cover,
        data:{url:`/blogs/${newBlog._id}`},
        url:`/blogs/${newBlog._id}`
      })
      subscription.forEach(async(sub)=>{
        try {

            await webPush.sendNotification(sub,payload);
       
        } catch (error:any) {
          if(error.statusCode === 410){
            return await subscribeModel.findOneAndDelete({_id:sub._id})
          }
          console.log("خطا در ارسال اعلان",error);
        }
      })
    }

    return Response.json(
      { message: "مقاله با موفقیت افزوده شد" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
