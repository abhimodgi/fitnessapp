
Meteor.publish("medicalSubSpeciality", function() {
    // current user
    return MedicalSubSpeciality.find({});
});
/*
Meteor.publish('medicalSpeciality', function(specialityname) {
	var specialityId = MedicalSpeciality.findOne({name:specialityname})._id;
	return MedicalSubSpeciality.find({specialityId:specialityId});
});*/