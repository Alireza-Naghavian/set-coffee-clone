import React from "react";
import HeaderAdminLayout from "../Products/HeaderAdminLayout";
import BlogsTable from "./BlogsTable";

function BlogsManagement() {
  return (
    <HeaderAdminLayout title="مدیریت مقالات">
      <BlogsTable />
    </HeaderAdminLayout>
  );
}

export default BlogsManagement;
