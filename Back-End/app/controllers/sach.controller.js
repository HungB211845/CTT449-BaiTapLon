// back-end/app/controllers/sach.controller.js
const Sach = require('../models/Sach.model');

exports.getAll = async (req, res) => {
  try {
    const { tenSach, tenNXB } = req.query;
    let query = {};
    if (tenSach) {
      query.TenSach = { $regex: tenSach, $options: 'i' };
    }
    if (tenNXB) {
      // Ở đây giả sử client gửi mã NXB; nếu cần, bạn có thể mở rộng logic tìm kiếm theo tên NXB
      query.MaNXB = tenNXB;
    }
    const list = await Sach.find(query);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = req.body;
    const newSach = new Sach({ MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia });
    await newSach.save();
    res.status(201).json({ message: "Thêm sách thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params; // id = MaSach
    const updated = await Sach.findOneAndUpdate({ MaSach: id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json({ message: "Cập nhật sách thành công", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
