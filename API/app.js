// express configuration
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// bringing in all routes
const userRoute = require("./Routes/UserRoute")
const authRoute = require("./Routes/AuthRoute")
const productRoute = require("./Routes/ProductRoute")
const orderRoute = require("./Routes/OrderRoute")
// json configuration
app.use(express.json())

// ------------------------------------------------------------------------------------ //
// dotenv config
dotenv.config()

// connecting the database to API/server
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected sucessfully......"))
.catch((err) => console.log(err))

// ------------------------------------------------------------------------------------ //
// configuration of routes

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)

// ------------------------------------------------------------------------------------ //
// port and server configuration

const port = process.env.PORT || 6387

app.listen(port, () => {
    console.log(`server started on port ${port}........`);
})