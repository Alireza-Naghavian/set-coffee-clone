import { SetState } from "@/types/global.type";
import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./RateStart.module.css";

type RateStarType = {
  score: number;
  setScore: SetState<number>;
};

function RateStar({ score, setScore }: RateStarType) {
  return (
    <div className={styles.rate}>
      <span>امتیاز شما :</span>
      <div
        className={styles.stars}
      >
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              className={` ${index <= score ? styles.on : styles.off}`}
              key={index}
              onClick={() => setScore(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RateStar;
