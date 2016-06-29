Template.reqNewExerciseModal.onCreated(function() {
    var self = this;
});

Template.reqNewExerciseModal.onRendered(function() {
    this.$("#reqExerciseForm").validate();
    Meteor.typeahead.inject();
});

Template.reqNewExerciseModal.helpers({
    patients: function() {
      Tracker.autorun(function(){
        return Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch().map(function(patient) {
            return {value: patient.persodata.lname + ', ' + patient.persodata.fname, id: patient._id}
        });
      });
    },
    workouts: function() {
        return Meteor.user().workouts.map(function(workout) {
            return workout.name;
        })
    },
    suggestionId: function(event, suggestion) {
      Tracker.autorun(function(){
        Template.instance().patientId.set(suggestion.id);
      });
    }
});

Template.reqNewExerciseModal.events({

    'submit #reqAppointmentForm': function(event, template) {
      Tracker.autorun(function(){
        event.preventDefault();
        var appointmentData = {
            miles: event.target.appMiles.value,
            mpm: event.target.appMpm.value,
            // mph: event.target.appMph.value,
            totalTimeMpm: event.target.appMiles.value * event.target.appMpm.value,
            // totalTimeMph: event.target.appMiles.value / event.target.appMpm.value,
            healthIssues: event.target.appHealthIssues.value,
            // healthIssues: event.target.mealselect.value,
            // comments: event.target.appComments.value,
            startDate: event.target.appStartDate.value,
            endDate: event.target.appEndDate.value,
            // urgent: event.target.appUrgent.checked,
            visitType: $('input[name=visitType]:radio:checked').val(),
        }
        if (template.patientId) {
            appointmentData['patientId'] = template.patientId.get();
        }
        Meteor.call('saveAppointment', appointmentData, function(err, result) {
            if (err && err.error) {
                swal({
                    title: 'Error occured',
                    text: err.reason,
                    allowEscapeKey: false,
                    closeOnCancel: false,
                    closeOnConfirm: true,
                    type: 'error'
                });
            }
            $('#calendar').fullCalendar('refetchEvents');
            Modal.hide();
        });
      });
    }
});
