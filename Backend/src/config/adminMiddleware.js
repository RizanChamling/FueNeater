const adminMiddleware = (req, res, next) => {
    // req.user is attached by authMiddleware
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
    next();
};

module.exports = adminMiddleware;
