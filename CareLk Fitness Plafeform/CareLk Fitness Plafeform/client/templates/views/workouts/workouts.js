
var workoutsTable;



Template.workouts.onCreated(function() {
var self = this;
self.subscribe('workouts');

});


Template.workouts.onRendered(function(){

    $("#addworkout").validate({
        rules: {
            name: {
                required: true,
                url: false,
                minlength: 3
            },
        },
        messages: {
            name: {
                required: "The name is required",
                minlength: "This is custom message for min length"
            },
        },
        cancelSubmit: function() {
            alert('cancel submit');
        },
        submitHandler: function(form) {
            event.preventDefault();
            var workout = {
                id:0,
                name: form["name"].value,
                category: $("#categoryselect").find('option:selected').val()
            };

            Meteor.call('createOrUpdateWorkouts', workout,  function(err, data) {

                console.log('result createOrUpdateWorkouts ' + data.status);
                if (!data || !data.status) {
                    Command: toastr["error"]("Create workout failed", data.err)
                    toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                    }
                }
                else{
                     console.log('update ok ' + data.status);
                      Command: toastr["success"]("Create workout succeeded","")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }  ;
                }
            });
        }
    });


    $(document).on('click', 'button.delete', function() {

        var workout = {
            id: $(this).data('id')
        };

        console.log(workout.id);

        Meteor.call('removeWorkout', workout, function(err, data) {
            if (!data || !data.status) {
                Command: toastr["error"]("Remove workout failed", data.err)
                toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                };
                return false;
            }
            else{
                Command: toastr["success"]("Remove workout succeeded","")
                toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                };
                return true;
            }

        });
    });


    // Turn to inline mode
    $.fn.editable.defaults.mode = 'inline';

    // Defaults
    $.fn.editable.defaults.url = '#';

   initEditable();

});


Template.workouts.helpers({
  workouts: function() {
    var workouts = Meteor.user().workouts;
    return workouts;
  }
});


function initEditable() {
    'use strict';

    if (workoutsTable)
    {
      workoutsTable.fnDestroy();
      workoutsTable = null;
    }

    // Initialize datatable
    workoutsTable =  $('#workouts').dataTable({
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        buttons: [
            {extend: 'copy',className: 'btn-sm'},
            {extend: 'csv',title: 'WorkoutsFile', className: 'btn-sm'},
            {extend: 'pdf', title: 'WorkoutsFile', className: 'btn-sm'},
            {extend: 'print',className: 'btn-sm'}
        ],
        "autoWidth": false,
        "columns": [
        { "width": "40%" },
        { "width": "40%" },
        { "width": "20%" },
        ]
    });

    $('#workouts .editable').on('hidden', function(e, reason){
        e.preventDefault();

        console.log('edit ' + reason);
        if(reason === 'save' || reason === 'nochange') {
            var $next = $(this).closest('tr').next().find('.editable');
            if($('#autoopen').is(':checked')) {
                setTimeout(function() {
                    $next.editable('show');
                }, 300);
            } else {
                console.log('save');

                if (reason === 'save')
                {
                     var workout = {
                         id: $(this).data('id'),
                        name:  $(this).parent().parent().find("td:first").text(),
                        category: $(this).parent().parent().find("td:nth-child(2)").text(),
                        };
                     console.log('id ' + workout.id + ' - name ' + workout.name + ' - category ' + workout.category);
                     var key = $(this).attr('name');
                     console.log('name ' + $(this).attr('name'));
                     var original = $(this).data('value');
                     console.log('original value ' + original);
                     var result = saveWorkout(workout);
                     if (!result)
                     {
                         $(this).text(original);
                     }
                     var newValue = $(this).editable('getValue', true);
                     console.log('new value ' + newValue);
                     $(this).attr('data-value', newValue);
                     $(this).text(newValue);
                     $next.focus();
                }

            }
        }
    });
}

function saveWorkout(workout) {
    'use strict';

    if (workout == undefined)
    {
        return;
    }

    Meteor.call("createOrUpdateWorkouts", workout, function(err, data) {
        if (!data || !data.status) {
            Command: toastr["error"]("Edit workout failed", data.err)
            toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            };
            return false;
        }
        else{
            Command: toastr["success"]("Edit workout succeeded","")
            toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            };
            return true;
        }
    });
}
