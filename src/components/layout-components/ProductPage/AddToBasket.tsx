import Alert from "@/components/UI/Alert/Alert";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import useAddToBasket from "@/hooks/orders/useAddToBasket";
import { SingleProductType } from "@/types/models/categories.type";
import { useCallback, useState } from "react";

const AddToBasket = ({ product }: { product: SingleProductType }) => {
  const [counter, setCounter] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsshow] = useState(false);
  const { addToBasket } = useAddToBasket();
  const addToCartHandler = useCallback(() => {
    setIsLoading(true);
    setIsshow(true);
    const timeOut = setTimeout(async () => {
      const newItem = {
        cover: product?.cover,
        title: product?.title,
        _id: product?._id,
        price: product?.price,
        count: counter,
        entities:product.entities
      };
      if (product._id === undefined) return;
      await addToBasket(
        { product: newItem, value: "setCoffeeBasket", counter },
        {
          onSuccess: () => {
            setIsshow(false);
            setCounter(1);
            setIsLoading(false);
          },
        }
      );
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [product, counter, addToBasket]);
  return (
    <>
      <Alert
        startShow={isShow}
        status="success"
        title="محصول به سبد خرید افزوده شد"
      />
      <div className="flex gap-x-3 items-center">
        <div className="flex gap-x-0 items-center child:text-base child:py-2 child:px-3 child:font-bold child:border">
          <button
            aria-label="کاهش تعداد"
            onClick={() => setCounter((prev) => prev - 1)}
            disabled={counter <= 1}
            className="tr-200 hover:text-white hover:bg-main_brown"
          >
            -
          </button>
          <span>{counter}</span>
          <button
            aria-label="افزایش تعداد"
            disabled={counter >= product?.entities}
            onClick={() => setCounter((prev) => prev + 1)}
            className="tr-200 hover:text-white hover:bg-main_brown"
          >
            +
          </button>
        </div>
        <MainBtn
          disabled={product?.entities === 0}
          className={`${
            product?.entities == 0 && "bg-red-400 hover:bg-red-400"
          }`}
          onClick={() => addToCartHandler()}
          size="small"
        >
          {isLoading ? (
            <Loader loadingCondition={isLoading} />
          ) : product?.entities == 0 ? (
            "ناموجود"
          ) : (
            "افزودن به سبد خرید"
          )}
        </MainBtn>
      </div>
    </>
  );
};

export default AddToBasket;
