import { SetState } from '@/types/global.type';
type CounterType = {
    counter:number,
    setCounter:SetState<number>
}
function ProductEntityCounter({counter,setCounter}:CounterType) {
  
    const decrementCounter = () => {
         setCounter(prev => prev-1);
       };
       const incrementCounter = () => {
         setCounter(prev=>prev+1);
       };
  return (
    <div className=" flex flex-col gap-y-1">
        <label className='font-Shabnam_B text-dark_shade'>تعداد</label>
  <div className="flex gap-x-0 justify-center sm:justify-start items-center 
  child:text-base md:child:py-2 
  child:py-[4px] child:px-3 md:child:px-3 child:font-bold  child:border">
  <button
      aria-label="کاهش تعداد"
      type='button'
      onClick={decrementCounter}
      disabled={counter <= 1}
      className="tr-200 hover:text-white w-[40%] sm:w-auto hover:bg-main_brown "
    >
      -
    </button>
    <span className='bg-main_brown text-white text-center sm:w-auto w-[20%]'>{counter}</span>
    <button
     type='button'
      aria-label="افزایش تعداد"
      onClick={incrementCounter}
      className="tr-200 hover:text-white w-[40%] sm:w-auto hover:bg-main_brown "
    >
      +
    </button>
  </div>
  </div>
  )
}

export default ProductEntityCounter