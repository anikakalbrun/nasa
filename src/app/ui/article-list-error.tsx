import React from "react";

import ErrorCommon, { TryAgainButton } from "@/app/ui/error-common";
import { anton } from "@/app/ui/fonts";

export default function ArticleListError() {
  return (
    <ErrorCommon>
      <>
        <h3
          className={`${anton.className} text-white text-xl md:text-3xl lg:text-7xl md:leading-normal mt-20 mb-5`}
        >
          Error 500
        </h3>
        <div className="text-xl text-white mb-5">
          Oops! We are experiencing some technical difficulties
        </div>
        <TryAgainButton/>
      </>
    </ErrorCommon>
  );
}
