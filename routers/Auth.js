const router = require('express').Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/User'),
      JWT = require('jsonwebtoken');

// Create Cookie with JWT
const maxAge = 3 * 24 * 60 * 6;
const CreateCookieJWT = (id)=>{
    return JWT.sign({id}, 'net A7A', {expiresIn: maxAge});
}
//Register
router.post('/signin', async (req, res) =>{
    const { username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.userPhone, salt);
    const userPhone = hashPassword;
    try{
        const newUser = await new User({username, userPhone});
        const user = await newUser.save();
        
        // Cookie
        const tokenJWT = CreateCookieJWT(user._id);
        res.cookie('__set', tokenJWT, {httpOnly: true, secure:true}, {expiresIn: maxAge * 1000});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

// Login
router.post('/login', async (req, res)=>{
    try{
        const userNameLogin = await User.findOne({ username: req.body.username })
        const userPhoneLogin = await bcrypt.compare(req.body.userPhone, userNameLogin.userPhone);
        if(!userPhoneLogin){
            console.log("err")
        }
            res.status(200).json(userNameLogin.username);
    }catch(err){
        res.status(400).send(err)
    }
    
})

module.exports = router;