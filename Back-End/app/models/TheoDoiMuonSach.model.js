// back-end/app/models/TheoDoiMuonSach.model.js
const mongoose = require('mongoose');

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true },
  MaSach: { type: String, required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date }
}, { collection: 'theoDoiMuonSach' });

// Tạo compound index cho MaDocGia và MaSach
TheoDoiMuonSachSchema.index({ MaDocGia: 1, MaSach: 1 });

module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema);
