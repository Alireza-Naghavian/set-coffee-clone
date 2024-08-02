import { DepartmentType } from "@/types/models/ticket.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<DepartmentType>({
  title: { type: String, required: true },
});
const DeptModel =
  mongoose.models.department || mongoose.model("department", schema);
export default DeptModel;
