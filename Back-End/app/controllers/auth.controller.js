// back-end/app/controllers/auth.controller.js
const NhanVien = require('../models/NhanVien.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
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

exports.login = async (req, res) => {
  try {
    const { HoTenNV, Password } = req.body;
    const nv = await NhanVien.findOne({ HoTenNV });
    if (!nv) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    const valid = await bcrypt.compare(Password, nv.Password);
    if (!valid) return res.status(401).json({ message: "Sai mật khẩu" });
    const token = jwt.sign({ id: nv._id, ChucVu: nv.ChucVu }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
