UserMessages = new Mongo.Collection("usermessages");

UserMessages.before.insert(function (doc){
	doc.createAt = Date.now();
	doc.rating = 0;
});

UserMessages.helpers({
    from:function(){
        return Meteor.userId();
    }
});