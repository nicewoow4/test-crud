const express = require("express")
const router = express.Router()
const {insertcustomer , datacustomers,deletedatacustomer ,datacustomer ,multidelete,updatecustomer,updatestatuson,updatestatusoff} = require("../controller/customerController")
const {requireLogin} = require("../controller/authController")
router.get('/datacustomers',requireLogin,datacustomers)
router.get('/datacustomer/:id',requireLogin,datacustomer)
router.post('/insertcustomer',requireLogin,insertcustomer)
router.put('/updatecustomer',requireLogin,updatecustomer)
router.put('/updatestatuson',requireLogin,updatestatuson)
router.put('/updatestatusoff',requireLogin,updatestatusoff)
router.delete('/multidelete/:ids',requireLogin,multidelete)
router.delete('/deletedatacustomer/:id',requireLogin,deletedatacustomer)

module.exports=router