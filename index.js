require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const app = express()
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    db.init_tables.user_create_seed().then( response => {
        console.log('User table init');
        db.init_tables.vehicle_create_seed().then( response => {
          console.log('Vehicle table init');
        })
      })
}).catch(err => console.log('err'))

const ctrl = require('./controller')

app.get('/api/users',ctrl.getAllUsers)
app.get('/api/vehicles', ctrl.getAllVehicles)
app.get('/api/user/:userId/vehiclecount', ctrl.getUserVehicles)
app.get('/api/user/:userId/vehicle', ctrl.getAllUserVehicles)
app.get('/api/vehicle', ctrl.getVehiclesByQuery)
app.get('/api/newervehiclesbyyear', ctrl.getVehiclesByYear)


app.post('/api/users', ctrl.createUser)
app.post('/api/vehicles', ctrl.addVehicle)
app.put('/api/vehicle/:vehicleId/user/:userId', ctrl.updateOwner)
app.delete('/api/user/:userId/vehicle/:vehicleId', ctrl.deleteOwnership)
app.delete('/api/vehicle/:vehicleId', ctrl.deleteVehicle)



const PORT = 3000
app.listen(PORT, ()=>{ console.log(`Ship has docked on ${PORT}`)})