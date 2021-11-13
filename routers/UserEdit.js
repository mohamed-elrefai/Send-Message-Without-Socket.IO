const router = require('express').Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/User');

// get a user
router.get('/:id', async (req, res)=>{
    try{
        const userFind = await User.findById(req.params.id);
        const {...other} = userFind._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(400).json(err);
    }
})
// update user profile
router.put('/:id', async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.userPhone){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const userUpdate = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('Update is done');
        }catch(err){
            return res.status(500).json(err);
        }
    }
})
// DELETE USER ACCOUNT
router.delete('/:id', async (req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account is delete');
        }catch(err){
            return res.status(500).json(err);
        }
    }
})

module.exports = router;