// back-end/app/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');

const app = express();

// Middleware: parse JSON & hỗ trợ CORS
app.use(express.json());
app.use(cors());

// Kết nối đến MongoDB qua file cấu hình
connectDB();

// Import các route
const authRoutes = require('./routes/auth.routes');
const docGiaRoutes = require('./routes/docGia.routes');
const nhanVienRoutes = require('./routes/nhanVien.routes');
const sachRoutes = require('./routes/sach.routes');
const theoDoiMuonSachRoutes = require('./routes/theoDoiMuonSach.routes');
const thongkeRoutes = require('./routes/thongke.routes');

// Đăng ký các route
app.use('/api/auth', authRoutes);
app.use('/api/docgia', docGiaRoutes);
app.use('/api/nhanvien', nhanVienRoutes);
app.use('/api/sach', sachRoutes);
app.use('/api', theoDoiMuonSachRoutes);  // endpoints /muon-sach và /tra-sach
app.use('/api/thongke', thongkeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
