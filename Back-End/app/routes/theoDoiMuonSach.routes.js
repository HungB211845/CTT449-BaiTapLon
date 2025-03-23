// back-end/app/routes/theoDoiMuonSach.routes.js
const router = require('express').Router();
const muonController = require('../controllers/muonsach.controller');
// Middleware xác thực nếu cần
router.post('/muon-sach', muonController.muonSach);
router.put('/tra-sach/:id', muonController.traSach);

module.exports = router;
