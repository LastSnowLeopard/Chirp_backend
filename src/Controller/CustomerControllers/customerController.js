// const Customer = require('../../models/customer');

const {getcategory}=require('../../service/customer');


// const getCustomers = async (req, res, next) => {
//     Customer.find().then(customers => {
//         res.status(200).send(customers)
//     }).catch(error => {
//         res.status(422).send({ error, message: "Customer does not exist" })
//     })
// }
// const disableCustomer = async (req, res, next) => {
//     Customer.findById(req.params._id).then(mutateCustomer => {
//         mutateCustomer.disabled = true;
//         mutateCustomer.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "Customer does not exist" })
//     })
// }
// const enableCustomer = async (req, res, next) => {
//     Customer.findById(req.params._id).then(mutateCustomer => {
//         mutateCustomer.disabled = false;
//         mutateCustomer.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "Customer does not exist" })
//     })
// }


// const deleteCustomer = async (req, res, next) => {
//     Customer.findByIdAndDelete(req.params._id).then(success => {
//         res.status(200).send({ success, message: "Customer deleted" })

//     }).catch(err => {
//         res.status(409).send(err)
//     })
// }


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



module.exports = {getcategories }
// module.exports = { getCustomers, disableCustomer, deleteCustomer, enableCustomer,getcategories }