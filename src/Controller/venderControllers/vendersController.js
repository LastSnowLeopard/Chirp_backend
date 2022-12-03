// const Vender = require('../../models/vender');


// const getVenders = async (req, res, next) => {
//     Vender.find().then(venders => {
//         res.status(200).send(venders)
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }
// const disableVender = async (req, res, next) => {
//     Vender.findById(req.params._id).then(mutateVender => {
//         mutateVender.disabled=true;
//         mutateVender.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }
// const enableVender = async (req, res, next) => {
//     Vender.findById(req.params._id).then(mutateVender => {
//         mutateVender.disabled=false;
//         mutateVender.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }


// const deleteVender = async (req, res, next) => {
//     Vender.findByIdAndDelete(req.params._id).then(success => {
//         res.status(200).send({success,message:"Product deleted"})

//     }).catch(err => {
//         res.status(409).send(err)
//     })
// }

// module.exports = { getVenders, disableVender, deleteVender,enableVender }