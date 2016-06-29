Template.dietPlan.onRendered(function() {
    $('.datetimepicker').datetimepicker();
    Meteor.setTimeout(function() {

        Tracker.autorun(function() {

            function logArrayElements(element, index, array) {
            }
            var chartData = Meteor.user().dietPlans;
            var labels = [],
                calories = [];

            for (var i = 0; i < chartData.length; i++) {
                var mealPlan = chartData[i];
                //  var showDates = ["Started date: "+biodata.startDate, "Ended date: "+biodata.endDate].forEach(logArrayElements);
                var allDates = mealPlan.day;
                labels.push(allDates);
                calories.push(mealPlan.mealValue);
            }
            var caloriesData = {
                labels: labels,
                datasets: [{
                        label: "Calories",
                        fillColor: "rgba(210, 105, 30, 0.2)",
                        strokeColor: "rgba(210, 105, 30, 1)",
                        pointColor: "rgba(210, 105, 30, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(210, 105, 30, 1)",
                        data: calories
                    }

                ]
            };

            var caloriesOptions = {
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                bezierCurve: true,
                bezierCurveTension: 0.4,
                pointDot: true,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: true,
                datasetStrokeWidth: 1,
                datasetFill: true,
                responsive: true
            };

            var ctx = document.getElementById("caloriesOptions").getContext("2d");
            var billsChart = new Chart(ctx).Line(caloriesData, caloriesOptions);

        });
        // Initialize datatable
        $('#dietPlans').dataTable({
            dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            buttons: [{
                extend: 'copy',
                className: 'btn-sm',
                exportOptions: {
                    modifier: {
                        selected: true
                    }
                }
            }, {
                extend: 'csv',
                title: 'Health Problems',
                className: 'btn-sm',
                exportOptions: {
                    modifier: {
                        selected: true
                    }
                }
            }, {
                extend: 'pdf',
                title: 'Health Problems',
                className: 'btn-sm',
                exportOptions: {
                    modifier: {
                        selected: true
                    }
                }
            }]
        });

    }, 300);

    $("#addDietPlan").validate({
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
            var dietPlan = {
                id: 0,
                // name: form["name"].value,
                category: $("#categoryselect").find('option:selected').val(),
                meal: $("#mealselect").find('option:selected').text(),
                mealValue: $("#mealselect").find('option:selected').val(),
                // day: $("#dayselect").find('option:selected').val()
                day: moment().format("YYYY-MM-DD HH:mm")
            };

            Meteor.call('createOrUpdateDietPlans', dietPlan, function(err, data) {

                console.log('result createOrUpdateDietPlans ' + data.status);
                if (!data || !data.status) {
                    Command: toastr["error"]("Create meal failed", data.err)
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
                else {
                    console.log('update ok ' + data.status);
                    Command: toastr["success"]("Create meal succeeded", "")
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

                }
            });
        }
    });

    $(document).on('click', 'button.deleteMeal', function() {

        var dietPlan = {
            id: $(this).data('id')
        };

        console.log(dietPlan.id);

        Meteor.call('removeDietPlan', dietPlan, function(err, data) {
            if (!data || !data.status) {
                Command: toastr["error"]("Remove meal failed", data.err)
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
            else {
                Command: toastr["success"]("Remove meal succeeded", "")
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

    // initEditable();

});

Template.dietPlan.helpers({
});

function initEditable() {
    'use strict';
    if (dietPlansTable) {
        dietPlansTable.fnDestroy();
        dietPlansTable = null;
    }
    /*
     $('.one').editable({
        type: 'text',
        pk: 1,
        name: 'name',
        title: 'Enter name',
        error: function(response, newValue) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
    });

    $('.two').editable({
        name: 'category',
        source: [
            {value: 'Strength', text: 'Strength'},
            {value: 'Cardio', text: 'Cardio'}
        ],
        display: function(value, sourceData) {
            var colors = {"": "gray", 1: "green", 2: "blue"},
                elem = $.grep(sourceData, function(o){return o.value == value;});
            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        },
        error: function(response, newValue) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
    });*/

    // Initialize datatable
    dietPlansTable = $('#dietPlans').dataTable({
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        buttons: [
            { extend: 'copy', className: 'btn-sm' },
            { extend: 'csv', title: 'Diet plans file', className: 'btn-sm' },
            { extend: 'pdf', title: 'Diet plans file', className: 'btn-sm' },
            { extend: 'print', className: 'btn-sm' }
        ],
        "autoWidth": false,
        "columns": [
            { "width": "40%" },
            { "width": "40%" },
            { "width": "20%" },
        ]
    });

    $('#dietPlans .editable').on('hidden', function(e, reason) {
        e.preventDefault();

        console.log('edit ' + reason);
        if (reason === 'save' || reason === 'nochange') {
            var $next = $(this).closest('tr').next().find('.editable');
            if ($('#autoopen').is(':checked')) {
                setTimeout(function() {
                    $next.editable('show');
                }, 300);
            } else {
                console.log('save');

                if (reason === 'save') {
                    var dietPlan = {
                        id: $(this).data('id'),
                        // name:  $(this).parent().parent().find("td:first").text(),
                        meal: $(this).parent().parent().find("td:first").text(),
                        category: $(this).parent().parent().find("td:nth-child(2)").text(),
                        mealValue: $(this).parent().parent().find("td:nth-child(3)").val(),
                        day: $(this).parent().parent().find("td:nth-child(4)").text()
                    };
                    console.log('id ' + dietPlan.id + ' - name ' + dietPlan.meal + ' - category ' + dietPlan.category);
                    var key = $(this).attr('name');
                    console.log('name ' + $(this).attr('name'));
                    var original = $(this).data('value');
                    console.log('original value ' + original);
                    var result = saveDietPlan(dietPlan);
                    //  if (!result)
                    //  {
                    //      $(this).text(original);
                    //  }
                    var newDietPlan = $(this).editable('getValue', true);
                    console.log('new value ' + newDietPlan);
                    $(this).attr('data-value', newDietPlan);
                    $(this).text(newDietPlan);
                    $next.focus();
                }

            }
        }
    });
}

function saveDietPlan(dietPlan) {
    'use strict';

    if (dietPlan == undefined) {
        return;
    }

    Meteor.call("createOrUpdateDietPlans", dietPlan, function(err, data) {
        if (!data || !data.status) {
            Command: toastr["error"]("Edit meal failed", data.err)
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
        else {
            Command: toastr["success"]("Edit meal succeeded", "")
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
