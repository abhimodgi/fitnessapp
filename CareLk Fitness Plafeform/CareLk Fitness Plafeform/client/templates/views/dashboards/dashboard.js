Template.dashboard.onRendered(function(){

  setTimeout(function()
    {
    console.log('hide splash');
        $('.splash').css('display', 'none');

    },500);
    // Flot charts data and options
 //   var data1 = [ [0, 55], [1, 48], [2, 40], [3, 36], [4, 40], [5, 60], [6, 50], [7, 51] ];
 //   var data2 = [ [0, 56], [1, 49], [2, 41], [3, 38], [4, 46], [5, 67], [6, 57], [7, 59] ];
/*
    var chartUsersOptions = {
        series: {
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            }
        },
        grid: {
            tickColor: "#f0f0f0",
            borderWidth: 1,
            borderColor: 'f0f0f0',
            color: '#6a6c6f'
        },
        colors: [ "#62cb31", "#efefef"]
    };
*/
  //  $.plot($("#flot-line-chart"), [data1, data2], chartUsersOptions);
/*
    // Flot charts 2 data and options
    var chartIncomeData = [
        {
            label: "line",
            data: [ [1, 10], [2, 26], [3, 16], [4, 36], [5, 32], [6, 51] ]
        }
    ];

    var chartIncomeOptions = {
        series: {
            lines: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: "#64cc34"

            }
        },
        colors: ["#62cb31"],
        grid: {
            show: false
        },
        legend: {
            show: false
        }
    };

    $.plot($("#flot-income-chart"), chartIncomeData, chartIncomeOptions);
*/

    // Pie charts data and options used in many views
/*
    $("span.pie").peity("pie", {
        fill: ["#62cb31", "#edf0f5"]
    });
*/
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

});


Template.dashboard.helpers({
  user: function() {
      var puser =Meteor.user();

          console.log('dashboard login token puser ' + puser.persodata.token);
          console.log('dashboard id puser ' + puser.persodata.id);
          console.log('dashboard _id puser ' + puser._id);
          console.log('dashboard identity puser ' + puser.persodata.identity);
     return puser;
  },
  fname: function() {
    // var firstname = 'Yarik';
    var firstname = Meteor.user().persodata.fname;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return firstname;
    }
  },
  lname: function() {
    // var lastname = 'Rakov';
    var lastname = Meteor.user().persodata.lname;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return lastname;
    }
  },
  email: function() {
    var email = Meteor.user().persodata.email;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return email;
    }
  },
  city: function() {
    var city = Meteor.user().persodata.city;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return city;
    }
  },
  postCode: function() {
    var postCode = Meteor.user().persodata.postalCode;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return postCode;
    }
  },
  weight: function() {
    var weight = Meteor.user().persodata.weight;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return String(weight);
    }
  },
  height: function() {
    var height = Meteor.user().persodata.height;
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return String(height);
    }
  },
  bmi: function() {
    var bmi = Meteor.user().persodata.weight / Math.pow(Meteor.user().persodata.height, 2);
    bmi = bmi.toFixed(5);
    if (Meteor.user() != null && Meteor.user() != undefined) {
      return String(bmi);
    }
  }
});
