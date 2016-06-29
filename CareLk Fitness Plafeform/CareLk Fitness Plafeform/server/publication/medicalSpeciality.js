
Meteor.publish("medicalSpeciality", function() {
    // current user
    return MedicalSpeciality.find({});
});
