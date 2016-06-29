

Meteor.publish('usermessages', function() {
    var messages =  UserMessages.find({'userId':this.userId}, { limit: 50, sort: {"date": 1}});
    return messages;
});