const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const ministryController = require('../controllers/ministryController');
const articleController = require('../controllers/articleController');

const upload = require('../middlewares/upload');

router.get('/login', adminController.showLogin);
router.post('/login', adminController.login);
router.get('/dashboard', adminController.dashboard);
router.get('/logout', adminController.logout);



// Admin dashboard
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

// Ministry Info routes
router.get('/ministry', ministryController.showForm);
// POST form with file upload
router.post('/ministry', upload.single('logo'), ministryController.saveInfo);

router.get('/articles', articleController.showArticles);
router.post('/articles', upload.single('image'), articleController.saveArticle);

router.get('/articles/edit/:id', articleController.showEditForm);
router.post('/articles/edit/:id', upload.single('image'), articleController.updateArticle);
router.post('/articles/delete/:id', articleController.deleteArticle);



module.exports = router;
