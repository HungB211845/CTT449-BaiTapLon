// back-end/app/controllers/docgia.controller.js
const DocGia = require('../models/DocGia.model');

exports.getAll = async (req, res) => {
  try {
    const { ten, sdt } = req.query;
    let query = {};
    if (ten) {
      query.$or = [
        { HoLot: { $regex: ten, $options: "i" } },
        { Ten: { $regex: ten, $options: "i" } }
      ];
    }
    if (sdt) {
      query.DienThoai = { $regex: sdt, $options: "i" };
    }
    const list = await DocGia.find(query);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = req.body;
    const newDocGia = new DocGia({ MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai });
    await newDocGia.save();
    res.status(201).json({ message: "Độc giả được tạo thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
