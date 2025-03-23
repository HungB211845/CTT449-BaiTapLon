// back-end/app/controllers/thongke.controller.js
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach.model');

exports.thongKe = async (req, res) => {
  try {
    // Thống kê sách mượn nhiều
    const sachStats = await TheoDoiMuonSach.aggregate([
      { $group: { _id: "$MaSach", soLanMuon: { $sum: 1 } } },
      { $sort: { soLanMuon: -1 } },
      { $limit: 5 }
    ]);
    // Thống kê độc giả mượn nhiều
    const docGiaStats = await TheoDoiMuonSach.aggregate([
      { $group: { _id: "$MaDocGia", soLanMuon: { $sum: 1 } } },
      { $sort: { soLanMuon: -1 } },
      { $limit: 5 }
    ]);
    res.json({
      sachMuonNhieu: sachStats,
      docGiaTichCuc: docGiaStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
