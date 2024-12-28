import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcyrpt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User Doesn't exits"})
        }

        const isMatch = await bcyrpt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


// create token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register
const registerUser = async (req, res) =>{
    const {name, password, email} = req.body
    try {
        // checking if users already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        // if password is less than 8 characters
        if (password.length<8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcyrpt.genSalt(10)
        const hashedPassword = await bcyrpt.hash(password, salt);

        // new user hurray🎉
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,

        })

        // save user in the database
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:"Error"})
    }

}

export {loginUser, registerUser}