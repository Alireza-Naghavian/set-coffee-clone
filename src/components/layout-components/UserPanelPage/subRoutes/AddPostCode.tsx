import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import useUpdatePostCode from "@/hooks/authHooks/useUpdatePostCode";
import { convertToEnglishDigits } from "@/utils/convertors/ToEnDigits";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type ForValuesType = {
  postCode: string;
};

function AddPostCode() {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForValuesType>();
  const { UpdatePostCode, isUpdating } = useUpdatePostCode();
  const postCodeHandler: SubmitHandler<ForValuesType> = async ({postCode}) => {
    try {
      const toEnDigit = convertToEnglishDigits(postCode)
      const postCodeNumber = parseInt(toEnDigit, 10); 
      await UpdatePostCode(
        { postCode:postCodeNumber },
        {
          onSuccess: (data: any) => {
            toast.success(data);
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        }
      );
    } catch (error: any) {
     return console.log(error.response.data.message);
    }
  };
  return (
    <form
      className=" flex flex-col gap-y-4"
      onSubmit={handleSubmit(postCodeHandler)}
    >
      <MainTextField
        register={register}
        required={false}
        label="کد پستی"
        variant="outLine"
        type="text"
        name="postCode"
        id="postCode"
        errors={errors}
        readOnly={false}
        validattionschema={{
          required: {
            value: true,
            message: "فیلد نمی تواند خالی باشد",
          },
          maxLength: {
            value: 10,
            message: "کد پستی باید ۱۰ رقم  باشد",
          },
          minLength: {
            value: 10,
            message: "کد پستی باید ۱۰ رقم  باشد",
          },
        }}
      />
      <MainBtn
        className="mr-auto"
        size="small"
        variant="secondary"
        type="submit"
      >
{isUpdating ? <Loader loadingCondition={isUpdating}/> : "ذخیره"}
      </MainBtn>
    </form>
  );
}

export default AddPostCode;
