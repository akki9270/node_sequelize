const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config/config');
const models = require('./models');

// parse request as Json object
app.use(bodyParser.json());

models.sequelize.sync({ force: true })
    .then(async () => {
        try {
            // Add dummy data to hospital and patient Table
            let Hospital_1 = await models.Hospital.create({ name: 'atos', phone: 123456789, reg_no: '123' });
            let Hospital_2 = await models.Hospital.create({ name: 'apple', phone: 123456789, reg_no: '124' });
            let patient = await models.Patient.create({ fk_reg_no: Hospital_1.reg_no, name: 'Jhone' })
            start_server();
        } catch (err) {
            console.log(' Data Insert Err ', err);
        }
    })

// get list of hospitals using models.
app.get('/hospitals', async function (req, res) {
    let hospitals = await models.Hospital.findAll({});

    // to get selected fields only. uncomment it and check.
    /* let hospitals = await models.Hospital.findAll({
        attributes: ['name', 'reg_no']
    }); */

    res.send(hospitals);
});

function start_server() {
    app.listen(8000, function () {
        console.log('Magic happens on port 8000')
    })
}
