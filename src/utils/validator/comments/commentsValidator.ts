import createHttpError from "http-errors";
import Joi from "joi";

const createErrorMessage = (field: any, min: any, max: any) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `حداقل ${min} کاراکتر.`,
  "string.max": `حداکثر ${max} کاراکتر.`,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});

export const commentSchema = Joi.object().keys({
  commentBody: Joi.string()
    .required()
    .max(1300)
    .messages(createErrorMessage("متن کامنت", 0, 1500)),
  score: Joi.number()
    .required()
    .default(3)
    .min(1)
    .max(5)
    .messages(createErrorMessage("امتیاز", 1, 5))
    .error(createHttpError.BadRequest("امتیاز وارد شده معتبر نیست")),
  productId: Joi.string()
    .required()
    .min(1)
    .messages(createErrorMessage("آیدی محصول", 1, Infinity))
    .error(createHttpError.BadRequest("آیدی محصول معتبر نمی باشد")),
});
