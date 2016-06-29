Template.calendar.onCreated(function() {
    var self = this;
});

Template.calendar.onRendered(function() {
    var self = this;
  Tracker.autorun(function(){
    Meteor.setTimeout(function() {

        $('#calendar').fullCalendar('refetchEvents');

        $('#appointmentsTable').dataTable({
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],

        buttons: [
            {extend: 'copy',className: 'btn-sm'},
            {extend: 'csv',title: 'Appointments', className: 'btn-sm'},
            {extend: 'pdf', title: 'Appointments', className: 'btn-sm'}
        ]


    });
    // var data = table.buttons.exportData();
  }, 300);
  });
    // c3.generate({
    //     bindto: '#stocked',
    //     data:{
    //         columns: [
    //             ['Cardio', 30,200,100,400,150,250],
    //             ['Strength', 50,20,10,40,15,25]
    //         ],
    //         colors:{
    //             data1: '#62cb31',
    //             data2: '#BABABA'
    //         },
    //         type: 'bar',
    //         groups: [
    //             ['data1', 'data2']
    //         ]
    //     }
    // });
});

Template.calendar.helpers({

    options: function() {
        return {
            id: 'calendar',
            defaultView: 'agendaWeek',
            timezone: 'local',
            editable: false,
            selectable: true,
            allDaySlot: false,
            events: function(start, end, timezone, callback) {
                //var d = new Date();
              Tracker.autorun(function(){
                var getAppointments = Appointments.find(),
                    eventsArray = [];
                eventsArray = getAppointments.fetch().map(function(appObj) {
                    var event = {};
                    event['id'] = appObj._id;
                    event['title'] = appObj.healthIssues+': '+appObj.miles+' mi\n'+'('+appObj.mpm+' mpm)\n\n'+'Total Time: '+new Date(appObj.totalTimeMpm*60000-7200000).getHours()+':'+new Date(appObj.totalTimeMpm*60000).getMinutes();
                    event['start'] = appObj.startDate;
                    event['end'] = appObj.endDate;
                    event['status'] = appObj.status;
                    return event;
                });
                callback(eventsArray);
              });
            },
            select: function(start, end, allDay) {
              Tracker.autorun(function(){
                Modal.show('reqNewExerciseModal');
                $('#dateInfo').html('Exercise on: ' +
                start.format('MMMM Do YYYY, h:mm:ss a') + '-' +
                end.format('h:mm:ss a'));
                $('#appStartDate').val(start);
                $('#appEndDate').val(end);
              });
            },
            eventClick: function(event, jsEvent, view) {
              Tracker.autorun(function(){
                if (event.status && event.status != 'canceled') {
                    Modal.show('editAppointmentModal', function() {
                        return Appointments.findOne({_id: event.id});
                    })
                } else if (event.status && event.status === 'canceled') {
                    swal({
                        title: 'Appointment canceled!',
                        text: 'This appointment has been canceled.',
                        allowEscapeKey: false,
                        closeOnCancel: false,
                        closeOnConfirm: true,
                        type: 'warning'
                    });
                } else {
                    swal({
                        title: 'Doctor is busy',
                        text: 'Someone has already scheduled appointment.',
                        allowEscapeKey: false,
                        closeOnCancel: false,
                        closeOnConfirm: true,
                        type: 'info'
                    });
                }
              });
            },
            eventRender: function(event, element, view) {
              Tracker.autorun(function(){
                if (event.status === 'pending') {
                    element.css('background', '#ff9800');
                } else if (event.status === 'confirmed') {
                    element.css('background', '#388e3c')
                }
              });
            },
            eventBackgroundColor: '#d32f2f',
        }
    },
    appointments: function() {
      Tracker.autorun(function(){
        if (Meteor.userId()) {
            return Appointments.find({'patient.patientId': Meteor.userId()});
        }
      });
    }


});

Template.calendar.events({

});
