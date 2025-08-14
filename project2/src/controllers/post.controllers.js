const postModel = require('../model/post.model')
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');

async function createPostController(req,res) {
    const file = req.file;
    console.log("file received heyyyyyyyyyy", file);
    

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64ImageFile);

    const result = await uploadFile(file.buffer,file.originalname)

    console.log("Generated Caption : --  ", caption);

    const post  = await postModel.create({
        image:result.url,
        caption:caption,
        user: req.user._id
    })
    
    res.status(201).json({
        message: "Post created successfully",
        post
    })

}


module.exports = {
    createPostController
}