/*in this we put the code of the storage provider, and if 
someone give better price then we move to their service*/  

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.imagekit_publicKey,
    privateKey : process.env.imagekit_privateKey,
    urlEndpoint : process.env.imagekit_URL
});

function uploadFile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file:file.buffer,
            fileName:file.originalname,
            folder:"cohort-audio"
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    })
} 

module.exports = uploadFile;