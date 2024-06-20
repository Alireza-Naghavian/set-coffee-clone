import createHttpError from "http-errors";
import Joi from "joi";
const pattern = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const signUpUserSchema = Joi.object().keys({
  userName: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(15)
    .messages({
      "string.empty": `نام کاربری "نمی تواند خالی باشد`,
      "string.min": "نام کاربری وارد شده معتبر نمی باشد (حداقل ۴ کاراکتر)",
      "string.max": "نام کاربری وارد شده صحیح نمی باشد (حداکثر ۱۵ کاراکتر)",
    })
    .error(createHttpError.BadRequest("(حداقل ۴،حداکثر۱۵کاراکتر)نام کاربری وارد شده معتبر نمی باشد")),
  email: Joi.string()
    .required()
    .email()
    .pattern(emailPattern)
    .trim()
    .message("ایمیل وارد شده معتبر نمی باشد")
    .error(createHttpError.BadRequest("ایمیل وارد شده معتبر نمی باشد.")),
  password: Joi.string()
    .required()
    .min(4)
    .max(12)
    .trim()
    .messages({
      "string.min": "کلمه عبور وارد شده معتبر نمی باشد. حداقل ۴ کاراکتر!",
      "string.max": "کلمه عبور وارد شده معتبر نمی باشد. حداکثر ۱۲ کاراکتر!",
      "any.required": "کلمه عبور الزامی است.",
    })
    .error(
      createHttpError.BadRequest(
        "(حداقل ۴ وحداکثر ۱۲ کاراکتر)کلمه عبور وارد شده معتبر نمی باشد!"
      )
    ),
  phoneNumber: Joi.string()
    .pattern(pattern)
    .required()
    .messages({
      "any.required": "شماره موبایل الزامی است",
      "string.empty": `شماره موبایل الزامی است`,
      "string.pattern.base": "شماره موبایل معبتر نمی باشد",
    })
    .error(createHttpError.BadRequest("شماره موبایل معتبر نمی باشد")),
});
