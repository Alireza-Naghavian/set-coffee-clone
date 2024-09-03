import dbConnection from "@/dbConfigs/db";
import OfferModel from "@/models/offers/offer";
import { OfferModelType } from "@/types/models/offers.type";
import { authAdmin } from "@/utils/auth/authHelper";
import { offerSchema } from "@/utils/validator/offer/offervalidator";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const reqBody: OfferModelType = await req.json();
    const { code, maxUsage, percent } = reqBody;
    await offerSchema.validateAsync(reqBody);
    const isCodeExist = await OfferModel.findOne({ code: code });
    if (isCodeExist) {
      return Response.json(
        { message: "این کد قبلا ثبت شده است" },
        { status: 403 }
      );
    }
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
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }

    const offerCodes = await OfferModel.find({}, "-__V -UpdatedAt");
    if (!offerCodes)
      return Response.json(
        { message: "کد تخفیفی ثبت نشده است" },
        { status: 404 }
      );

    return Response.json(offerCodes, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
export const PATCH = async (req: Request) => {
  try {
    await dbConnection();
    const reqBody = await req.json();
    const { code } = reqBody;

    const offer = await OfferModel.findOne({ code: code });
    if (!offer) {
      return Response.json({ message: "کد تخفیف معتبر نیست" }, { status: 404 });
    }
    if (offer.uses >= offer.maxUsage) {
      return Response.json(
        { message: "تعداد دفعات استفاده بیش از حد مجاز رسیده است" },
        { status: 403 }
      );
    }

    const newOfferData = await OfferModel.findOneAndUpdate(
      { code: code },
      { $set: { uses: offer.uses + 1 } }
    );

    return Response.json(
      { message: "کد تخفیف با موفقیت اعمال شد", data: newOfferData },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
