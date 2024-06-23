import { useEffect, useState } from "react";

const useNavBarSticker = (scrollNumber: number) => {
  const [fixTop, setFixTop] = useState<boolean>(false);
  useEffect(() => {
    const fixOnTopHandler = () => {
      const currentScroll = window.scrollY ;

      if (currentScroll > scrollNumber) {

          setFixTop(true);
          }
      else {
       setFixTop(false)
      }
    };

    window.addEventListener("scroll", fixOnTopHandler);
    return () => window.removeEventListener("scroll", fixOnTopHandler);
  }, [fixTop,scrollNumber]);
  return { fixTop };
};
export default useNavBarSticker;
