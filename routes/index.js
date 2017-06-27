var express = require('express');
var router = express.Router();
var dataAccess = require('../public/javascripts/dataObjects.js');

//Number of recipes to display each page
var pageLimit = 50;

var async = require('async');
//var items = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET product page. */
router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});


/* GET Recipe list page.  */
router.get('/recipelist', function(req, res) {
    var db = req.db;
    var page = req.query.page - 1;
    var collection = db.get('CompleteRecipe');
    var recipeNo = collection.count({});   

    recipeNo.then(function(recipeCount) {
        console.log('recipe count: ' +  recipeCount);
        collection.find({},{ limit : pageLimit, skip : page*50 },function(e,docs){
            res.render('recipelist', {
                "recipelist" : docs, "pageview" : req.query.page, "items" : recipeCount
            });
        });
    });
});

/* GET Recipe list page for Meat. */
router.get('/meat', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({Diets: "meat"},{ limit : pageLimit },function(e,docs){
        res.render('recipelist', {
            "recipelist" : docs
        });
    });
});

/* GET Recipe list page for vegetarians. */
router.get('/vegetarian', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({Diets: "vegetarian"},{ limit : pageLimit },function(e,docs){
        res.render('recipelist', {
            "recipelist" : docs
        });
    });
});

/* GET Recipe list page for fish. */
router.get('/fish', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({Diets: "fish"},{ limit : pageLimit },function(e,docs){
        res.render('recipelist', {
            "recipelist" : docs
        });
    });
});

/* GET Recipe list page for dairy. */
router.get('/dairy', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({Diets: "dairy"},{ limit : pageLimit },function(e,docs){
        res.render('recipelist', {
            "recipelist" : docs
        });
    });
});

/* GET Recipe list page for desert. */
router.get('/sweet', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    //collection.find({Type: "dessert"},{},function(e,docs){
    collection.find( { "Type" : { $in: ["dessert", "cake"] } } ,{ limit : pageLimit },function(e,docs){
        res.render('sweet', {
            "recipelist" : docs
        });
    });
});

/* GET Recipe Details page for an individual recipe. */
router.get('/recipe', function(req, res) {
    var db = req.db;
    var recipeID = req.query.recipe;
    var collection = db.get('CompleteRecipe');
    var recipeAttributes = db.get('recipes');
    console.log("recipeID = " + recipeID);
    var recipeDetails = "Paul Rocks";
    console.log("recipeJSON = " + recipeDetails);
    collection.find({ "RecipeID" : "Recip-" + recipeID},{},function(e,docs){
        res.render('recipe', {
            "recipe" : docs, "details" : recipeDetails
        });
    });
});


/* POST to Add Recipe Service */
router.post('/addrecipe', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var recipeID = req.body.RecipeID;
    var recipeImage = req.body.Image;
    var recipeIngredient = req.body.Ingredient;
    var recipeSecondary = req.body.Secondary;
    var recipeTitle = req.body.Title;
    var recipeType = req.body.Type;
    var recipeServes = req.body.Serves;
    var recipeDifficulty = req.body.Difficulty;
    var recipeDiets = req.body.Diets;
    var recipeTime = req.body.Time;
    var recipeID2 = req.body.ID;

    // Set our collection
    var collection = db.get('recipes');

    // Submit to the DB
    collection.insert({
        "RecipeID" : recipeID,
        "Image" : recipeImage,
        "Ingredient" : recipeIngredient,
        "Secondary" : recipeSecondary,
        "Title" : recipeTitle,
        "Type" : recipeType,
        "Serves" : recipeServes,
        "Difficulty" : recipeDifficulty,
        "Diets" : recipeDiets,
        "Time" : recipeTime,
        "ID" : recipeID2
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("recipelist");
        }
    });
});


module.exports = router;
