const productModel = require('../models/product.model');



async function createProduct(req, res) {
    const {image, title , description , category , price : {amount , currency}} = req.body;

    try {

        const product = await productModel.create({
            image , title , description , category , price : {amount , currency}
        })

        return res.status(201).send({
            message : "Product created successfully",
            CreatedProduct : product
        })
    } catch (err){
        return res.status(500).send({
            message : "Error creating product",
            error : err.message
        });
    }
}

async function getItem(req,res){
    try{
        const product  = await productModel.find()

        if (!product) {
            return res.status(200).send({
                message: "Product fetched successfully",
                product: {
                    price: {
                        amount: 5999,
                        currency: "INR",
                    },
                    _id: "694c3f3658981ad115603a4d",
                    image: "https://cellbell.in/cdn/shop/files/B0CRVNPS3Y.MAIN.png?v=1741583905&width=713",
                    title: "chair",
                    description: "a very good ergomonic chair",
                    category: "furniture",
                    __v: 0,
                },
            });
        }

        return res.status(200).send({
            message : "Product fetched successfully",
            product
        })  
    } catch(err){
        return res.status(500).send({
            message : "Error fetching product",
            error: err.message,
        })
    }
} 

module.exports = { createProduct  , getItem };