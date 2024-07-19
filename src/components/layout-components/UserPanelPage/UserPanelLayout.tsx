import Table from "@/components/UI/Table/Table";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { TbChecklist } from "react-icons/tb";
import styles from "./myAccount.module.css";
import AccountDetail from "./subRoutes/AccountDetail";
function UserPanelLayout() {

  return (
    <div>
      {/* <DefaultPage /> */}
      {/* <OrderList/> */}
      <AccountDetail />
    </div>
  );
}

const DefaultPage = () => {
  return (
    <div className="flex flex-col  relative ">
      <div className="w-full  text-mute">
        <p className=" text-right  ">
          <span>سلام</span>
          &nbsp;
          <b>alireza</b>
        </p>
        <p className="mt-2 pb-2">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
      </div>
      <div className={styles.defaultPage_Grid_Sec}>
        <Link href={""} className="flex-center flex-col">
          <TbChecklist className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">سفارش ها</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <HiOutlineUserCircle className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">جزئیات حساب</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <FaShuffle className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">مقایسه</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <FaRegHeart className="text-[65px]" />
          <span className="text-lg font-Shabnam_M tracking-tighter ">
            لیست علاقه مندی ها
          </span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <IoIosLogOut className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">خروج</span>
        </Link>
      </div>
    </div>
  );
};
const OrderList = ()=>{
  return(
    <div className="md:h-[513px] h-[315px] px-4 md:max-h-[513px] overflow-y-auto">
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    <Table>
    <Table.Header cols={"grid-cols-6"}>
      <th>عنوان</th>
      <th>قیمت</th>
      <th>دسته بندی</th>
      <th>تعداد</th>
      <th>وضعیت </th>

    </Table.Header>
    <Table.Body>
      <Table.Row cols="grid-cols-6">
        <td>قهوه عربیکا</td>
        <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
        <td>Primium Coffee</td>
        <td>{Number(2).toLocaleString("fa-Ir")}</td>
        <td className="!text-green-600">تکمیل شده</td>
      </Table.Row>
    </Table.Body>
    </Table>
    </div>
  )
}


export default UserPanelLayout;
