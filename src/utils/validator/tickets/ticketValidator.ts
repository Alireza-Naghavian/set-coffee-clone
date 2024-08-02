import createHttpError from "http-errors";
import Joi from "joi";
const createErrorMessage = (field: any, min: any, max: any) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `حداقل ${min} کاراکتر.`,
  "string.max": `حداکثر ${max} کاراکتر.`,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});
export const TicketSchema = Joi.object().keys({
  title: Joi.string()
    .max(120)
    .required()
    .messages(createErrorMessage("عنوان تیکت", 0, 120)),
  body: Joi.string()
    .max(800)
    .required()
    .messages(createErrorMessage("موضوع تیکت", 0, 800)),
  dept: Joi.string()
    .min(1)
    .required()
    .messages(createErrorMessage("شناسه دپارتمان", 1, Infinity))
    .error(createHttpError.BadRequest("شناسه دپارتمان معتبر نمی باشد.")),
  user: Joi.string()
    .min(0)
    .required()
   
    .error(createHttpError.BadRequest("شناسه کاربر معتبر نمی باشد.")),
  priority: Joi.number()
    .error(createHttpError.BadRequest("سطح اولویت معتبر نمی باشد.")),
});
