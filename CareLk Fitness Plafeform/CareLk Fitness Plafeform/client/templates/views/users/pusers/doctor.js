Template.doctor.onCreated(function() {
    var self = this;
    self.subscribe('doctor');
    self.subscribe('doctors');
});

Template.doctor.helpers({
    doctor: function() {
        if (Meteor.user().doctor != undefined) {
            var docId = Meteor.user().doctor.doctorId;
            return Meteor.users.findOne({_id: docId});
        }
        return;
    },
    doctors: function() {
        return Meteor.users.find({'persodata.identity': '2'});
    },
    workHours: function(day) {
        if (Meteor.user().doctor) {
            var docId = Meteor.user().doctor.doctorId;
            var doc = Meteor.users.findOne({_id: docId});
            var isWorkDay = eval('doc.persodata.workTime.' + day + '.isWorkDay');
            if (isWorkDay) {
                var start = eval('doc.persodata.workTime.' + day + '.from');
                var end = eval('doc.persodata.workTime.' + day + '.to');
                return 'From: ' + start + '  To: ' + end;
            } else {
                return 'Not working.';
            }
        }
    },
    dor: function() {
        return moment(Meteor.user().doctor.registrationDate).format('MMMM Do YYYY, h:mm:ss a');
    }
});
