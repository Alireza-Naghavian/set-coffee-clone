import createHttpError from "http-errors";
import Joi from "joi";
const pattern = /^(\\+98|0)?9[0-9]{9}$/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const signUpUserSchema = Joi.object().keys({
  userName: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(30)
    .messages({
      "string.empty": `نام کاربری "نمی تواند خالی باشد`,
      "string.min": "نام کاربری وارد شده معتبر نمی باشد (حداقل ۴ کاراکتر)",
      "string.max": "نام کاربری وارد شده صحیح نمی باشد (حداکثر ۳۰ کاراکتر)",
    })
    .error(
      createHttpError.BadRequest(
        "(حداقل ۴،حداکثر۳۰کاراکتر)نام کاربری وارد شده معتبر نمی باشد"
      )
    ),
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

export const signInUserSchema = Joi.object().keys({
  identifier: Joi.string()
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
});
export const sendOtpSchema = Joi.object().keys({
  identifier: Joi.string()
    .pattern(pattern)
    .required()
    .messages({
      "any.required": "شماره موبایل الزامی است",
      "string.empty": `شماره موبایل الزامی است`,
      "string.pattern.base": "شماره موبایل معبتر نمی باشد",
    })
    .error(createHttpError.BadRequest("شماره موبایل معتبر نمی باشد")),
});
export const checkOtpSchema = Joi.object().keys({
  phoneNumber: Joi.string()
    .pattern(pattern)
    .required()
    .messages({
      "any.required": "شماره موبایل الزامی است",
      "string.empty": `شماره موبایل الزامی است`,
      "string.pattern.base": "شماره موبایل معبتر نمی باشد",
    })
    .error(createHttpError.BadRequest("شماره موبایل معتبر نمی باشد")),
  code: Joi.string()
    .required()
    .max(6)
    .messages({
      "any.required": "کد تایید الزامی است",
      "string.max": "حداکثر ۶ کاراکتر",
    })
    .error(createHttpError.BadRequest("کد تایید معتبر نمی باشد")),
});


export const updateProfileSchema = Joi.object().keys({
  newUserName: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(30)
    .messages({
      "string.empty": `نام کاربری "نمی تواند خالی باشد`,
      "string.min": "نام کاربری وارد شده معتبر نمی باشد (حداقل ۴ کاراکتر)",
      "string.max": "نام کاربری وارد شده صحیح نمی باشد (حداکثر ۳۰ کاراکتر)",
    })
    .error(
      createHttpError.BadRequest(
        "(حداقل ۴،حداکثر۳۰کاراکتر)نام کاربری وارد شده معتبر نمی باشد"
      )
    ),
    lastPassword:Joi.string()
    .required()
    .min(4)
    .max(12)
    .trim()
    .messages({
      "string.min": "کلمه عبور وارد شده معتبر نمی باشد. حداقل ۴ کاراکتر!",
      "string.max": "کلمه عبور وارد شده معتبر نمی باشد. حداکثر ۱۲ کاراکتر!",
      "any.required": "کلمه عبور الزامی است.",
    }),
    newPassword: Joi.string()
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
});
