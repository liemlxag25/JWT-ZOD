import NhanVien, { INhanVien } from "../models/nhanvien.model";

export const getAllNhanVien = async (): Promise<INhanVien[]> => {
  return await NhanVien.find().sort({ createdAt: -1 });
};

export const getNhanVienById = async (id: string): Promise<INhanVien | null> => {
  return await NhanVien.findById(id);
};

export const createNhanVien = async (data: Partial<INhanVien>): Promise<INhanVien> => {
  const nhanvien = new NhanVien(data);
  return await nhanvien.save();
};

export const updateNhanVien = async (id: string, data: Partial<INhanVien>): Promise<INhanVien | null> => {
  return await NhanVien.findByIdAndUpdate(id, data, { new: true });
};

export const deleteNhanVien = async (id: string): Promise<void> => {
  await NhanVien.findByIdAndDelete(id);
};
