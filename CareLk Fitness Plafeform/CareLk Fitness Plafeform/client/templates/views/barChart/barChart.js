

Template.barChart.onCreated(function() {
    var self = this;
    self.subscribe('appointments');

});


Template.barChart.onRendered(function() {
    console.log('chart rendered');
    // var chartData = MedicalRecords.findOne({}).vitals.slice(-12);
    Meteor.setTimeout(function() {
        // if (Appointments.findOne().miles.length < 12) {
        //     var chartData = Appointments.findOne().miles;
        // } else {
        //     var chartData = Appointments.findOne().miles.slice(-12);
        // }
        var chartData = Appointments.findOne().miles,
        chartData2 = Appointments.findOne().mpm;
        var labels = [],
            milesData = [],
            mpmData = [];
            // bmiData = [],
            // bpData = [],
            // pulseData = [],
            // respData = [];
        for (var i = 0; i < chartData.length && i < chartData2.length; i++) {
            var miles = chartData[i];
            var mpm = chartData2[i];
            console.log("Miles: "+miles);
            console.log("Mpm: "+mpm);
            labels.push(moment(miles.date).format('MMM Do'));
            milesData.push(miles);
            mpmData.push(mpm);
            // bmiData.push(vital.bmi);
            // bpData.push(vital.bp);
            // pulseData.push(vital.pulse);
            // respData.push(vital.respiration);
            console.log("Labels: "+labels);
        }
        var vitalData = {
            labels: labels,
            datasets: [
                {
                    label: "Miles",
                    fillColor: "rgba(210, 105, 30, 0.2)",
                    strokeColor: "rgba(210, 105, 30, 1)",
                    pointColor: "rgba(210, 105, 30, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(210, 105, 30, 1)",
                    data: milesData
                },
                {
                    label: "mpm",
                    fillColor: "rgba(255, 208, 0, 0.2)",
                    strokeColor: "rgba(255, 208, 0, 1)",
                    pointColor: "rgba(255, 208, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 208, 0, 1)",
                    data: mpmData
                }
                // {
                //     label: "BMI",
                //     fillColor: "rgba(205, 17, 17, 0.7)",
                //     strokeColor: "rgba(205, 17, 17, 1)",
                //     pointColor: "rgba(205, 17, 17, 1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(205, 17, 17, 1)",
                //     data: bmiData
                // },
                // {
                //     label: "BP",
                //     fillColor: "rgba(240, 128, 231, 0.2)",
                //     strokeColor: "rgba(240, 128, 231, 1)",
                //     pointColor: "rgba(240, 128, 231, 1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(240, 128, 231, 1)",
                //     data: bpData
                // },
                // {
                //     label: "Pulse",
                //     fillColor: "rgba(136, 128, 240, 0.2)",
                //     strokeColor: "rgba(136, 128, 240, 1)",
                //     pointColor: "rgba(136, 128, 240, 1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(136, 128, 240, 1)",
                //     data: pulseData
                // },
                // {
                //     label: "Respiration",
                //     fillColor: "rgba(95, 198, 221, 0.3)",
                //     strokeColor: "rgba(95, 198, 221, 1)",
                //     pointColor: "rgba(95, 198, 221, 1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(95, 198, 221, 1)",
                //     data: respData
                // }
            ]
        };
        var vitalOptions = {
                scaleBeginAtZero : true,
                scaleShowGridLines : true,
                scaleGridLineColor : "rgba(0,0,0,.05)",
                scaleGridLineWidth : 1,
                barShowStroke : true,
                barStrokeWidth : 1,
                barValueSpacing : 5,
                barDatasetSpacing : 1,
                responsive:true
        };


        var ctx = document.getElementById("vitalOptions").getContext("2d");
        var billsChart = new Chart(ctx).Bar(vitalData, vitalOptions);
        var chart = function(billsChart){
          return billsChart;
        }
        Deps.autorun(function(){
          chart();
        });
    });
    }, 0);



// Template.barChart.helpers({
//     'appointment': function() {
        // return Appointments.findOne({});
//     }
// });
