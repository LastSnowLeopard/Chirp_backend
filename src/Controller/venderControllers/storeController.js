const Store = require('../../models/store');

const addStore = async (req, res, next) => {
    const { business_name, store_type, city, physycal_store, store_timing, start_time, end_time, lat, long, cash_on_delivery, } = req.body;
    if (business_name && store_type && city && physycal_store && store_timing && start_time && end_time && lat && long && cash_on_delivery) {
        const newStore = new Store({
            business_name,
            store_type,
            city,
            physycal_store,
            store_timing,
            start_time,
            end_time,
            lat,
            long,
            cash_on_delivery,

            vendor_id: req.vender._id
        })

        newStore.save().then(store => {
            res.status(200).send(store)
            // res.status(200).send(Store)
        }).catch(error => {
            res.status(409).send(error)
        })

    } else {
        res.status(422).send("fields are required")
    }
}
const getStores = async (req, res, next) => {
    Store.find({ vender_id: req.vender._id }).then(stores => {
        res.status(200).send(stores)
    }).catch(error => {
        res.status(422).send("store does not exist")
    })
}
const getAllStores = async (req, res, next) => {
    Store.find().then(stores => {
        res.status(200).send(stores)
    }).catch(error => {
        res.status(422).send("stores does not exist")
    })
}
const mutateStore = async (req, res, next) => {
    const {
        business_name,
        store_type,
        city,
        physycal_store,
        store_timing,
        start_time,
        end_time,
        lat,
        long,
        cash_on_delivery,
    } = req.body;

    Store.findById(req.params._id).then(mutateStore => {
        if (business_name)
            mutateStore.business_name = business_name;
        if (store_type)
            mutateStore.store_type = store_type;
        if (city)
            mutateStore.city = city;
        if (physycal_store)
            mutateStore.physycal_store = physycal_store;
        if (store_timing)
            mutateStore.store_timing = store_timing;
        if (start_time)
            mutateStore.start_time = start_time;
        if (end_time)
            mutateStore.end_time = end_time;
        if (lat)
            mutateStore.lat = lat;
        if (long)
            mutateStore.long = long;
        if (cash_on_delivery)
            mutateStore.cash_on_delivery = cash_on_delivery;
        mutateStore.save().then(success => {
            res.status(200).send(success)
        })
    }).catch(err => {
        res.send("Store does not exits")
    })
}
const deleteStore = async (req, res, next) => {
    Store.findByIdAndDelete(req.params._id).then(success => {
        res.status(200).send("Store deleted")

    }).catch(err => {
        res.status(409).send(err)
    })
}

module.exports = { addStore, getStores, mutateStore, deleteStore, getAllStores }