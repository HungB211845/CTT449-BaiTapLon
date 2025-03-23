// back-end/app/models/NhanVien.model.js
const mongoose = require('mongoose');

const NhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true },
  HoTenNV: { type: String, required: true },
  Password: { type: String, required: true },
  ChucVu: { type: String, required: true, enum: ["admin", "thủ thư", "nhân viên"] },
  DiaChi: { type: String },
  SoDienThoai: { type: String }
}, { collection: 'nhanVien' });

module.exports = mongoose.model('NhanVien', NhanVienSchema);
