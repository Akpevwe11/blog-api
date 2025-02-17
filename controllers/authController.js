import jsonwebtoken from 'jsonwebtoken';
import db from '../db.js';
import User from '../models/user.js';



const register  = async (req, res) => {

    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findByEmail(email);
        

        if (existingUser.lenth > 0) {
            return res.status(409).json({ message: 'User already exists' });
        } 

        // Hash password 

        const hashedPassword = await bcrypt.hash(password, 8);


        // Create the user 
        const userId = await User.create({ username, email, password: hashedPassword, role });

        const token = jsonwebtoken.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ user: user[0], token });

    } catch (err) {
        res.status(500).json({ message: 'An error occurred' });
    }


}


const login  = async (req, res) => {

    try {

        const {email, password} = req.body;
        
        // Check our user table to see if the email exists 

        const [users] = await User.findByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = users[0];

        // Check if the password is correct 

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token 

        const token = jsonwebtoken.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({user: {id: user.id, username: user.username, email: user.email, role: user.role}, token});

    } catch (err){

        res.status(500).json({ message: 'An error occurred' });

    } 

}






module.exports = { register, login};