
// const sendEmail = require('../../util/sendEmail')
// const { validationResult } = require('express-validator');
const {addCategoryService,getCategoryListService,getcategory}=require('../../service/category');



const addCategory = async (req, res, next) => {
    const { cat_name, cat_description } = req.body;
    if (cat_name && cat_description) {
        let datas={
            cat_name:cat_name,
            cat_description:cat_description,
            parent1:parent1 || '0'
        }
        const addcategoryres = await addCategoryService( datas )

        if(addcategoryres=='true')
             res.status(200).send({data:{},status:true,message:"Category successfully added."})
        else
             res.status(500).send({data:{},status:false,message:"something went wrong"})

    } else {
        res.status(200).send({data:{},status:false,message:"fields are required"})

    }
}


const getCategoryList = async (req, res, next) => {
     
        const getcategory = await getCategoryListService()

        if(getcategory.rows.length>0)
             res.status(200).send({data:getcategory.rows,status:true,message:"Category list fetched"})
        
        else if(getcategory.rows.length==0)
             res.status(200).send({data:{},status:false,message:"No data found."})
        else
             res.status(500).send({data:{},status:false,message:"something went wrong"})

}


const getcategories =async (req, res, next) => {
    try{
        const categories = await getcategory()
        if (categories.rows.length==0) {
            res.status(200).send({data:{},status:false, message: 'No categories found' })
        }else{
            res.status(200).send({data:categories.rows,status:true, message: 'categories has successfully returned.' })
        }
    }catch(err)  {
        res.status(500).send({data:{},status:false, message: 'Some thing went wrong.' })
    }
}




// const getCategories = async (req, res, next) => {
//     Category.find().then(categories => {
//         res.status(200).send(categories)
//     }).catch(error => {
//         res.status(422).send("category does not exist")

//     })


// }
// const mutateCategory = async (req, res, next) => {
//     const {
//         name, description
//     } = req.body;

//     Category.findById(req.params._id).then(mutateCategory => {
//         if (name)
//             mutateCategory.name = name;
//         if (description)
//             mutateCategory.description = description;
//         mutateCategory.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(err => {
//         res.send("Category does not exits")
//     })
// }
// const deleteCategory = async (req, res, next) => {
//     Category.findByIdAndDelete(req.params._id).then(success => {
//         res.status(200).send(success)
//     }).catch(err => {
//         res.status(409).send(err)
//     })
// }

// module.exports = { addCategory, getCategories, mutateCategory, deleteCategory }
module.exports = { addCategory,getCategoryList,getcategories }