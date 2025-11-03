import mongoose, { Schema, Document } from "mongoose";

export interface INhanVien extends Document {
  ten: string;
  tuoi: number;
  chucvu: string;
  luong: number;
  diachi: string;
}

const nhanVienSchema = new Schema<INhanVien>(
  {
    ten: { type: String, required: true },
    tuoi: { type: Number, required: true },
    chucvu: { type: String, required: true },
    luong: { type: Number, required: true },
    diachi: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INhanVien>("NhanVien", nhanVienSchema);
