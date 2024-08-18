"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import useCreateOfferCode from "@/hooks/offers/useCreateOfferCode";
import { OfferModelType } from "@/types/models/offers.type";
import { useForm } from "react-hook-form";

function OfferForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<OfferModelType>();
  const { addNewOffCode, isCreateLoading } = useCreateOfferCode();
  const offerCodeHandler = async (data: OfferModelType) => {
    try {
      const { code, maxUsage, percent } = data;
      await addNewOffCode(
        {
          data: { code, maxUsage: Number(maxUsage), percent: Number(percent) },
        },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(offerCodeHandler)}
      className="flex flex-col justify-between items-center mt-8 p-6 border border-main_brown"
    >
      <div className="flex sm:flex-row flex-col gap-y-4 sm:gap-y-0 w-full child:w-full gap-x-6  items-center">
        <MainTextField
          type="text"
          register={register}
          errors={errors}
          id="code"
          name="code"
          variant="borderFill"
          label="کد تخفیف"
          className="w-full border-main_brown"
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد نمی تواند خالی باشد",
            },
            maxLength: {
              value: 50,
              message: "حداکثر ۵۰ کاراکتر",
            },
          }}
        />
        <MainTextField
          type="number"
          register={register}
          errors={errors}
          id="percent"
          name="percent"
          variant="borderFill"
          label="درصد تخفیف"
          className="w-full
           border-main_brown"
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد نمی تواند خالی باشد",
            },
            min: {
              value: 5,
              message: "حداقل ۵ درصد",
            },
            max: {
              value: 100,
              message: "حداکثر ۱۰۰ درصد",
            },
          }}
        />
      </div>
      <div className="w-full mt-4  gap-x-6 flex sm:flex-row  flex-col gap-y-4 sm:gap-y-0 ">
        <div className="sm:w-1/2 sm:pl-3">
          <MainTextField
            type="number"
            register={register}
            errors={errors}
            id="maxUsage"
            name="maxUsage"
            variant="borderFill"
            label="تعداد مجاز استفاده"
            validattionschema={{
              required: {
                value: true,
                message: "این فیلد نمی تواند خالی باشد",
              },
            }}
            className=" border-main_brown !w-full "
          />
        </div>

        <MainBtn
          type="submit"
          disabled={!isValid || !Object.keys(dirtyFields).length}
          size="medium"
          className={`
            mr-auto mt-auto w-full sm:w-[190px]
            ${
              !isValid || !Object.keys(dirtyFields).length
                ? "opacity-50"
                : "opacity-100"
            }`}
        >
          {isCreateLoading ? (
            <Loader loadingCondition={isCreateLoading} />
          ) : (
            "ایجاد کد"
          )}
        </MainBtn>
      </div>
    </form>
  );
}

export default OfferForm;
