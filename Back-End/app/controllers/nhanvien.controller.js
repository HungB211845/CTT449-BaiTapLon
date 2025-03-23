// back-end/app/controllers/nhanvien.controller.js
const NhanVien = require('../models/NhanVien.model');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
  try {
    const list = await NhanVien.find({});
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { MSNV, HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newNV = new NhanVien({ MSNV, HoTenNV, Password: hashedPassword, ChucVu, DiaChi, SoDienThoai });
    await newNV.save();
    res.status(201).json({ message: "Nhân viên được tạo thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { msnv } = req.params;
    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(req.body.Password, 10);
    }
    const updated = await NhanVien.findOneAndUpdate({ MSNV: msnv }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json({ message: "Cập nhật thành công", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { msnv } = req.params;
    const removed = await NhanVien.findOneAndDelete({ MSNV: msnv });
    if (!removed) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json({ message: "Xoá nhân viên thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
