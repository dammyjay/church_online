const pool = require('../models/db');

exports.showArticles = async (req, res) => {
  const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
  res.render('admin/articles', { articles: result.rows });
};

exports.saveArticle = async (req, res) => {
  const { title, content } = req.body;
  const image_url = req.file ? req.file.path : null;

  await pool.query(
    'INSERT INTO articles (title, content, image_url) VALUES ($1, $2, $3)',
    [title, content, image_url]
  );

  res.redirect('/admin/articles');
};

exports.showEditForm = async (req, res) => {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Article not found');
    }
    res.render('admin/editArticle', { article: result.rows[0] });
  };
  
  exports.updateArticle = async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const image_url = req.file ? req.file.path : null;
  
    if (image_url) {
      // Update all fields including image_url
      await pool.query(
        'UPDATE articles SET title = $1, content = $2, image_url = $3 WHERE id = $4',
        [title, content, image_url, id]
      );
    } else {
      // Update title and content only
      await pool.query(
        'UPDATE articles SET title = $1, content = $2 WHERE id = $3',
        [title, content, id]
      );
    }
  
    res.redirect('/admin/articles');
  };
  
  exports.deleteArticle = async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM articles WHERE id = $1', [id]);
    res.redirect('/admin/articles');
  };
  