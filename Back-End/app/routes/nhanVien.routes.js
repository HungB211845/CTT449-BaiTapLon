// back-end/app/routes/nhanVien.routes.js
const router = require('express').Router();
const nhanvienController = require('../controllers/nhanvien.controller');
// Middleware xác thực (ví dụ: verifyToken, isAdmin) có thể được thêm vào
router.get('/', nhanvienController.getAll);
router.post('/', nhanvienController.create);
router.put('/:msnv', nhanvienController.update);
router.delete('/:msnv', nhanvienController.delete);

module.exports = router;
