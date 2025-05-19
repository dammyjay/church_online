const pool = require('../models/db');

exports.showVideos = async (req, res) => {
    const result = await pool.query('SELECT * FROM videos4 ORDER BY created_at3 DESC');
  res.render('admin/videos', { videos: result.rows });
};

exports.saveVideo = async (req, res) => {
  const { title, youtube_url, description } = req.body;
  const created_at3 = new Date(); // Create timestamp in JS
  // await pool.query('INSERT INTO videos4 (title, youtube_url, description) VALUES ($1, $2, $3)', [title, youtube_url, description]);
  await pool.query('INSERT INTO videos4 (title, youtube_url, description, created_at3) VALUES ($1, $2, $3, $4)', [title, youtube_url, description, created_at3]);
  res.redirect('/admin/videos');
};

exports.showEditForm = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM videos4 WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).send('Video not found');
  res.render('admin/editVideo', { video: result.rows[0] });
};

exports.updateVideo = async (req, res) => {
  const id = req.params.id;
  const { title, youtube_url } = req.body;
  await pool.query('UPDATE videos4 SET title = $1, youtube_url = $2 WHERE id = $3', [title, youtube_url, id]);
  res.redirect('/admin/videos');
};

exports.deleteVideo = async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM videos4 WHERE id = $1', [id]);
  res.redirect('/admin/videos');
};


