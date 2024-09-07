import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useAddNewOrder from "@/hooks/orders/useAddNewOrder";
import { ProductCartType } from "@/types/products.type";
import { useState } from "react";
import EditModal from "../../AdminPanel/subRoutes/modals/EditModal";
import AddPostCode from "../../UserPanelPage/subRoutes/AddPostCode";
import styles from "../Cart.module.css";

function TotalPriceSection({ userBasket }: { userBasket: ProductCartType[] }) {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);
  const totalCount = userBasket.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
  const totalBaketPrice = userBasket
    .map((product: ProductCartType) => {
      return product.price * product.count;
    })
    .reduce((acc, curr) => acc + curr, 0);
  const VATRate = 0.09; //VAT in Iran
  const taxPerBasket = totalBaketPrice * VATRate;
  const finalPayPrice = totalBaketPrice + taxPerBasket;
  const { user } = useGetMe();
  const { addOrder, isOrderLoading } = useAddNewOrder();
  // payment
  const addOrderHandler = () => {
    if (user?.postCode === 0) {
      setIsPostCodeOpen(true);
      return;
    }
    addOrder(
      {
        order: {
          cart: userBasket,
          postCode: user?.postCode,
          totalItem: totalCount,
          totalPrice: finalPayPrice,
          user: user?._id,
        },
      },
      {
        onSuccess: () => {
          location.replace("/my-account/orders");
        },
      }
    );
  };
  return (
    <>
        <EditModal
          isOpen={isPostCodeOpen}
          modalTitle="لطفا کد پستی خود را وارد کنید"
          setIsOpen={()=>setIsPostCodeOpen(false)}
          className="!h-[230px] rounded-xl !top-[30%]">
          <div className="px-8 py-2">
          <AddPostCode setIsPostCodeOpen={setIsPostCodeOpen}/>
          </div>
        </EditModal>

      <div className={styles.total_price_wrapper}>
        <p className={styles.total_price_title}>جمع کل سبد خرید</p>
        {/* number of  product in basket */}
        <span className={styles.total_Price_group}>
          <span>محصولات داخل سبد خرید:</span>
          <span className="flex gap-x-1">
            <span>{totalCount.toLocaleString("fa-Ir")}</span>
            <span> محصول</span>
          </span>
        </span>
        {/* total basket price */}
        <span className={styles.total_Price_group}>
          <span> مجموع قیمت سبد خرید:</span>
          <span className="flex gap-x-1">
            <span>{totalBaketPrice.toLocaleString("fa-Ir")}</span>
            <span>تومان</span>
          </span>
        </span>
        {/* tax? */}
        <span className={styles.total_Price_group}>
          <span>مالیات ارزش بر افزوده:</span>
          <span className="flex gap-x-1">
            <span>{taxPerBasket.toLocaleString("fa-Ir")}</span>

            <span>تومان</span>
          </span>
        </span>
        {/* final price */}
        <span className={styles.total_Price_group}>
          <span className=" text-xl"> مبلغ قابل پرداخت:</span>
          <span className=" text-lg flex gap-x-1">
            <span>{finalPayPrice.toLocaleString("fa-Ir")}</span>
            <span>تومان</span>
          </span>
        </span>
        <MainBtn onClick={addOrderHandler} className="mt-12 ">
          {isOrderLoading ? (
            <Loader loadingCondition={isOrderLoading} />
          ) : (
            "نهایی کردن خرید (پرداخت در محل)"
          )}
        </MainBtn>
      </div>
    </>
  );
}

export default TotalPriceSection;
