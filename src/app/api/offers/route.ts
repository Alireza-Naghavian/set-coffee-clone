import dbConnection from "@/dbConfigs/db";
import OfferModel from "@/models/offers/offer";
import { OfferModelType } from "@/types/models/offers.type";
import { getUser } from "@/utils/auth/authHelper";
import { offerSchema } from "@/utils/validator/offer/offervalidator";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    const reqBody: OfferModelType = await req.json();
    const { code, maxUsage, percent } = reqBody;
    await offerSchema.validateAsync(reqBody);
    await OfferModel.create({ code, maxUsage, percent });
    return Response.json(
      { message: "کد تخفیف با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }

    const offerCodes = await OfferModel.find({}, "-__V -UpdatedAt");
    if (!offerCodes)
      return Response.json(
        { message: "کد تخفیفی ثبت نشده است" },
        { status: 404 }
      );

    return Response.json({ offerCodes }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
