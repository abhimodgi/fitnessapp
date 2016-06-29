Template.patient.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var patientId = Router.current().params._id;
        self.currPatient = new ReactiveVar(Meteor.users.findOne({_id: patientId}));
        self.subscribe('medicalRecords');
    });
});

Template.patient.events({
    'click #newVitalRecord': function(event, template) {
        Modal.show('vitalSignsModal');
    },
    'click #newAllergy': function(event, template) {
        Modal.show('allergyModal');
    },
    'click #newVaccination': function(event, template) {
        Modal.show('vaccinationModal');
    },
    'click #newPrescription': function(event, template) {
        Modal.show('prescriptionModal');
    },
    'click #newHealthProblem': function(event, template) {
        Modal.show('healthProblemModal');
    }
});

Template.patient.helpers({
    'currPatient': function() {
        // var patientId = Router.current().params._id;
        // return Meteor.users.findOne({_id: patientId});
        return Template.instance().currPatient.get();
    },
    'medicalRecord': function() {
        return MedicalRecords.findOne({'patient.patientId': Router.current().params._id});
    }
});
