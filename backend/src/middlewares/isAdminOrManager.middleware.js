const isAdminOrManager = (req, res, next) => {
  if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins and Managers only.",
    });
  }
  next();
};

export default isAdminOrManager;