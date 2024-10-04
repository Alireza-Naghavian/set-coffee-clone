"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import SimpleCheckBox from "@/components/UI/TextFiels/SimpleCheckBox";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useAddBlog from "@/hooks/blogs/useAddBlog";
import { MainBlogType } from "@/types/blog.type";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const TextEditor = dynamic(
  () => import("@/components/Utils-components/TextEditor/TextEditor"), {ssr: false}
);
function AddBLogForm() {
  const [longDesc, setLongDesc] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<MainBlogType>({ mode: "onChange" });
  const { user } = useGetMe();
  const { addBlog, isAddLoading } = useAddBlog();
  const addBlogHandler = async (data: MainBlogType) => {
    try {
      const blogData = {...data,longDesc,provider:user._id}
      await addBlog({data:blogData},{
        onSuccess:()=>{
          reset();
          setLongDesc("")
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(addBlogHandler)}
      className=" w-full space-y-4  py-10 px-2  lg:h-[480px]  overflow-y-auto"
    >
      <div className="grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6 ">
        <MainTextField
          register={register}
          name="title"
          id="title"
          label="عنوان مقاله"
          variant="borderFill"
          type="text"
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
          }}
          errors={errors}
          className="border-main_brown"
        />
        <MainTextField
          register={register}
          name="cover"
          id="cover"
          label=":کاور مقاله"
          variant="borderFill"
          type="url"
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
          }}
          errors={errors}
          className="border-main_brown"
        />
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <TextAriaField
          name="shortDesc"
          id="shortDesc"
          label="توضیحات کوتاه"
          variant="borderFill"
          register={register}
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
            minLength: {
              value: 10,
              message: "حداقل ۱۰ کاراکتر",
            },
          }}
          errors={errors}
          className="border-main_brown w-full"
          type="text"
        />
        <SimpleCheckBox
        register={register}
        errors={errors}
        required={false}
        name="isActiveNotif"
        id="isActiveNotif"
        type="checkbox"
        label="اعلان ارسال شود؟"
        className="text-2xl"
        />
      </div>

      <div className="mt-10 ">
        <TextEditor
          label="توضیحات کامل"
          onChange={setLongDesc} value={longDesc} 
        />
      </div>
      <div className="max-w-[150px] mr-auto">
        <MainBtn
          disabled={!isValid || !Object.keys(dirtyFields).length}
          type="submit"
          size="medium"
          className={`${
            !isValid || !Object.keys(dirtyFields).length
              ? "opacity-50"
              : "opacity-100"
          }`}
        >
          {isAddLoading ? <Loader loadingCondition={isAddLoading} /> : "افزودن"}
        </MainBtn>
      </div>
    </form>
  );
}

export default AddBLogForm;
