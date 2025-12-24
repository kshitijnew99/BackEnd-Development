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

module.exports = { createProduct };