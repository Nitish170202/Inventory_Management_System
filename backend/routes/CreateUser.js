const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const jwtSecret = "MynameisNitishKumarYadavfrompctebtech20";

router.get('/signup', async (req, res) => {
    res.send("hello");
})
router.post('/signup', [body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password', 'Incorrect Password').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    // return res.status(402).json({error:"show"})
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("Please enter all the details")
        return res.json({success:false , error: "Please enter all the details"});
        // return res.status(422).json({ error: "Please enter all the details" });
    }
    try {
        const UserExist = await User.findOne({ email: email });
        if (UserExist) {
            console.log("already exists" )
            return res.json({success:false , error: "already exists" });
            // return res.status(422).json({ error: "already exists" });
        }
        else {
            const user = new User({ name, email, password });

            await user.save();
            console.log("Successfully registered" )
            return res.json({success:true , message: "Successfully registered" });
            
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        

        if (!email || !password) {
            return res.json({success:false , error: "Please enter email and password" });
        }
        const userLogin = await User.findOne({ email: email });


        const data = {
            user:{
                id : userLogin.id
            }
        }

        const authToken = jwt.sign(data , jwtSecret)
        console.log(authToken);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const data = {
            user:{
                id : userLogin.id
            }
        }

        const authToken = jwt.sign(data , jwtSecret)
        // return res.json({success:true , message : authToken })
        console.log(authToken);

            if (!isMatch) {
                return res.json({ success:false ,err: "Login with correct credentials",authToken : authToken });

            }
            else {
                const authToken = jwt.sign(data , jwtSecret)
                // return res.json({success:true , message : authToken })
                return res.json({success:true , message: "User signin sucessfully",authToken:authToken, username:userLogin.name });
            }
        }
        else {
            return res.json({ err: "User error pass" });
        }
    } catch (err) {
        console.log(err);
        res.json({success:false})
    }
})

module.exports = router;

