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

exports.dashboard = async (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');

  try {
    const infoResult = await pool.query('SELECT * FROM ministry_info ORDER BY id DESC LIMIT 1');
    const info = infoResult.rows[0];

    console.log('info:', info);
    res.render('admin/dashboard', { info });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
