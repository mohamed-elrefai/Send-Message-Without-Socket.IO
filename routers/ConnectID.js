const router = require('express').Router(),
      connectId = require('../models/ConnectMessagesID');

router.post('/connectionID', async (req,res)=>{
    try{
        const connectionID = new connectId({
            members: [req.body.senderId, req.body.receiverId ],
        });
        const newConnection = await connectionID.save();
        res.status(200).json(newConnection);
    }catch(err){
        res.status(400).json(err);
    }
})

router.get('/connectionID/:userId', async (req,res)=>{
    try{
        const conversation = await connectId.find({
            members: {$in:[req.params.userId]},
        })
        res.status(200).json(conversation);
    }catch(err){
        res.status(400).json(err);
    }
})
module.exports = router;