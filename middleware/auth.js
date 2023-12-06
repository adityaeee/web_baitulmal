const authentication = (roleAccess) => {
  return async (req, res, next) => {
    try {
      const user = req.session.user;

      if (roleAccess.includes(user.role)) {
        return next();
      }
      throw Error("Access Denied");
    } catch (error) {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};

module.exports = authentication;
