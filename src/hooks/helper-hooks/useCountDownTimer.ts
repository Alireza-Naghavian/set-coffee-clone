import { useCallback, useEffect, useState } from "react";

const useCountDownTimer = (initialMinutes: number, initialSeconds: number) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  const startCountDown = useCallback(() => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialMinutes, initialSeconds]);

  useEffect(() => {
    let countDownInterval: NodeJS.Timeout;

    if (isActive) {
      countDownInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSecond) => prevSecond - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(countDownInterval);
          setIsActive(false);
        }
      }, 1000);
    }
    return ()=> clearInterval(countDownInterval);
  }, [isActive,minutes,seconds]);
  return { minutes, seconds, isActive, startCountDown };
};
export default useCountDownTimer
