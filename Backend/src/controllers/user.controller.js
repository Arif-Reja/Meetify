import httpStatus from "http-status";
import { User } from "../../models/users.model.js";
import { Meeting } from "../../models/meeting.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";




const login = async (req, res) => {
    try {

        const { username, password } = req.body;

    
        if (!username || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Please provide username and password"
            });
        }

       
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }

   
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        
        const token = crypto.randomBytes(32).toString("hex");

        user.token = token;

        await user.save();

     
        return res.status(httpStatus.OK).json({
            success: true,
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                username: user.username
            }
        });

    } catch (e) {

        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        });

    }
};



const register = async (req, res) => {

    try {

        const { name, username, password } = req.body;

      
        if (!name || !username || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }

      
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                success: false,
                message: "User already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(httpStatus.CREATED).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (e) {

        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        });

    }
};



const getUserHistory = async (req, res) => {

    try {

        const { token } = req.query;

        if (!token) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Token is required"
            });
        }

     
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token"
            });
        }

   
        const meetings = await Meeting.find({
            user_id: user.username
        });

        return res.status(httpStatus.OK).json({
            success: true,
            meetings
        });

    } catch (e) {

        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        });

    }
};



const addToHistory = async (req, res) => {

    try {

        const { token, meeting_code } = req.body;

        if (!token || !meeting_code) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Token and meeting code are required"
            });
        }

       
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token"
            });
        }

        
        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();

        return res.status(httpStatus.CREATED).json({
            success: true,
            message: "Meeting added to history"
        });

    } catch (e) {

        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        });

    }
};

export {
    login,
    register,
    getUserHistory,
    addToHistory
};