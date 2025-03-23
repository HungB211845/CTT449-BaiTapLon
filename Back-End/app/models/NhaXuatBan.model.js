// back-end/app/models/NhaXuatBan.model.js
const mongoose = require('mongoose');

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: { type: String, required: true, unique: true },
  TenNXB: { type: String, required: true },
  DiaChi: { type: String, required: true }
}, { collection: 'nhaXuatBan' });

module.exports = mongoose.model('NhaXuatBan', NhaXuatBanSchema);
