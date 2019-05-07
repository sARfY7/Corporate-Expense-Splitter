module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).render("login", {
      employee: "",
      error: true,
      error_msg: "Session Expired. Login Again!",
      error_field: "general"
    });
  }
  next();
};
