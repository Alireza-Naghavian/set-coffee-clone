import OfferForm from "@/components/layout-components/AdminPanel/subRoutes/Offers/OfferForm";
import HeaderAdminLayout from "@/components/layout-components/AdminPanel/subRoutes/Products/HeaderAdminLayout";
import React from "react";

function page() {
  return (
    <HeaderAdminLayout title="ایجاد کد تخفیف">
      <OfferForm />
    </HeaderAdminLayout>
  );
}

export default page;
