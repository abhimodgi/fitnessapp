if (Meteor.isClient) {
    Meteor.startup(function() {
       $('html').attr('lang', 'en');

    //    AdminConfig = {
    //      // ...
    //
    //      dashboard: {
    //        homeUrl: '/dashboard',
    //        widgets: [
    //          {
    //            template: 'adminCollectionWidget',
    //            data: {
    //              collection: 'Posts',
    //              class: 'col-lg-3 col-xs-6'
    //            }
    //          },
    //          {
    //            template: 'adminUserWidget',
    //            data: {
    //              class: 'col-lg-3 col-xs-6'
    //            }
    //          }
    //        ]
    //      }
    //    };
     });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
