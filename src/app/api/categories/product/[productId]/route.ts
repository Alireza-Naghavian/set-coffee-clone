import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import subscribeModel from "@/models/subscription/subsctipton";
import { SingleProductType } from "@/types/models/categories.type";
import { authAdmin } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import webPush from "web-push";
webPush.setVapidDetails(
  `mailto:${process.env.MYMAIL}`,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);
webPush.setGCMAPIKey(process.env.GCMSERVERKEY!);
export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const { productId } = params;
    if (!isValidObjectId(productId))
      return Response.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    const product = await ProductModel.findOneAndDelete({ _id: productId });
    if (!product)
      return Response.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    await CategoryModel.updateMany(
      { "products._id": productId },
      { $pull: { products: { _id: productId } } }
    );
    await CommentModel.deleteMany({productId:productId})
    revalidatePath(`/categories/${productId}`);
    revalidatePath(`/`);
    revalidatePath(`/categories/product`);
    revalidatePath("/p-admin/products/manage");
    return Response.json(
      { message: "محصول با موفقیت حذف شد." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const { productId } = params;
    if (!isValidObjectId(productId))
      return Response.json(
        { message: "شناسه محصول معتبر نیست" },
        { status: 404 }
      );

    const reqBody: SingleProductType = await req.json();
    const { title, price, entities, smell, weight, suitableFor, shortDesc } =
      reqBody;
    const product = await ProductModel.findOne({ _id: productId });
    const shortDescData = shortDesc.trim() || product.shortDesc;

    const updateProduct = await ProductModel.findByIdAndUpdate(
       productId,
      {
        $set: {
          title,
          price,
          entities,
          smell,
          weight,
          suitableFor,
          shortDesc: shortDescData,
        },
      },
      { new: true }
    );
    await CategoryModel.updateMany(
      { "products._id": productId },
      {
        $set: {
          "products.$.title": title,
          "products.$.price": price,
          "products.$.entities": entities,
          "products.$.smell": smell,
          "products.$.weight": weight,
          "products.$.suitableFor": suitableFor,
          "products.$.shortDesc": shortDescData,
        },
      }
    );
    const subscription = await subscribeModel.find();
    const payload = JSON.stringify({
      title: "بحنب تا دیر نشده!!",
      body: `تعداد ${entities}عدد از محصول ${updateProduct.title} موجود شد \n همین حالا خریدتو انجام بده`,
      cover:product.cover,
      data: { url: `/categories/${updateProduct._id}` },
      url: `/categories/${updateProduct._id}`,
    });
    subscription.forEach(async (sub) => {
      try {
        await webPush.sendNotification(sub, payload);
      } catch (error: any) {
        if (error.statusCode === 410) {
          return await subscribeModel.findOneAndDelete({ _id: sub._id });
        }
        console.log("خطا در ارسال اعلان", error);
      }
    });
    revalidatePath(`/categories/${productId}`);
    revalidatePath(`/`);
    revalidatePath(`/categories/product`);
    revalidatePath(`/categories`);
    return Response.json(
      { message: "محصول با موفقیت آپدیت شد" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
export const GET = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const { productId } = params;
    if (!isValidObjectId(productId)) {
      throw notFound();
    }
    await CommentModel.find().limit(0);
    const product = await ProductModel.findOne({ _id: productId }, "-__v")
      .populate({
        path: "category",
        select: "-__v",
        populate: { path: "products", options: { limit: 4 } },
      })
      .populate({
        path: "ProductComment",
        populate: {
          path: "messages.sender",
          select: "userName role",
        },
      })
      .lean();

    if (!product) throw notFound();
    return Response.json({ data: product }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
