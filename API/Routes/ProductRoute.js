// router configuration
const router = require("express").Router()
const Products = require("../Models/Products")
const Users = require("../Models/Users")

// Create new product method: POST method description: creates new product in database 
    router.post("/", async (req, res) => {
        const newProduct = new Products(req.body)
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    })

// Update product Method: PUT method Description: updates the plant
    router.put("/:id", async (req, res) => {
        try {
            const updatedPlant = await Products.findByIdAndUpdate(req.params.id, {
                $set: req.body},
                {new: true}
            );
            res.status(200).json(updatedPlant)
        } catch (err) {
            res.status(500).json(err)
        }
    })

// Delete product Method: Delete method Description: Deletes the plant from database

    router.delete("/:id", async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.status(200).json("Product has been sucesfully deleted from database")
        } catch (err) {
            res.status(500).json(err)
        }
    })

// Single Plant Method: GET method Description: Get plant accodring to the id


    router.get("/:id", async(req, res) => {
        const product = await Products.findById(req.params.id)
        try {
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
            console.log(err);
        }
    })

    router.get("/category/:id", async(req, res) => {
        const product = await Products.findById(req.params.id)
        const plantCategory = await Products.find({category : product.category })
        // console.log(plantCategory);

        try {
            res.status(200).json(plantCategory)
        } catch (err) {
            res.status(500).json(err)
            
        }
    })

//All Plants Description: Show all products in database Method: GET method

    router.get("/", async(req, res) => {
        try {
            const product = await Products.find()     
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    })

// Add or Update comment Method: POST method Description: Allows user to add or update the comment  
    
    router.post("/:id/reviews", async (req, res)  => {
        const {comment, name, user} = req.body
        const product = await Products.findById(req.params.id)
        try {
            if (product) {
                // const alreadyReviewed = product.reviews.find(
                //     (r) => r.user.toString() === req.user._id.toString()
                // )
                // if (alreadyReviewed) {
                //     res.status(400).json("Already reviewed")
                // }
    
                const review = {
                    comment: comment,
                    name: name,
                    user: user
                }
    
                product.reviews.push(review)
                await product.save()
                res.status(200).json(product)      
            }else{
                res.status(404).json("Product not found")
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err);
        }

    })

// exporting router module
module.exports = router