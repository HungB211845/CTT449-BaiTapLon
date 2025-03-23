// back-end/app/models/DocGia.model.js
const mongoose = require('mongoose');

const DocGiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true, unique: true },
  HoLot: { type: String, required: true },
  Ten: { type: String, required: true },
  NgaySinh: { type: Date },
  Phai: { type: String, enum: ["Nam", "Nữ"] },
  DiaChi: { type: String },
  DienThoai: { type: String, required: true }
}, { collection: 'docGia' });

module.exports = mongoose.model('DocGia', DocGiaSchema);
