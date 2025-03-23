// back-end/app/controllers/sach.controller.js
const Sach = require('../models/Sach.model');
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach.model');
const mongoose = require('mongoose'); // Ensure mongoose is imported

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
    const { MaSach } = req.params; // Changed from maSach to MaSach
    const updated = await Sach.findOneAndUpdate({ MaSach }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json({ message: "Cập nhật sách thành công", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rename from 'deleteBook' to 'delete' to match route definition
exports.delete = async (req, res) => {
  try {
    const connectionState = mongoose.connection.readyState;
    console.log(`🔌 MongoDB connection state: ${connectionState}`);
    if (connectionState !== 1) {
      return res.status(500).json({ message: "Không thể kết nối đến cơ sở dữ liệu" });
    }

    const { MaSach } = req.params; // Changed from maSach to MaSach
    if (!MaSach || MaSach.trim() === '') {
      return res.status(400).json({ message: "Mã sách không hợp lệ" });
    }

    const trimmedMaSach = MaSach.trim();
    const book = await Sach.findOne({ MaSach: trimmedMaSach });
    if (!book) {
      return res.status(404).json({ message: `Không tìm thấy sách với mã "${trimmedMaSach}"` });
    }

    const borrowedBooks = await TheoDoiMuonSach.find({ MaSach: trimmedMaSach, NgayTra: { $exists: false } });
    if (borrowedBooks.length > 0) {
      return res.status(400).json({ message: "Không thể xóa sách đang được mượn" });
    }

    const deleted = await Sach.findOneAndDelete({ MaSach: trimmedMaSach });
    if (!deleted) {
      return res.status(500).json({ message: "Không thể xoá sách" });
    }

    return res.json({ message: "Xoá sách thành công", deletedBook: { MaSach: deleted.MaSach, TenSach: deleted.TenSach } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Keep the existing deleteBook method for backward compatibility
exports.deleteBook = exports.delete;

// Simplified deleteBook function for learning purposes
exports.deleteBookSimple = async (req, res) => {
  try {
    return res.status(500).json({ message: err.message });params
    console.log("Xoá sách với MaSach =", maSach);
    console.log("Xoá sách với MaSach =", maSach);
    return res.status(500).json({ message: err.message });
    const deleted = await Sach.findOneAndDelete({ MaSach: maSach });
    if (!deleted) {
      console.log(`Không tìm thấy sách với MaSach "${maSach}"`);
      return res.status(404).json({ message: `Không tìm thấy sách với mã "${maSach}" trong cơ sở dữ liệu. Vui lòng thử lại.` });
    }

    console.log("Đã xoá sách thành công:", deleted);
    return res.json({ message: "Xoá sách thành công" });
  } catch (err) {
    console.error("Lỗi khi xoá sách:", err);
    return res.status(500).json({ message: err.message });
  }
};
// Note: Your existing implementation (exports.delete) already has this functionality// plus additional debugging and error handling features. This simplified version// is provided for learning purposes.// back-end/app/routes/sach.routes.jsconst express = require('express');const router = express.Router();const sachController = require('../controllers/sach.controller');router.get('/', sachController.getAll);router.post('/', sachController.create);router.put('/:maSach', sachController.update); // Changed from id to maSachrouter.delete('/:maSach', sachController.delete); // Changed from id to maSachmodule.exports = router;// Note: Your existing implementation (exports.delete) already has this functionality// plus additional debugging and error handling features. This simplified version// is provided for learning purposes.// back-end/app/routes/sach.routes.jsconst express = require('express');const router = express.Router();const sachController = require('../controllers/sach.controller');router.get('/', sachController.getAll);router.post('/', sachController.create);router.put('/:maSach', sachController.update); // Changed from id to maSachrouter.delete('/:maSach', sachController.delete); // Changed from id to maSachmodule.exports = router;