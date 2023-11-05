module.exports = (err, req, res, next) => {
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
