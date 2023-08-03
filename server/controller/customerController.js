const customers = require("../model/customersmodel")

//All data
exports.datacustomers = async (req, res) => {
    try {
        const datacustomers = await customers.find({})
        res.json(datacustomers)
    }
    catch (err) {
        res.status(400).json({ error: err })
        console.log(err)
    }

}

//get one data
exports.datacustomer = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const datacustomer = await customers.findOne({ ccode: id })
        res.json(datacustomer)
    }
    catch (err) {
        res.status(400).json({ error: err })
        console.log(err)
    }

}

//Create data
exports.insertcustomer = async (req, res) => {
    try {
        const { ccode, cname, cemail, ctel } = req.body

        switch (true) {
            case !ccode:
                return res.status(400).json({ error: "Customer code already exists" })
                break
        }

        const statusdata = true
        const customer = await customers.create({ ccode, cname, cemail, ctel, statusdata })
        res.send(customer)
    }
    catch (err) {
        res.status(400).json({ error: err })
        console.log(err)
    }

}


//update data 
exports.updatecustomer = async (req, res) => {
    try {
        const { id, ccode, cname, cemail, ctel } = req.body
        const updatecustomer = await customers.findOneAndUpdate({ _id: id }, { ccode, cname, cemail, ctel })
        res.send(updatecustomer)
    }
    catch (err) {

    }
}




//delete data
exports.deletedatacustomer = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const customer = await customers.findOneAndDelete({ ccode: id })
        res.send(customer)

    }
    catch (err) {
        res.status(400).json({ error: err })
        console.log(err)
    }
}

//multi delete
exports.multidelete = async (req, res) => {
    try {
        const { ids } = req.params
        const ccode = ids.split(",")
        console.log(ccode)
        const customer = await customers.deleteMany({ ccode: ccode })
        res.send(customer)
    }
    catch (err) {
        res.status(400).json({ error: err })
        console.log(err)
    }
}

//update status on
exports.updatestatuson = async (req, res) => {
    try {
        const { id } = req.body
        const ccode = id.split(",")
        const updatecustomer = await customers.updateMany({ ccode: ccode }, { $set: { "statusdata": true } })
        res.send(updatecustomer)
    }
    catch (err) {

    }
}
//update status off
exports.updatestatusoff = async (req, res) => {
    try {
        const { id } = req.body
        const ccode = id.split(",")
        const updatecustomer = await customers.updateMany({ ccode: ccode }, { $set: { "statusdata": false } })
        res.send(updatecustomer)
    }
    catch (err) {

    }
}


