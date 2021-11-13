const router = require('express').Router(),
      Messages = require('../models/Messages');

//add messages
router.post('/messages', async (req, res)=>{
    const newmessges = await new Messages(req.body);
    try{
        const saveMessage = await newmessges.save();
        res.status(200).json(saveMessage);
    }catch(err){
        res.status(400).json(err);
    }
})
// Get messages
router.get('/messages/:conversationId', async (req, res)=>{
    try{
        const getMessages = await Messages.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(getMessages)
    }catch(err){
        res.status(400).json(err);
    }
})
module.exports = router;