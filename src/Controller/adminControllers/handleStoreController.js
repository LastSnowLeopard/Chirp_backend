// const Store = require('../../models/store');

// const getStores = async (req, res, next) => {
//     Store.find().then(stores => {
//         res.status(200).send(stores)
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }
// const disableStore = async (req, res, next) => {
//     Store.findById(req.params._id).then(mutateStore => {
//         mutateStore.disabled = true;
//         mutateStore.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }
// const enableStore = async (req, res, next) => {
//     Store.findById(req.params._id).then(mutateStore => {
//         mutateStore.disabled = false;
//         mutateStore.save().then(success => {
//             res.status(200).send(success)
//         })
//     }).catch(error => {
//         res.status(422).send({ error, message: "products does not exist" })
//     })
// }

// const deleteStore = async (req, res, next) => {
//     Store.findByIdAndDelete(req.params._id).then(success => {
//         res.status(200).send({ success, message: "Product deleted" })

//     }).catch(err => {
//         res.status(409).send(err)
//     })
// }

// module.exports = { getStores, disableStore, deleteStore, enableStore }