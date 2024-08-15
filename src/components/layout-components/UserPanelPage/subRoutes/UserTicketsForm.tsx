"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import Select from "@/components/Utils-components/Select/Select";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useAddTicket from "@/hooks/tickets&department/useAddTicket";
import useGetAllDept from "@/hooks/tickets&department/useGetAllDept";
import { priorityValues } from "@/utils/constants";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./myAccount.module.css";
import Link from "next/link";
function UserTicketsForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({ mode: "onChange" });
  const { allDepts } = useGetAllDept();
  const [dept, setDept] = useState(
    allDepts ? allDepts[0]?._id : "66ad368af04d52d21afa187b"
  );
  const [priority, setPriority] = useState("1");
  const { addTicket, isAddLoading } = useAddTicket();
  const { user } = useGetMe();
  const changeDeptKey: any =allDepts && allDepts?.map((data: any) => {
      return { label: data.title, value: data._id };
    });
  const deptHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDept(e.target.value);
  };
  const priorityHanlder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };
  const ticketHandler = async (data: any) => {
    try {
      const priorityNumber = parseInt(priority, 10);
      await addTicket({
       ...data,
        dept,
        priority: priorityNumber,
        user: user?._id,
      },{onSuccess:()=>{
        reset();
      }});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full px-4">
      <div
        className="relative w-full sm:h-[3px] flex xs:flex-wrap sm:flex-nowrap
                   justify-between sm:bg-main_brown mt-12">
        <h1 className={`${styles.add_ticket_header}   right-10`}>
          ارسال تیکت جدید
        </h1>
        <Link href={"/my-account/tickets/all-user-tickets"}
          className={`${styles.add_ticket_header}  ${styles.allTicket}   mr-auto `}
        >
          همه تیکت ها
        </Link>
      </div>
      <div className="mt-8 w-full relative">
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(ticketHandler)}
        >
          <div className=" grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6  ">
            <MainTextField
              id="title"
              label="عنوان تیکت"
              register={register}
              name="title"
              errors={errors}
              required={true}
              variant="borderFill"
              placeHolder="موضوع تیکت خود را بیان کنید"
              className="w-full  border-main_brown mb-auto"
              type="text"
              validattionschema={{
                required: {
                  value: true,
                  message: "عنوان نمی تواند خالی باشد",
                },
                maxLength: {
                  value: 60,
                  message: "حداکثر ۶۰ کاراکتر",
                },
              }}
            />
            <div className="flex flex-col gap-y-2">
              <Select
                className="border-2 py-2 sm:mt-[22.5px] md:mt-[4px] border-main_brown md:mb-auto "
                onChange={deptHandler}
                value={dept}
                selectTitle="دپارتمان مورد نظر "
                options={changeDeptKey}
              />
              <span className="mt-1 w-full"></span>
            </div>
          </div>
          <div className=" sm:mt-6 grid  sm:grid-cols-2 sm:gap-y-0 gap-y-4 sm:pl-6 ">
            <Select
              className="border-2 py-2 border-main_brown"
              onChange={priorityHanlder}
              value={priority}
              selectTitle="سطح اولویت"
              options={priorityValues}
            />
          </div>
          <div className="mt-6 w-full   ">
            <TextAriaField
              errors={errors}
              className="border-2 border-main_brown"
              id="body"
              name="body"
              register={register}
              type="text"
              variant="outLine"
              label="محتوای تیکت"
              validattionschema={{
                required: {
                  value: true,
                  message: "محتوا نمی تواند خالی باشد",
                },
                maxLength: {
                  value: 800,
                  message: "حداکثر ۸۰۰ کاراکتر",
                },
              }}
            />
          </div>
          <MainBtn
            type="submit"
            className={` mt-4 mr-auto  ${
              !isValid || !Object.keys(dirtyFields).length
                ? "opacity-50"
                : "opacity-100"
            }`}
            disabled={!isValid || !Object.keys(dirtyFields).length}
            size="small"
          >
            {isAddLoading ? (
              <Loader loadingCondition={isAddLoading} />
            ) : (
              "ارسال تیکت"
            )}
          </MainBtn>
        </form>
      </div>
    </div>
  );
}

export default UserTicketsForm;
