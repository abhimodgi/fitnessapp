Template.patientSummary.onCreated(function() {

});

Template.patientSummary.onRendered(function(){

});

Template.patientSummary.helpers({
    formatedDob: function() {
        return moment(this.persodata.dob).format('LLLL');
    }
});

Template.patientSummary.events({
    'click .edit-patient': function(event, template) {
        console.log('edit athlete clicked');
        console.log(event.currentTarget.getAttribute('data-id'));
        Router.go('patient', {_id: event.currentTarget.getAttribute('data-id')});
    }
});
