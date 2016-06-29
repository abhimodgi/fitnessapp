Template.patients.onCreated(function() {
    var self = this;
    self.patientId = new ReactiveVar(null);
    self.subscribe('patients');
    self.showForm = new ReactiveVar(false);
});

Template.patients.onRendered(function(){
// Initialize dataTables plugin
 /*   $('#patientstb').dataTable({
        iDisplayLength: 25
    });*/

    // Initialize datatable
    $('#patientstb').dataTable({
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        buttons: [
            {extend: 'copy',className: 'btn-sm'},
            {extend: 'csv',title: 'Patient Summary', className: 'btn-sm'},
            {extend: 'pdf', title: 'Patient Summary', className: 'btn-sm'},
            {extend: 'print',className: 'btn-sm'}
        ],
        "autoWidth": false
    });
});

Template.patients.helpers({

    // TODO: this should be edited
    // we are using subscription patients.
    patients: function() {
        return Meteor.users.find({$and: [
            {doctor: {$exists: true}},
            {doctor: {$ne: null}}
        ]});
    },
    currPatient: function() {
        return Meteor.users.findOne({_id: Template.instance().patientId.get()});
    },
    showForm: function() {
        return Template.instance().showForm.get()
    }
});

Template.patients.events({
    'click #newPatient': function(event, template) {
        console.log('clicked add new athlete');
        if (template.showForm.get()) {
            template.showForm.set(false)
        } else {
            template.showForm.set(true)
        }
    },
    'submit #editPatientForm': function(event, template) {
        event.preventDefault();
        var form = event.target;
        var persodata = {
            fname: form.firstName ? form.firstName.value : '',
            lname: form.lastName ? form.lastName.value : '',
            nhsNumber: form.nhsNumber ? form.nhsNumber.value : '',
            dob: form.birthday ? form.birthday.value : '',
            address: form.address ? form.address.value : '',
            patientId: template.patientId.get(),
        }

        Meteor.call('createOrUpdateProviderProfile', persodata, function(err, data) {
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
        });
        $('#editPatient').modal('hide');
    },
    'click .remove-patient': function(event, template) {
        var patientId = $(event.currentTarget).data('id');
        swal({
            title: 'Are you sure?',
            text: 'Please confirm deleting your athlete',
            showCancelButton: true,
            allowEscapeKey: false,
            closeOnCancel: true,
            confirmButtonColor: "#DD6B55",
            closeOnConfirm: true,
            type: 'warning'
        }, function() {
            console.log('delete confirmed');
            Meteor.call('removePatient', patientId, function(err, result) {
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
            });
        });
    }

});
