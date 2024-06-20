import createHttpError from "http-errors";
import Joi from "joi";
const persianPhoneNumberRegex = /^(?:\+98|0098|0)?9\d{9}$/;
export const signUpUserSchema = Joi.object().keys({
  userName: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(20)
    .messages({
      "string.empty": `نام کاربری "نمی تواند خالی باشد`,
    })
    .error(createHttpError.BadRequest("نام کاربری وارد شده معتبر نمی باشد")),
  email: Joi.string()
    .required()
    .email()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .trim()
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
    .error(createHttpError.BadRequest("کلمه عبور وارد شده معتبر نمی باشد!")),
  phoneNumber: Joi.string()
    .pattern(persianPhoneNumberRegex)
    .required()
    .message("شماره موبایل معتبر نمی باشد")
    .error(createHttpError.BadRequest("شماره موبایل معتبر نمی باشد")),
});
