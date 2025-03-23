// back-end/app/controllers/muonsach.controller.js
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach.model');
const Sach = require('../models/Sach.model');

exports.muonSach = async (req, res) => {
  try {
    const { MaDocGia, MaSach, NgayMuon } = req.body;
    const sach = await Sach.findOne({ MaSach });
    if (!sach) return res.status(404).json({ message: "Không tìm thấy sách" });
    if (sach.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết, không thể mượn" });
    const record = new TheoDoiMuonSach({ MaDocGia, MaSach, NgayMuon: NgayMuon || new Date() });
    await record.save();
    // Giảm số lượng bản sách
    sach.SoQuyen = sach.SoQuyen - 1;
    await sach.save();
    res.status(201).json({ message: "Mượn sách thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.traSach = async (req, res) => {
  try {
    const { id } = req.params; // id của phiếu mượn
    const { NgayTra } = req.body;
    const record = await TheoDoiMuonSach.findById(id);
    if (!record) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });
    if (NgayTra) {
      if (new Date(NgayTra) < record.NgayMuon) {
        return res.status(400).json({ message: "Ngày trả không hợp lệ" });
      }
      record.NgayTra = NgayTra;
    } else {
      record.NgayTra = new Date();
    }
    await record.save();
    // Tăng số lượng sách
    const sach = await Sach.findOne({ MaSach: record.MaSach });
    if (sach) {
      sach.SoQuyen = sach.SoQuyen + 1;
      await sach.save();
    }
    res.json({ message: "Trả sách thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
