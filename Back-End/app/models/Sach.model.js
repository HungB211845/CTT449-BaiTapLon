// back-end/app/models/Sach.model.js
const mongoose = require('mongoose');

const SachSchema = new mongoose.Schema({
  MaSach: { type: String, required: true, unique: true },
  TenSach: { type: String, required: true },
  DonGia: { type: Number },      // Sử dụng Number (với MongoDB, double sẽ được lưu dưới dạng Number)
  SoQuyen: { type: Number },
  NamXuatBan: { type: Number },
  MaNXB: { type: String, required: true },  // tham chiếu đến nhaXuatBan
  TacGia: { type: String }        // hoặc NguonGoc
}, { collection: 'sach' });

module.exports = mongoose.model('Sach', SachSchema);
