// router configuration
const router = require("express").Router()
const {verifyToken, verifyTokenAndAuth} = require("../Routes/VerifyToken")
const crypto = require("crypto-js")
const Users = require("../Models/Users")
const Admins = require("../Models/Admin")
const Products = require("../Models/Products")
const Orders = require("../Models/Orders")

    router.get("/stats", async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await Users.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: 1 },
            },
        },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
    });
// this is wrong but have just kept to identihy the issue in code block
    // router.get("/monthlyStats", async (req, res) => {
    //     const date = new Date()
    //     const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    //     try {
    //          const data = await Users.aggregate([
    //             { $match: { createdAt: { $gte: lastMonth } } },
    //             {
    //                 $project: {
    //                 month: { $month: "$createdAt" },
    //                 },
    //             },
    //             {
    //                 $group: {
    //                 _id: "$month",
    //                 total: { $sum: 1 },
    //                 },
    //             },
    //         ]);
    //         res.status(200).json(data)
    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // })

// update user method: PUT method description: Updates the user on forget password

    router.put("/:id", verifyTokenAndAuth, async (req, res) => {
        if (req.body.password) {
            req.body.password = crypto.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
                ).toString()
            }
            try{
                const updatedUser = await Users.findByIdAndUpdate(req.params.id, 
                    {
                        $set: req.body
                    },
                    {new: true})
                    res.status(200).json(updatedUser)
                }catch(err){
                    res.status(500).json(err)   
                }
                
            })
        
// delete user method: delete method description: deletes user when user clicks forget password

    router.delete("/:id", async(req, res) => {
        const user = await Users.findById(req.params.id)
        try {
            await Orders.deleteMany({userId: user._id})
            await Users.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been sucessfully deleted!")
        } catch (err) {
            res.status(500).json(err)
        }
    })


// delete admin, method: DELETE method, description: deletes the admin
    router.delete("/adminDelete/:id", async(req, res) => {
        try {
            await Admins.findByIdAndDelete(req.params.id)
            res.status(200).status("Admin has been sucesfully deleted!")
        } catch (err) {
            res.status(500).status(err)
            console.log("process failed!");
        }
    } )

    router.get("/", async (req, res) => {
        try {
            const user = await Users.find()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    router.get("/adminget/", async (req, res) => {
     try {
         const admin = await Admins.find()
         res.status(200).json(admin)
     } catch (err) {
         res.status(500).json(err)
     }
 })
    
    router.get("/:id", async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    // AddToCart, Method: PUT method, description: Allows user to add specific product in his cart 
    router.put("/:id/cart", async(req, res) => {
        const user = await Users.findById(req.params.id)
        const {plant, name, image, price, quantity, stock} = req.body
        const specPlant = plant
        const cart = {
            plant: plant,
            name: name,
            image: image,
            quantity: quantity,
            price: price,
            stock: stock,
        }
         const alreadyThere = user.cart.find(
            (r) => r.name === req.body.name
        )
        try {
            if (alreadyThere) {
                res.status(403).json("you already have this product in your cart");
            }else{
                await user.updateOne({ $push: {cart} })
                // stock - quantity
                // console.log(plant, quantity);
                res.status(200).json(user)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })
    
    
    // deleting cart, method: PUT method, description: allows the user to delete the specific cart item
    router.put("/:id/removeCart", async (req, res) => {
        const user = await Users.findById(req.params.id)
        const {plant, name, image, stock, price, quantity} = req.body
        const cart = {
            plant: plant,
        }
         const alreadyThere = user.cart.find(
            (r) => r.name === req.body.name
        )
        if (user) {
            try {
                if (alreadyThere) {
                    res.status(403).json("Something went wrong")
                    console.log("Something went wrong");
                }else{
                    await user.updateOne({ $pull: {cart} });
                    res.status(200).json(user)
                }
            } catch (error) {
                res.status(500).json(err)
                console.log(err);
            }
        }else{
            res.status(403).json("You are un-authorized")
        }
    })

    // empty cart, method: put, description: Deletes all cart
    router.put("/:id/clearCart", async (req, res) => {
        const user = await Users.findById(req.params.id)
        const cart = {plant, name} = user.cart
        try {
            await user.updateOne({ $pullAll: {cart} })
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    })

    // getAllCart, method: GET method, description: Gives cart of each user 
    router.get("/:id/getAllCart", async(req, res) => {
        
    })

    

// exporting router module
module.exports = router