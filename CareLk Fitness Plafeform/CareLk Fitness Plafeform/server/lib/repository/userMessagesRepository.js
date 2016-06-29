
/***
 * User Messaging 
 * Mailbox between doctor and patients
 * Create, Modify, Visualize
 * 
 * Messages are stored in db: { _id, userId, previousMessageId, type, date, from, to, subject, message }
 * type = {email, chat} 
 */

Meteor.methods({
    sendMessage: function(message) {
        
        if (!Meteor.userId())
        {
            return {err:'The user must be logged in!', status:false};
        }
        var user = Meteor.user();
        
        message.from = user.persodata.lname + ' ' + user.persodata.fname; 
        // create a sent message for the current user 
        UserMessages.update(
            { 
                _id: message.id
            },
            {
                userId: Meteor.userId(), 
                type: message.type,
                from: message.from,
                to: message.to,
                date: new Date(),
                subject: message.subject,
                message: message.message,
                isRead: false,
                isSent: true,
                isDeleted: false,
                previousMessageId: message.previousMessageId
            },
            { upsert: true }
        );
        
        // create a received message for the 
        UserMessages.update(
            { 
                _id: message._id
            },
            {
                userId: message.userToId, 
                type: message.type,
                from: message.from,
                to: message.to,
                date: new Date(),
                subject: message.subject,
                message: message.message,
                isRead: false,
                isSent: false,
                isDeleted: false,
                previousMessageId: message.previousMessageId
            },
            { upsert: true }
        );
    },
    deleteMessage: function(message) {
        if (!Meteor.userId())
        {
            return {err:'The user must be logged in!', status:false};
        }
        
        UserMessages.update(
            { 
                _id: message._id
            },
            {
                isDeleted: true,
            },
            { upsert: true }
        );
    },
    deleteMessages: function(messages) {
        
    },
    // get statistics for current user: inbox, sent, draft, trash
    getMailStatisticts: function() {
        if (!Meteor.userId())
        {
            return {err:'User must be logged in.', status:false};
        }
        
        var statistics = {
            inbox:0,
            sent:0,
            draft:0,
            trash:0
        }
        
        var messages = UserMessages.find({'userId':this.userId});
        var inbox = messages.length;
        var sent = messages.find({"isSent": true}).length;
        var draft = messages.find({"isSent": false}).length;
        var deleted = messages.find({"isDeleted": false}).length;
        statistics.inbox = inbox;
        statistics.sent = sent;
        statistics.draft = draft;
        statistics.trash = trash;
        
        return statistics;  
    }
});
