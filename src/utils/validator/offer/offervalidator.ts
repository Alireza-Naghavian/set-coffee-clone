import Joi from "joi";
import createHttpError from "http-errors";
export const offerSchema = Joi.object().keys({
  code: Joi.string()
    .required()
    .max(50)
    .error(createHttpError.BadRequest("کد تخفیف معتبر نمی باشد")),
  maxUsage: Joi.number()
    .required()
    .error(createHttpError.BadRequest("مقدار حداکثر استفاده معتبر نمی باشد")),
  percent: Joi.number()
    .required()
    .max(100)
    .min(5)
    .error(createHttpError.BadRequest("درصد تخفیف مورد نظر معتبر نمی باشد")),
});
