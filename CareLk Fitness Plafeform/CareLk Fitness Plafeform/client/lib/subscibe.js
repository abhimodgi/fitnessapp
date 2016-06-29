Tracker.autorun(function () {
    Meteor.subscribe("medicalSpecialities");
    Meteor.subscribe("userData");
    Meteor.subscribe('patients');
    Meteor.subscribe("usermessages");
    Meteor.subscribe("coach");
});
