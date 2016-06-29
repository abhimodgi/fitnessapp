Template.records.onRendered(function() {
   
    $('#datetime').editable({
        placement: 'right',
        combodate: {
            firstItem: 'name'
        }
    });
    /*
    $(document).on('click', '#saveRecord', function() {
       //alert('save record'); 
       $('#addRecordModal').modal('hide');
    });*/
    
    // ClockPicker
    $('.clockpicker').clockpicker({autoclose: true});
    /*
    $('#addRecordModal').on('shown.bs.modal', function (e) {    
        // ClockPicker
        console.log("shown.bs.modal");
        //$('.clockpicker').clockpicker({autoclose: true});
        
        function show_popup() {
        console.log("show_popup");
            $('.clockpicker').clockpicker({autoclose: true});
        };
        window.setTimeout(show_popup, 1000); // 1 seconds  
    })*/

    // DateTimePicker
    $('#datetimepicker1').datetimepicker();
    
    $("#distance").TouchSpin({
        postfix: 'mi/km'
    });

    
    $("#heartreate").TouchSpin({
        postfix: 'bpm'
    });

    
    $("#heartreate").TouchSpin({
        postfix: 'bpm'
    });

    
    $("#calories").TouchSpin({
        postfix: 'cal'
    });
    
    // ChartJS
    
    // Options for Sharp Line chart
    var sharpLineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(98,203,49,0.5)",
                strokeColor: "rgba(98,203,49,0.7)",
                pointColor: "rgba(98,203,49,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(98,203,49,1)",
                data: [1, 50, 90, 19, 54, 27, 54]
            }
        ]
    };
    var sharpLineOptions = {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : false,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 1,
        datasetFill : true,
        responsive: true
    };
    
    var ctx = document.getElementById("sharpLineOptions").getContext("2d");
    var myNewChart = new Chart(ctx).Line(sharpLineData, sharpLineOptions);
    
    // 
        var radarData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(98,203,49,0.2)",
                strokeColor: "rgba(98,203,49,1)",
                pointColor: "rgba(98,203,49,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "#62cb31",
                data: [65, 59, 66, 45, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(98,203,49,0.4)",
                strokeColor: "rgba(98,203,49,1)",
                pointColor: "rgba(98,203,49,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "#62cb31",
                data: [28, 12, 40, 19, 63, 27, 87]
            }
        ]
    };

    var radarOptions = {
        scaleShowLine : true,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "rgba(0,0,0,.1)",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#666",
        pointDot : true,
        pointDotRadius : 2,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 1,
        datasetFill : true
    };

    var ctx = document.getElementById("radarChart").getContext("2d");
    var myNewChart = new Chart(ctx).Radar(radarData, radarOptions);


    // Forms
    
    
    $("#addrecord").validate({
        rules: {
            datetimepicker1: {
                required: true,
                url: false
            },
        },
        messages: {
            datetimepicker1: {
                required: "The date time is required"
            },
        },
        cancelSubmit: function() {
            alert('cancel submit');
        },
        submitHandler: function(form) {
            event.preventDefault();
            console.log('submitHandler');
            $('#addRecordModal').modal('hide');
        }
        
    });

});