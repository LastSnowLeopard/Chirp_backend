const Product = require('../../models/product');
const { validationResult } = require('express-validator');

const addProduct = async (req, res, next) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        console.log(errors)
        return res.status(422).send(errors)
    }
    const { name, sku, image, price, quantity, featured, category_id, discount } = req.body;
    const newProduct = new Product({
        name,
        sku,
        image,
        price,
        quantity,
        featured,
        category_id,
        discount,
        vendor_id: req.vender._id
    })

    newProduct.save().then(product => {
        res.status(200).send(product)
        // res.status(200).send(product)
    }).catch(error => {
        if (error.code == 11000) {
            res.status(409).send(error)
        } else {
            res.status(500).send(error)
        }
    })
}
const getProducts = async (req, res, next) => {
    Product.find({ vender_id: req.vender._id }).populate("category_id").then(products => {
        res.status(200).send(products)
    }).catch(error => {
        res.status(422).send({ error, message: "products does not exist" })
    })
}
const getAllProducts = async (req, res, next) => {
    Product.find().populate("category_id").then(products => {
        res.status(200).send(products)
    }).catch(error => {
        res.status(422).send("products does not exist")
    })
}
const mutateProduct = async (req, res, next) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        console.log(errors)
        return res.status(422).send(errors)
    }
    const {
        name, sku, image, price, quantity, featured, category_id
    } = req.body;

    Product.findById(req.params._id).then(mutateProduct => {
        if (name)
            mutateProduct.name = name;
        if (sku)
            mutateProduct.sku = sku;
        if (image)
            mutateProduct.image = image;
        if (price)
            mutateProduct.price = price;
        if (quantity)
            mutateProduct.quantity = quantity;
        if (featured)
            mutateProduct.featured = featured;
        if (category_id)
            mutateProduct.category_id = category_id;
        mutateProduct.save().then(success => {
            res.status(200).send(success)
        })
    }).catch(err => {
        res.send("product does not exits")
    })
}
const approveProduct = async (req, res, next) => {

    Product.findById(req.params._id).then(mutateProduct => {

        mutateProduct.approved = true;
        mutateProduct.save().then(success => {
            res.status(200).send(success)
        })
    }).catch(err => {
        res.send("product does not exits")
    })
}
const deleteProduct = async (req, res, next) => {
    Product.findByIdAndDelete(req.params._id).then(success => {
        res.status(200).send("Product deleted")

    }).catch(err => {
        res.status(409).send(err)
    })
}

module.exports = { addProduct, getProducts, mutateProduct, deleteProduct, getAllProducts, approveProduct }