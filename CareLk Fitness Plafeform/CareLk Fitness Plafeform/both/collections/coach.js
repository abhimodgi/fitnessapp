Coach = new Mongo.Collection("coach");

Coach.before.insert(function (doc){
	doc.createAt = Date.now();
	doc.rating = 0;
});
