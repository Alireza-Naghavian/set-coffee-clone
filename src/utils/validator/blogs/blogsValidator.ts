import createHttpError from "http-errors";
import Joi from "joi";
const createErrorMessage = (field: any, min: any, max: any) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `حداقل ${min} کاراکتر.`,
  "string.max": `حداکثر ${max} کاراکتر.`,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});
export const blogSchema = Joi.object().keys({
  title: Joi.string()
    .required()
    .min(3)
    .max(200)
    .messages(createErrorMessage("عنوان مقاله", 3, 20))
    .error(
      createHttpError.BadRequest(
        "عنوان مقاله معتبر نمی‌باشد (حداقل ۳، حداکثر ۲۰ کاراکتر)"
      )
    ),
  shortDesc: Joi.string()
    .required()
    .min(10)
    .messages(createErrorMessage("قسمت توضیحات کوتاه", 10, Infinity))
    .error(
      createHttpError.BadRequest(
        "قسمت توضیحات کوتاه معتبر نمی‌باشد (حداقل ۱۰، حداکثر ۵۰ کاراکتر)"
      )
    ),
  cover: Joi.string()
    .required()
    .messages(createErrorMessage("کاور مقاله", 1, Infinity))
    .error(createHttpError.BadRequest("کاور مقاله معتبر نمی‌باشد")),
  longDesc: Joi.string()
    .required()
    .min(10)
    .messages({
      ...createErrorMessage("محتوای مقاله", 10, Infinity),
    })
    .error(
      createHttpError.BadRequest(
        "  محتوای مقاله معتبر نمی‌باشد (حداقل ۱۰ کاراکتر)"
      )
    ),
});
