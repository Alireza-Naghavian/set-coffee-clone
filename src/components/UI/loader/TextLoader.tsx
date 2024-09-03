import React from "react";
import Loader from "./Loader";

function TextLoader({ loadingCondition }: { loadingCondition: boolean }) {
  return (
    <div className="flex items-center gap-x-2 mt-4">
      <span>
        <Loader loadingCondition={loadingCondition} />
      </span>
      <span>درحال بارگزاری...</span>
    </div>
  );
}

export default TextLoader;
