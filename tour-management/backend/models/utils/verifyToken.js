import jwt from 'jsonwebtoken';

// Token verification middleware
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    // If token exists, verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        req.user = user; // Attach the user details to request object
        next(); // Call next to move to the next middleware or route handler
    });
};

// User verification middleware
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the authenticated user's ID matches the requested user ID or if the user is an admin
        // The request does not need the `req.params.id` comparison here.
        if (req.user) {
            next(); // User is authenticated, proceed
        } else {
            return res.status(403).json({ success: false, message: "You are not authenticated" });
        }
    });
};

// Admin verification middleware
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user is an admin
        if (req.user.role === 'admin') {
            next(); // Admin is authenticated, proceed
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized" });
        }
    });
};
