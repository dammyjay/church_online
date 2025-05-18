const pool = require('../models/db');

exports.showLogin = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

  if (result.rows.length > 0) {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Invalid credentials' });
  }
};

exports.dashboard = (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');
  res.render('admin/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
};
