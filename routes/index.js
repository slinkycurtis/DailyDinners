var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Recipe list page. */
router.get('/recipelist', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({},{},function(e,docs){
        res.render('recipelist', {
            "recipelist" : docs
        });
    });
});

/* GET New Recipe page. */
router.get('/newrecipe', function(req, res) {
    res.render('newrecipe', { title: 'Add New Recipe' });
});

/* GET New Template page. */
router.get('/template', function(req, res) {
    res.render('template', { title: 'Welcome to Daily Dinners' });
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
