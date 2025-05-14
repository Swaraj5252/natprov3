// router configuration
const router = require("express").Router()
const crypto = require("crypto-js")
const jwt = require("jsonwebtoken")
// bringing in user and amin model
const Users = require("../Models/Users")
const NatproAdmins = require("../Models/Admin")

// Register route method: POST method description: registers the user in databas 
router.post("/register", async (req, res) => {
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: crypto.AES.encrypt(req.body.password, process.env.SECRET)
    });
    
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        console.log(savedUser);
    } catch (err) {
        res.status(500).json(err)
    }
})
// Register admin route Method: POST method, description: Registers the admin in system
router.post("/adminRegister", async (req, res) => {
    const newAdmin = new NatproAdmins({
        name: req.body.name,
        adminEmail: req.body.adminEmail,
        adminPassword: crypto.AES.encrypt(req.body.adminPassword, process.env.SECRET)
    })
    try {
        const savedAdmin = await newAdmin.save()
        res.status(200).json(savedAdmin)
        console.log(savedAdmin);
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
})

// Login route method: POST method description: Login's the user in the system
router.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({username: req.body.username})
        !user && res.status(401).json("wrong credentials!")
        const hashedPassword = crypto.AES.decrypt(user.password, process.env.SECRET)
        const orignalPassword = hashedPassword.toString(crypto.enc.Utf8)
        orignalPassword !== req.body.password && res.status(401).json("wrong credentials!")

        const accessToken = jwt.sign({
            id: user.id
        }, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d"}
        )

        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})

// Login admin route Method: POST method description: login the admin in system

router.post("/adminLogin", async (req, res) => {
    try {
        const admin = await NatproAdmins.findOne({name: req.body.name})
        !admin && res.status(401).json("wrong credentials!")
        const hashedPassword = crypto.AES.decrypt(admin.adminPassword, process.env.SECRET)
        const orignalPassword = hashedPassword.toString(crypto.enc.Utf8)
        orignalPassword !== req.body.adminPassword && res.status(401).json("wrong credentials!")
        const accessToken = jwt.sign({
            id: admin.id
        },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        const {password, ...others} = admin._doc
        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})

// exporting router module
module.exports = router