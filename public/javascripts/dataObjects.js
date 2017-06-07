module.exports = {
  	foo: function () {
    // whatever
  	},
  	bar: function () {
    // whatever
  	}
};

var count = function(request) {
	var db = request.db;
	var collection = db.get('recipes');
	var result = collection.find({},{}).count();
	console.log(result);
	return result;
}


