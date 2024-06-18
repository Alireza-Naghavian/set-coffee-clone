import { useEffect } from "react";

const useScrollLocker = (lockerCondition: boolean) => {
  useEffect(() => {
    if (lockerCondition) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lockerCondition]);
};
export default useScrollLocker;
