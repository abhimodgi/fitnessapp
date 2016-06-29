
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});


// More info: https://github.com/EventedMind/iron-router/issues/3
AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Router.go('/verified');
        });
    }
});

var requireLogin = function() {
    console.log('requireLogin ');

    /* Returns true if
        1. user login
        2. user session not expired
        3. user email verified
    */
  if (!Meteor.userId()) {
      console.log('accessDenied ');
    this.render('accessDenied');
    this.layout('landingLayout');
  }
  else
  {
    var user = Meteor.user();
    var dt = moment();
      var isOK = true;


      if (user !== undefined)
      {
        if(user.emails !== undefined && !user.emails[0].verified)
        {
            isOK = false;
        }
            else if (user.persodata !== null || user.persodata !== undefined)
            {

                var lastlogin = moment(user.persodata.lastlogin);
                console.log('lastlogin ' + lastlogin);
                var diffDt = dt.diff(lastlogin, 'minutes');
                console.log('requireLogin ' + diffDt);
                if (diffDt>60)
                {
                    isOK = false;
                }
            }
      }

        if (isOK)
        {
            setTimeout(function()
            {
                $('.splash').css('display', 'none')
            },500);
            this.next();
        }
        else
        {

            swal({ title: 'Session expired',
                    text: 'Sorry ' + user.username + ', your session has expired. Please log in.',
                    allowEscapeKey:false,
                    closeOnCancel:false,
                    closeOnConfirm: true,
                    type:'info'
                },
                function() {

                                Meteor.logout();
                                Router.go('login');
                }
            );
        }
  }
};

Router.route('/categories', {name: 'categoriesList'});

Router.route('/appointments', function () {
    this.render('appointments');
});

Router.map(function () {

    this.route('verifyEmail', {
        controller: 'AccountController',
        path: '/verify-email/:token',
        action: 'verifyEmail'
    });
/*
    this.route('verified', {
        path: '/verified',
        template: 'verified'
    });

    this.route('checkemail', {
        path: '/checkemail',
        template: 'checkemail'
    });*/
    /*
     this.route('resetpassword', {
        path: '/reset-password/:resetPasswordToken',
        onBeforeAction: function() {
            Accounts._resetPasswordToken = this.params.resetPasswordToken;
            this.next();
        },
        template: 'blankLayout'
     });*/
});

Router.route('/checkemail', function () {

     this.render('checkemail');
        this.layout('blankLayout');
});

Router.route('/verified', function () {

     this.render('verified');
        this.layout('blankLayout');
});


//
// Dashboard route
//

Router.route('/', function () {

        console.log('route /');
    var user = Meteor.user();
    var dt = moment();
    if (!Meteor.userId() || user == undefined) {
        console.log('route home');
     this.render('home');
        this.layout('notlogged');
    }else if (user && user.persodata.identity == 1) {
        console.log('route athlete');
      Router.go('/athlete');
    this.layout('layout');
    }else if (user && user.persodata.identity == 2) {
        console.log('route coach');
      Router.go('/coach');
    this.layout('layout');
    }

        console.log('route layout');
    // Router.go('/dashboard');
}, {name:'home'});

Router.route('/about', function() {
     this.render('about');
        this.layout('notlogged');
}, {name:'about'});

Router.route('/contact', function() {
     this.render('contact');
        this.layout('notlogged');
}, {name:'contact'});

Router.route('/services', function() {
     this.render('services');
        this.layout('notlogged');
}, {name:'services'});

Router.route('/athlete', function () {
    var user = Meteor.user();
if (user && user.persodata.identity == 1) {
        this.render('patients');
}

}, { name: 'patients' });

Router.route('/patient/:_id', function () {

        this.render('patient', {
            data: function () {
                return Meteor.users.findOne({ _id: this.params._id });
            }
        })



}, { name: 'patient' });

// Router.route('/doctor', function () {
//     var user = Meteor.user();
//     // user should be a doctor to access the patients list
//     if (Meteor.userId()) {
//         this.render('doctor');
//     }
// });

Router.route('/coach', function () {
    var user = Meteor.user();
if (user && user.persodata.identity == 2) {
        this.render('coach');
}

});

// Router.route('/coach/:_id', function () {
//
//         this.render('coach', {
//             data: function () {
//                 return Meteor.users.findOne({ _id: this.params._id });
//             }
//         })
//
//
//
// }, { name: 'coach' });



Router.route('/exercises', {
    template: 'calendar',
    name: 'calendar',
    // onBeforeAction: function () {
    //     var user = Meteor.user();
    //     if (user != null && user != undefined && user.persodata != null && user.persodata != undefined && user.persodata.identity == 1) {
    //         if (user.doctor == undefined || user.doctor == null) {
    //             Router.go('login');
    //         }
    //     }
    //     this.next();
    // }
});


Router.route('/dashboard', function () {

     this.render('dashboard');
        this.layout('layout');
});

Router.route('/forgotpassword', function () {

     this.render('ForgotPassword');
        this.layout('blankLayout');
}),
{
    name: 'forgotpassword'
};

Router.route('/reset-password/:token',
{
    name: 'resetpassword',
    layoutTemplate: 'blankLayout',
    onBeforeAction: function() {
        console.log('/reset-password/:resetPasswordToken '+ this.params.token);
            Accounts._resetPasswordToken = this.params.token;
            Session.set('resetPassword', Accounts._resetPasswordToken);
            this.next();
        }
});
/*
Router.onBeforeAction(IR_BeforeHooks.isLoggedIn, {only: ['resetpassword']});
*/

//
// Settings
//

Router.route('/settings', function () {
    this.render('settings');
});

Router.route('/profile', function () {
    this.render('profile');
});

//
// Workouts
//
Router.route('/workouts', function () {
    this.render('workouts');
});

//
// Records
//
Router.route('/records', function () {
    this.render('records');
});

Router.route('/dietPlan', function () {
    this.render('dietPlan');
});

Router.route('/biodata', function () {
    this.render('biodata');
});


//
// Common views route
//

Router.route('/login', function () {
    this.render('login');
    this.layout('blankLayout');
},
{
    name:'login'
});

Router.route('/termsOfUse', function () {
    this.render('termsOfUse');
    this.layout('blankLayout');
},
{
    name:'termsOfUse'
});
Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout');
},
{
    name:'register'
});
Router.route('/errorOne', function () {
    this.render('errorOne');
    this.layout('blankLayout');
});
Router.route('/errorTwo', function () {
    this.render('errorTwo');
    this.layout('blankLayout');
});

//
// Widgets route
//

Router.route('/widgets', function () {
    this.render('widgets');
});

//
// Global - Remove splash screen after after rendered layout
//

Router.onBeforeAction(requireLogin, {except: ['resetpassword', 'forgotpassword', 'home', 'about', 'services', 'contact', 'verified', 'checkemail', 'login', 'register', 'verifyEmail', 'termsOfUse']});
