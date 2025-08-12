const postModel = require('../model/post.model')
const generateCaption = require('../service/ai.service')

async function createPostController(req,res) {
    const file = req.file;
    console.log("file received heyyyyyyyyyy", file);
    

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64ImageFile);

    console.log("Generated Caption : --  ", caption);

    res.json({
        caption
    })
    

}


module.exports = {
    createPostController
}