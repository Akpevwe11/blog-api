import db from './config/db.js';
import bcrypt from 'bcrypt';


class User {

    static async create({username, email, password, role}) {
        const hashedPassword = await bcrypt.hash(password, 8);
        const [result] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );

        return result[0].id;
        
    }

    static async findByEmail(email) {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return users[0];
    }
}

export default User;