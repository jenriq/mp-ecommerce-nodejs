var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
});


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});


app.post('/preference', function (req, res) {

    // Crea un objeto de preferencia
    let preference = {
        "items": [
            {
                "id": "item-ID-1234",
                "title": req.body.title,
                "currency_id": "MXN",
                "picture_url": req.body.img.replace('./', req.get('origin') + '/'),
                "description": req.body.title,
                "category_id": "art",
                "quantity": req.body.unit,
                "unit_price": req.body.price
            }
        ],
        "payer": {
            "name": "Juan",
            "surname": "Lopez",
            "email": "user@email.com",
            "phone": {
                "area_code": "11",
                "number": "4444-4444"
            },
            "identification": {
                "type": "DNI",
                "number": "12345678"
            },
            "address": {
                "street_name": "Street",
                "street_number": 123,
                "zip_code": "5700"
            }
        },
        "back_urls": {
            "success": "https://www.success.com",
            "failure": "http://www.failure.com",
            "pending": "http://www.pending.com"
        },
        "auto_return": "approved",
        "payment_methods": {
            "excluded_payment_methods": [
                {
                    "id": "master"
                }
            ],
            "excluded_payment_types": [
                {
                    "id": "ticket"
                }
            ],
            "installments": 12
        },
        "notification_url": "https://www.your-site.com/ipn",
        "external_reference": "Reference_1234",
        "expires": true,
        "expiration_date_from": "2016-02-01T12:00:00.000-04:00",
        "expiration_date_to": "2016-02-28T12:00:00.000-04:00"
    };
    
    console.log(req.get('origin'));
    console.log(preference);

    res.redirect("/");

    // mercadopago.preferences.create(preference)
    //     .then(function (response) {
    //         // console.log(response);
    //         res.redirect(response.body.init_point);
    //     }).catch(function (error) {
    //         console.log(error);
    //     });


});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

const PORT = process.env.PORT || 3000;

app.listen(PORT);








