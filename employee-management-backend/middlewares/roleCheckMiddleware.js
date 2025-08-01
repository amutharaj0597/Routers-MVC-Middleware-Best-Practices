// middlewares/roleCheckMiddleware.js

module.exports = function roleCheck(...allowedRoles) {
  return (req, res, next) => {
    const role = req.header('x-role');

    if (!role) {
      return res.status(401).json({ message: 'Role header missing' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    next();
  };
};
