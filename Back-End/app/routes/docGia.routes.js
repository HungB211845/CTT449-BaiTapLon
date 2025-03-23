// back-end/app/routes/docGia.routes.js
const router = require('express').Router();
const docgiaController = require('../controllers/docgia.controller');
// Bạn có thể thêm middleware xác thực nếu cần
router.get('/', docgiaController.getAll);
router.post('/', docgiaController.create);

module.exports = router;
