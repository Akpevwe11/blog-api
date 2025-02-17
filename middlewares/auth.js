import jsonwebtoken from 'jsonwebtoken';


const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        // Check if the user exists
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default auth;
