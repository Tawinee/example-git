var express = require('express');
var app = express();
var data = require("./data.json");

var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";

var option = { useUnifiedTopology: true, useNewUrlParser: true };



app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    res.render('pages/index', { profile: data });
});

app.get("/products", function (req, res) {

    MongoClient.connect(url, option, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = {};
        //Find the first document in the customers collection:
        dbo.collection("products").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/Products', { product: result });
            db.close();
        });
    });

});

app.get("/productId/:id", function (req, res) {
    var proid = req.params.id;

    // Get the class detail form mongodb

    MongoClient.connect(url, option, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = { ProductID: proid };
        //Find the first document in the customers collection:
        
        dbo.collection("products")
            .findOne(query, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.render('pages/productId', { detail: result });
                db.close();
            });
    });
});

app.listen(8000);
console.log('Express started at http://localhost:8000');
