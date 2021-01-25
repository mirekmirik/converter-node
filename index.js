const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000


const urlencodedparser = bodyParser.urlencoded({ extended: false })

app.get('/', urlencodedparser, (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

app.post('/', urlencodedparser, (req, res) => {
    //1
    if (req.body.unit == 'metre' && req.body.convert_to == 'inches') {
        res.status(200)
        res.json({
            "metre": req.body.valueForUnit,
            "inches": Math.floor(req.body.valueForUnit * 39.37)
        })
    }

    if (req.body.unit == 'inches' && req.body.convert_to == 'metre') {
        res.status(200)
        res.json({
            "inches": req.body.valueForUnit,
            "metre": Math.floor(req.body.valueForUnit / 39.37)
        })
    }
    //2
    if (req.body.unit == 'kilogram' && req.body.convert_to == 'pounds') {
        res.status(200)
        res.json({
            "kilogram": req.body.valueForUnit,
            "pounds": Math.floor(req.body.valueForUnit * 2.2046)
        })
    }

    if (req.body.unit == 'pounds' && req.body.convert_to == 'kilogram') {
        res.status(200)
        res.json({
            "pounds": req.body.valueForUnit,
            "kilogram": Math.floor(req.body.valueForUnit / 2.2046)
        })
    }
    //3
    if (req.body.unit == 'mil' && req.body.convert_to == 'inches' || req.body.convert_to == 'milimeter') {
        if (req.body.convert_to == 'inches') {
            res.status(200).json({
                "mil": req.body.valueForUnit,
                "inches": Math.floor(req.body.valueForUnit / 1000)
            })
        } else {
            res.status(200).json({
                "mil": req.body.valueForUnit,
                "milimeter": req.body.valueForUnit / 39.35
            })
        }
    }

    //4
    if (req.body.unit == 'inches' && req.body.convert_to == 'mils' || req.body.convert_to == 'centimeters') {
        if (req.body.convert_to == 'mils') {
            res.status(200).json({
                "inches": req.body.valueForUnit,
                "mils": req.body.valueForUnit * 1000
            })
        } else {
            res.status(200).json({
                "inches": req.body.valueForUnit,
                "centimeters": req.body.valueForUnit * 2.54
            })
        }
    }


    if (req.body.valueForUnit !== typeof Number) {
        return res.sendStatus(400)
    }

    if (!req.body) {
        return res.sendStatus(400)
    }
})





app.listen(PORT, () => console.log(`The server has been started on ${PORT}`))