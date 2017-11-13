module.exports = {
    getAllUsers(req, res) {
        const db = req.app.get('db')
        db.get_all_users().then(response => {
            res.status(200).send(response)
        })
    },

    getAllVehicles(req, res) {
        const db = req.app.get('db')
        db.get_all_vehicles().then(response => {
            res.status(200).send(response)
        })
    },

    createUser(req, res) {
        const db = req.app.get('db')
        const {name, email} = req.body
        db.create_user(name, email).then(response =>{
            res.status(200).send(response)
        })
    },

    addVehicle(req, res) {
        const db = req.app.get('db')
        const {make, model, year, owner_id} = req.body
        db.add_vehicle(make, model, year, owner_id).then(response =>{
            res.status(200).send(response)
        })
    },

    getUserVehicles(req, res) {
        const db = req.app.get('db')
        db.get_user_vehicles(req.params.userId).then(response => {
            res.status(200).send(response)
        })
    },

    getAllUserVehicles(req, res) {
        const db = req.app.get('db')
        db.get_all_user_vehicles(req.params.userId).then(response => {
            res.status(200).send(response)
        })
    },

    getVehiclesByQuery(req, res, next) {
        if (req.query.userEmail) {
           return req.app.get('db').get_by_email([req.query.userEmail]).then(user => {
               return res.status(200).json(user)
           }).catch((err) => {console.log(err)})
        }
        if (req.query.userFirstStart) {
            return req.app.get('db').get_by_letter([req.query.userFirstStart + "%"]).then(user => {
                return res.status(200).json(user)
            }).catch((err) => {console.log(err)})
        }
    },

    getVehiclesByYear(req, res) {
        const db = req.app.get('db')
        db.get_vehicles_by_year().then(response => {
            res.status(200).send(response)
        })
    },

    updateOwner(req, res) {
        const db = req.app.get('db')
        const {vehicleId, userId} = req.params
        db.change_vehicle_owner([userId, vehicleId]).then(response =>{
            res.status(200).send(response)
        })
    },

    deleteOwnership(req, res) {
        const db = req.app.get('db')
        db.delete_ownership(req.params.vehicleId).then(response => {
            res.status(200).json(response)
        })
    },
    
    deleteVehicle(req, res) {
        const db = req.app.get('db')
        db.delete_vehicle(req.params.vehicleId).then(response => {
            res.status(200).json(response)
        })
    }


}