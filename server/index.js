const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const customer = require("./route/customer")
const authRoute = require("./route/auth")

require("dotenv").config()

const app = express() //create express

//connect database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
.then(() => console.log("เชื่อมต่อเรียบร้อย"))
.catch((err) => console.log(err))


//middleware express
app.use(express.json())
app.use(cors())
app.use(morgan("dev")) //ดักตัวreq


//route
app.use('/api', customer)
app.use('/api',authRoute)

/*
app.get("*", (req, res) => {
    res.json({
        data: "Hello world"
    })
})
*/

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`))
//console.log(process.env.PORT)