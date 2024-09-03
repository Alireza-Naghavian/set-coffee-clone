"use client";
import { CartType } from "@/types/models/cart.type";
import React, { useState } from "react";
import SaleChart from "../../SaleChart";
import GrowthChart from "../../GrowthChart";
import TabSelection from "@/components/UI/TabSelection/TabSelection";
import { adminCharts } from "@/utils/constants";
import { GrowthDataType } from "@/types/auth.type";

function FirstPageLayout({ allOrders,growthData }: { allOrders: CartType[],growthData:GrowthDataType }) {
  const [activeTab, setActiveTab] = useState<string>("sales");

  return (
    <TabSelection
      activeTab={activeTab}
      options={adminCharts}
      setActiveTab={setActiveTab}
      wrapperClassName="!bg-transparent "
      btnClassName={`!bg-transparent !tr-300 px-2 py-1 !rounded-md shadow-md`}
    >
      {activeTab === "sales" ? (
        <SaleChart allOrders={allOrders} />
      ) : (
        <GrowthChart growthData={growthData} />
      )}
    </TabSelection>
  );
}

export default FirstPageLayout;
