const categorySchema = require('../model/category_schema')

const controller = {
    createCategory: async (req,res) => {
        let eachCategory = new categorySchema({
            Category:req.body.Category,
            posted_by:req.app.get("data1").user_id
        })
        await eachCategory.save()
        .then((data) => {
            // console.log("Data is" , data)
            res.status(200).json({
                message:"Category created",
                data:data
            })
        })
        .catch((err) => {
            if(err.name == "MongoError" && err.code == 11000){
                res.json({
                    message:"Category Already Exists!!"
                })
            }
            // console.log("Error while creating category " , JSON.stringify(err) )
            else {
                res.status(401).json({
                message:"Error while creating category",
                error:err
                })
            }
        })
    },

    getAllCategories: async (req,res) => {
        try {
            await categorySchema.find((err,data) => {
                if(err){
                    res.status(400).json({
                        message:"Error while retreiving data",
                        error:err
                    })
                }
                else{
                    if(data.length == 0){
                        res.status(403).json({
                            message:"No category exists!!."
                        })
                    }
                    else{
                        res.status(200).json({
                            message:"All data",
                            data:data
                        })
                    }
                }
            })
        } catch (error) {
            console.log("Error while getting all category " , JSON.stringify(err) )
            res.status(500).json({
                message:"Error while retreiving data",
                error:error
            })
        }
    },

    getLinkOnTheBasisOfCategory: (req,res) => {
        categorySchema.where({Category:req.params.Category}).exec((err,result) => {
            if(err){
                console.log("Error in get link" , JSON.stringify(err))
                res.status(500).json({
                    message:"Error while getting data ",
                    error:err.message
                })
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        message:"No links found"
                    })
                }else{
                    console.log("Result in link" , result)
                    res.status(200).json({
                        message:"List of Links",
                        data:result
                    })
                }
            }
        })
    },

    updateCategory : (req,res) => {
       categorySchema.findByIdAndUpdate(
            {_id:req.params._id},
            {
                Category:req.body.Category
            },
            {new:true}
        )
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Category Available.Please add category"
                })
            }
            else{
                // console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Updated",
                    data:data
                })
            }
        })
        .catch((err) => {
            console.log("Error while updating category " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while updating category",
                error:err
            })
        })
    },

    deleteCategory: async (req,res) => {
        await categorySchema.findByIdAndDelete({
            _id:req.params._id
        })
        .then((data) => {
            if(!data){
                res.status(403).status({
                    message:"No category exists."
                })
            }
            else{
                res.status(200).json({
                    message:"Deleted the category"
                })
            }
        })
        .catch((err) => {
            console.log("Error while deleting category " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while deleting category",
                error:err
            })
        })
    },

    searchCategory:(req,res) =>{
        categorySchema.find({Category:req.body.Category},(err,result) => {
            if(err){
                res.status(401).json({
                    message:"Error while searching the category",
                    error:err
                })
            }
            else{
                if(result.length == 0){
                    res.status(403).json({
                        message:`No category found with name ${req.body.Category}`
                    })
                }else{
                    res.status(200).json({
                        message:"Found",
                        data:result
                    })
                }
            }
        })
    }
}

module.exports = controller