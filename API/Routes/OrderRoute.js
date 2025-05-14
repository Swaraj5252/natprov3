const router = require("express").Router()
const Orders = require("../Models/Orders")
const Products = require("../Models/Products")
const Users = require("../Models/Users")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")

// 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

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: "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"
    }
})) 

router.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Orders.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalAmount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/monthlyIncome", async (req, res) => {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
            // const mapOrders = Orders.map((order) => {return order})
        const income = await Orders.aggregate([
            {$match: {createdAt: { $gte: previousMonth }}},
            {$project: {
                month: {$month: "$createdAt"},
                sales: "$totalAmount"
            }},
            {$group: {
                _id: "$month",
                total: {$sum: "$sales"}
            }}
        ])
        res.status(200).json(income)
        console.log(income)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    })

// Create new order, Method: POST method, description: makes new order when user wants
router.post("/", async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        phoneNumber,
        paymentMethod,
        totalAmount,
        totalQuantity,
        user,
        userId,
        email,
        isPaid,
        paidAt,
        deliveredAt,
        status
    } = req.body
    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400).json("No order items...")
        } else {
            const order = new Orders({
                orderItems,
                shippingAddress,
                phoneNumber,
                email,
                paymentMethod,
                totalAmount,
                totalQuantity,
                isPaid,
                paidAt,
                user,
                userId,
                deliveredAt,
                status
            })
            const createdOrder = await order.save()
            transporter.sendMail({
                to:email,
                from: "swarajgadre@gmail.com",
                subject: "order placed successfully",
                html: `<p> Hello! ${order?.user} your order has been succesfully placed </p> <br/> <p> http://localhost:3000/orders/${order?._id} </p>`
            })
            res.status(200).json(createdOrder)

        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
})

//get orders, method: GET method, description: Get all orders from DB
router.get("/", async (req, res) => {
    try {
        const orders = await Orders.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// order as per Id, method: GET method, description: Gets order as per the Id
router.get("/:id", async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id)
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
})

// orders of specific users, method: GET method, description: Get orders of specific user
    router.get("/:id/orders", async (req, res) => {
        const user = await Users.findById(req.params.id)
        const userOrders = await Orders.find({userId: user._id})  
        try {
            res.status(200).json(userOrders)
        } catch (err) {
            res.status(500).json(err)
        }
    })



// status update, method: PUT method, description: Update pending order to delivered
    router.put("/:id/updateStatus", async (req, res) => {
        const order = Orders.findById(req.params.id)
        try {
            if (order) {
                const updatedBlog = await Orders.findByIdAndUpdate(
                    req.params.id, {$set: req.body}, {new: true},
                    )
                    res.status(200).json(updatedBlog)
                }else {
                    res.status(404).json("Order not found")
                }
        } catch (err) {
            res.status(500).json(err)
            console.log(err);
        }
    })


module.exports = router
