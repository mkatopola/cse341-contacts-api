// This file is responsible for handling errors in the application.
module.exports = (err, req, res) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
};
