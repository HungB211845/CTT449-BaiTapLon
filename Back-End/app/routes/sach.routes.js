const router = require('express').Router();
const sachController = require('../controllers/sach.controller');

// Debug middleware to log route access
const routeLogger = (req, res, next) => {
  console.log(`🛣️ Route accessed: [${req.method}] ${req.originalUrl}`);
  console.log(`  - Parameters: ${JSON.stringify(req.params)}`);
  console.log(`  - Query: ${JSON.stringify(req.query)}`);
  next();
};

// Apply route logger to all routes
router.use(routeLogger);

// Define routes
router.get('/', sachController.getAll); // GET all books
router.post('/', sachController.create); // POST to create a book
router.put('/:MaSach', sachController.update); // PUT to update a book by MaSach
router.delete('/:MaSach', sachController.delete); // DELETE to delete a book by MaSach

// Optional: Simplified DELETE route for testing
router.delete('/simple/:MaSach', sachController.deleteBookSimple); 

// Log all registered routes for debugging
console.log('📚 Book routes registered:');
console.log('  - [GET] /api/sach');
console.log('  - [POST] /api/sach');
console.log('  - [PUT] /api/sach/:MaSach');
console.log('  - [DELETE] /api/sach/:MaSach');

module.exports = router;
