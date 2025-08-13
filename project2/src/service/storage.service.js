var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.publicKey,
    privateKey : process.env.privateKey,
    urlEndpoint : process.env.urlEndpoint
});


async function uploadFile(file,filename){
    const response = await imagekit.upload({
        file: file,
        filename: filename
    })

    return response
} 

module.exports = uploadFile