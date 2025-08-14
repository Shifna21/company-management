const Company = require('../models/companyModel')

exports.createCompany = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "provide a valid data" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });

        }

        const existingCompany = await Company.findOne({ name })

        if (existingCompany) {
            return res.status(409).json({ message: "email already in use" })
        }

        const updateCompany = {
            name,
            logo: `/uploads/${req.file.filename}`,

        }

        await Company.create(updateCompany)

        return res.status(201).json({ message: "register successfully" })

    } catch (error) {
        return res.status(500).json({ message: "reg error", error: error.message })
    }
}

exports.getAllCompany = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json(companies);
    } catch (error) {
       return res.status(500).json({ message:"fetch error", error: error.message });
    }
};

// exports.getAllUser = async (req, res) => {
//     try {
//         const userData = await User.find()

//         if (userData.length === 0) {
//             return res.status(400).json({ message: "data not found" })
//         }
//         return res.status(200).json({ message: "user fetched successfully", data: userData })

//     }
//     catch (error) {
//         return res.status(500).json({ message: "fetched error", error: error.message })

//     }
// }