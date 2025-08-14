const express=require('express');
const { createCompany ,getAllCompany} = require('../controller/companyController');
const upload = require('../config/multer');

const router=express.Router()

router.post("/create", upload.single('logo'), createCompany)
router.get("/", getAllCompany)


module.exports = router;