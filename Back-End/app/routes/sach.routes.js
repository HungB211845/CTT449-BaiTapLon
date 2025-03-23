// back-end/app/routes/sach.routes.js
const router = require('express').Router();
const sachController = require('../controllers/sach.controller');
// Middleware xác thực nếu cần
router.get('/', sachController.getAll);
router.post('/', sachController.create);
router.put('/:id', sachController.update);

module.exports = router;
