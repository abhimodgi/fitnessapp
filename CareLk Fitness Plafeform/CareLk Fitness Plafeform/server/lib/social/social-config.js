
Meteor.startup(function () {

 ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 /* CareLk on AZURE */
/*
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '813797702082221',
    secret: '8952106707decd31306c7f6b1640f6fe'
});*/

/* CareLk Dev on Azure */

// ServiceConfiguration.configurations.insert({
//     service: 'facebook',
//     appId: '816897561772235',
//     secret: 'b2a7f0632cd7131add2e3d3876af374a'
// });

// ServiceConfiguration.configurations.insert({
//     service: 'facebook',
//     appId: '1120339651345277',
//     secret: '5dbb3f0e26b4783b10112e323ce0905d'
// });

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '813797702082221', //'816897561772235',
    secret: '8952106707decd31306c7f6b1640f6fe', //'b2a7f0632cd7131add2e3d3876af374a'
});


ServiceConfiguration.configurations.remove({
  service: 'google'
});
ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: '28290429215-iouu7026ig5lbk0sq9q2dtn0smncsd93.apps.googleusercontent.com',
  secret: 'NQ-aRUvv2RcznKclwqczQkZ-',

});

// ServiceConfiguration.configurations.insert({
//   service: 'google',
//   clientId: '354083797304-f5nclacgdicgvo7uteqr25dnc6bump9k.apps.googleusercontent.com',
//   secret: 'GbIZMSdYGEZGSd2ObBzj366i',
//
// });

});
