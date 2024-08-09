import createHttpError from "http-errors";
import Joi from "joi";
const createErrorMessage = (field: any, min: any, max: any) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `حداقل ${min} کاراکتر.`,
  "string.max": `حداکثر ${max} کاراکتر.`,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});
export const categorySchema = Joi.object().keys({
  title: Joi.string()
    .required()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "عنوان دسته بندی نمیتواند خالی باشد.",
      "string.min": "حداقل ۳ کاراکتر",
      "string.max": "حداکثر ۲۰ کاراکتر",
    })
    .error(
      createHttpError.BadRequest(
        "عنوان وارد شده معتبر نمی باشد (حداقل ۴،حداکثر ۲۰ کاراکتر)"
      )
    ),
});

export const productSchema = Joi.object().keys({
  category: Joi.string()
    .required()
    .messages(createErrorMessage("دسته بندی", 1, Infinity))
    .error(
      createHttpError.BadRequest("عنوان دسته بندی وارد شده معتبر نمی‌باشد")
    ),

  cover: Joi.string()
    .required()
    .messages(createErrorMessage("کاور محصول", 1, Infinity))
    .error(createHttpError.BadRequest("کاور محصول معتبر نمی‌باشد")),

  longDesc: Joi.string()
    .required()
    .min(10)
    .messages({
      ...createErrorMessage("توضیحات اصلی کالا", 10, Infinity),
    })
    .error(
      createHttpError.BadRequest(
        "توضیحات اصلی کالا معتبر نمی‌باشد (حداقل ۱۰ کاراکتر)"
      )
    ),

  title: Joi.string()
    .required()
    .min(3)
    .max(200)
    .messages(createErrorMessage("عنوان کالا", 3, 20))
    .error(
      createHttpError.BadRequest(
        "عنوان کالا معتبر نمی‌باشد (حداقل ۳، حداکثر ۲۰ کاراکتر)"
      )
    ),

  price: Joi.number()
    .required()
    .messages({ "any.required": "مبلغ وارد شده معتبر نمی‌باشد" })
    .error(createHttpError.BadRequest("مبلغ وارد شده معتبر نمی‌باشد")),

  shortDesc: Joi.string()
    .required()
    .min(10)
    .messages(createErrorMessage("قسمت توضیحات کوتاه", 10, Infinity))
    .error(
      createHttpError.BadRequest(
        "قسمت توضیحات کوتاه معتبر نمی‌باشد (حداقل ۱۰، حداکثر ۵۰ کاراکتر)"
      )
    ),

  smell: Joi.string()
    .required()
    .min(3)

    .messages(createErrorMessage("قسمت عطر کالا", 3, Infinity))
    .error(
      createHttpError.BadRequest(
        "قسمت عطر کالا معتبر نمی‌باشد (حداقل ۳، حداکثر ۲۰ کاراکتر)"
      )
    ),

  suitableFor: Joi.string()
    .required()
    .min(3)

    .messages(createErrorMessage("قسمت مخاطب کالا", 3, Infinity))
    .error(
      createHttpError.BadRequest(
        "قسمت مخاطب کالا معتبر نمی‌باشد (حداقل ۳، حداکثر ۲۲۰ کاراکتر)"
      )
    ),

  tags: Joi.array()
    .required()
    .max(8)
    .messages({
      "array.max": "حداکثر ۸ تگ مجاز است",
      "any.required": "تگ‌های وارد شده معتبر نمی‌باشند",
    })
    .error(createHttpError.BadRequest("تگ‌های وارد شده معتبر نمی‌باشند")),

  weight: Joi.number()
    .required()
    .messages({ "any.required": "وزن وارد شده معتبر نمی‌باشد" })
    .error(createHttpError.BadRequest("وزن وارد شده معتبر نمی‌باشد")),
  entities: Joi.number()
    .required()
    .min(1)
    .messages(createErrorMessage("موجودی", 1, Infinity))
    .error(createHttpError.BadRequest("مقدار محصول معتبر نمی باشد")),
});
