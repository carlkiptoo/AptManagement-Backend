import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization denied'});
    }

    const token = authHeader.split(' ')[1];
    console.log('token received:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        req.user = decoded;
        next();
    } catch(error) {
        console.log('Error decoding token:', error.message);
        res.status(401).json({message: 'Invalid token'});
    }

}

export default verifyToken;