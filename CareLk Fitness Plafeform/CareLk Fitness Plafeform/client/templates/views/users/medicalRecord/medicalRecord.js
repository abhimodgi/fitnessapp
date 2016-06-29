Template.medicalRecord.onCreated(function() {
    var self = this;
    self.subscribe('medicalRecords');
    
});

Template.medicalRecord.onRendered(function() {
    console.log('medicalRecord rendered');
    // var chartData = MedicalRecords.findOne({}).vitals.slice(-12);
    Meteor.setTimeout(function() { 
        if (MedicalRecords.findOne().vitals.length < 12) {
            var chartData = MedicalRecords.findOne().vitals;
        } else {
            var chartData = MedicalRecords.findOne().vitals.slice(-12);
        }
        var labels = [],
            weightData = [],
            heightData = [],
            bmiData = [],
            bpData = [],
            pulseData = [],
            respData = [];
        for (var i = 0; i < chartData.length; i++) {
            var vital = chartData[i];
            console.log(vital);
            labels.push(moment(vital.date).format('MMM Do'));
            weightData.push(vital.weight);
            heightData.push(vital.height);
            bmiData.push(vital.bmi);
            bpData.push(vital.bp);
            pulseData.push(vital.pulse);
            respData.push(vital.respiration);
            console.log(labels);
        }
        var vitalData = {
            labels: labels,
            datasets: [
                {
                    label: "Weight",
                    fillColor: "rgba(210, 105, 30, 0.2)",
                    strokeColor: "rgba(210, 105, 30, 1)",
                    pointColor: "rgba(210, 105, 30, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(210, 105, 30, 1)",
                    data: weightData
                },
                {
                    label: "Height",
                    fillColor: "rgba(255, 208, 0, 0.2)",
                    strokeColor: "rgba(255, 208, 0, 1)",
                    pointColor: "rgba(255, 208, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255, 208, 0, 1)",
                    data: heightData
                },
                {
                    label: "BMI",
                    fillColor: "rgba(205, 17, 17, 0.7)",
                    strokeColor: "rgba(205, 17, 17, 1)",
                    pointColor: "rgba(205, 17, 17, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(205, 17, 17, 1)",
                    data: bmiData
                },
                {
                    label: "BP",
                    fillColor: "rgba(240, 128, 231, 0.2)",
                    strokeColor: "rgba(240, 128, 231, 1)",
                    pointColor: "rgba(240, 128, 231, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(240, 128, 231, 1)",
                    data: bpData
                },
                {
                    label: "Pulse",
                    fillColor: "rgba(136, 128, 240, 0.2)",
                    strokeColor: "rgba(136, 128, 240, 1)",
                    pointColor: "rgba(136, 128, 240, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(136, 128, 240, 1)",
                    data: pulseData
                },
                {
                    label: "Respiration",
                    fillColor: "rgba(95, 198, 221, 0.3)",
                    strokeColor: "rgba(95, 198, 221, 1)",
                    pointColor: "rgba(95, 198, 221, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(95, 198, 221, 1)",
                    data: respData
                }
            ]
        };
        var vitalOptions = {
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


        var ctx = document.getElementById("vitalOptions").getContext("2d");
        var billsChart = new Chart(ctx).Line(vitalData, vitalOptions);
    });
    }, 0);


Template.medicalRecord.helpers({
    'medicalRecord': function() {
        return MedicalRecords.findOne({});
    }
});
