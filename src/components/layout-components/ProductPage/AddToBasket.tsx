import MainBtn from '@/components/UI/Buttons/MainBtn';
import React from 'react'

const AddToBasket = () => {
    return (
      <>
        <div className="flex gap-x-3 items-center">
          <div className="flex gap-x-0 items-center child:text-base child:py-2 child:px-3 child:font-bold child:border">
            <button className="tr-200 hover:text-white hover:bg-main_brown">
              -
            </button>
            <span>1</span>
            <button className="tr-200 hover:text-white hover:bg-main_brown">
              +
            </button>
          </div>
          <MainBtn size="small">افزودن به سبد خرید</MainBtn>
        </div>
      </>
    );
  };

export default AddToBasket