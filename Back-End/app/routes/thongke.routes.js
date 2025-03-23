// back-end/app/routes/thongke.routes.js
const router = require('express').Router();
const thongkeController = require('../controllers/thongke.controller');
// Middleware xác thực nếu cần
router.get('/', thongkeController.thongKe);

module.exports = router;
