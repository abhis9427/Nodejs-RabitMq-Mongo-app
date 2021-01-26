const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



router.get('/getRecord',async (req,res)=>{
    try{
        //console.log("Getting")
        const post = await Post.find();
        res.json(post);
        //const post = await Post.findById(req.params.id);
        //res.json(post)
    }catch(err){
        res.json({message: err});
    }
});
router.post('/setRecord', async (req,res)=>{
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
    });
    try {
        
        const data = await post.save();
        let result = data.toJSON();
        id = result._id;
        //console.log(id);
        ///////
        var amqp = require('amqplib/callback_api')

        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                var queue = 'bootcamp';
                var msg = JSON.stringify(result._id);

                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(msg));

                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function () {
                connection.close();
                process.exit(0);
            }, 7200000);
        });
        //////
        //res.json(data);
        res.send(result._id);
        //console.log(result._id)
    }
    catch(err ) {
        console.log("Got error")
        res.json({message: err});
    }
});
router.get('/getRecord/:postId', async (req,res) => {
    console.log(req.params.postId)
    const post = await Post.findById(req.params.postId);
    res.json(post)
});

module.exports = router;