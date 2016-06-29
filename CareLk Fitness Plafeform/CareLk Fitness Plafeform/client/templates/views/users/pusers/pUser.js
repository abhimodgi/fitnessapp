Template.pUser.onCreated(function() {
    var self = this;
});

Template.pUser.onRendered(function(){

    getPatientProfile();

    //     errorPlacement: function(error, element) {
    //         $( element )
    //             .closest( "form" )
    //             .find( "label[for='" + element.attr( "id" ) + "']" )
    //             .append( error );
    //     },
    //     errorElement: "span",
    // });


    $('#private-healthcare').validate({
        rules: {

        },
        messages: {

        },
        submitHandler: function(form) {
            event.preventDefault();
            submitPrivateHealthcareForm(form);
        }
    });
});

Template.pUser.helpers({
    user: function() {
        var user = Meteor.user();
        return user;
    },
    doctor: function() {
        return Meteor.users.findOne({_id: Meteor.user().doctor.doctorId});
    }

});

function getPatientProfile()
{
    console.log('call getpersodata');

    Meteor.call('getProfile', function(err, data) {
        if(data.status == false) {
                //$( '#form-error' ).text();
                $( '#form-error' ).html( 'Error happened.' );
                $( '#form-error' ).show();
        }
        else {
            if (data.status)
            {
                var profile = data.profile;
                var email = profile.email;

                $('#username').val(profile.username);
                $('#firstName').val(profile.fname);
                //$('#maidenname').val(profile.maidenname);
                $('#lastName').val(profile.lname);
                //$('#jobtitle').val(profile.jobtitle);
                if (profile.gender == "M" || profile.gender == "male")
                {
                $('#male').attr('checked', 'checked');
                }
                else
                {
                $('#female').attr('checked', 'checked');
                }
                $('#mobileNumber').val(profile.mobileNumber);
                $('#homeNumber').val(profile.homeNumber);
                $('#address').val(profile.address);
                $('#city').val(profile.city);
                $('#postalCode').val(profile.postalCode);
                $('#nhsNumber').val(profile.nhsNumber);
                $('#emergencyName').val(profile.emergencyName);
                $('#emergencyNumber').val(profile.emergencyNumber);
                $('#organizationName').val(profile.organizationName);
                $('#regNumber').val(profile.registrationNumber);
                $('#hcAddress').val(profile.hcAddress);
                $('#hcPhoneNumber').val(profile.hcPhoneNumber);
                $('#hcFax').val(profile.hcFax);
                $('#hcEmail').val(profile.hcEmail);
                /*
                $('select#address-country option[value="'+profile.country+'"]').prop('selected', true);
                $('#address2').val(profile.address2);
                $('#address-area').val(data.province);
                $('#phone').val(profile.phone);*/
                $('#email').val(profile.email);

            }
        }
    });
}

function submitLoginForm(form)
{
    console.log('call submitLoginForm');
     var persodata = {
                    //uniquepatientid: form['uniquepatientid'].value,
                    "fname": form['firstName'].value,
                    //"maidenname": form['maidenname'] ? form['maidenname'].value : '',
                    "lname": form['lastName'] ? form['lastName'].value : '',
                    "weight": form['weight'] ? form['weight'].value : '',
                    "height": form['height'] ? form['height'].value : '',
                    //"jobtitle": '',
                    "gender": $('input[name=gender]:radio:checked').val(),
                    "dob": form['birthday_birth[year]'].value + '-' + form['birthday_birth[month]'].value + '-' + form['birthday_birth[day]'].value,
                    "mobileNumber": form['mobileNumber'] ? form['mobileNumber'].value : '',
                    "homeNumber": form['homeNumber'] ? form['homeNumber'].value : '',
                    "address": form['address'] ? form['address'].value : '',
                    "postalCode": form['postalCode'] ? form['postalCode'].value : '',
                    "city": form['city'] ? form['city'].value : '',
                    "nhsNumber": form['nhsNumber'] ? form['nhsNumber'].value : '',
                    "emergencyPerson": form['emergencyName'] ? form['emergencyName'].value : '',
                    "emergencyNumber": form['emergencyNumber'] ? form['emergencyNumber'].value : '',
                    //"fileName": form['fileName'] ? form['fileName'].value : '',
                    /*"address1": form['address1'] ? form['address1'].value : '',
                    "address2": form['address2'] ? form['address2'].value : '',
                    "province": form['address-area'] ? form['address-area'].value : '',
                    "city": form['address-city'] ? form['address-city'].value : '',
                    "postcode": form['address-zip'] ? form['address-zip'].value : '',
                    "country": form['address[country]'] ? form['address[country]'].value : '',
                    "phone": form['phone'] ? form['phone'].value : '',*/
                    "email": form['email'] ? form['email'].value : '',
                };

    Meteor.call('createOrUpdateProviderProfile', persodata, function(err, data) {
        if(data.status == false) {

             swal({ title: 'Some error occured',
                            text: data.err,
                            allowEscapeKey:false,
                            closeOnCancel:false,
                            closeOnConfirm: true,
                            type:'error'
                          });

            if (data.err.indexOf('Token has expired')!=-1)
            {
                Router.go('login');
            }

            console.log('create persodata KO ' + data.err);
                //$( '#form-error' ).text();
                $( '#form-error' ).html( 'Error happened.' );
                $( '#form-error' ).show();
        }
        else {
            console.log('create OK - status' + data.status);
                swal({ title: 'Create succeeded',
                    text: 'Your personal data has been modified.',
                    allowEscapeKey:false,
                    closeOnCancel:false,
                    closeOnConfirm: true,
                    type:'info'
                });

        }
            $(this).css({'cursor' : 'default'});
    });
}

function submitPrivateHealthcareForm(form) {
    'use strict';
    var privHealthcareData = {
        'orgName': form['organizationName'] ? form['organizationName'].value : '',
        'regNumber': form['regNumber'] ? form['regNumber'].value : '',
        'hcAddress': form['hcAddress'] ? form['hcAddress'].value : '',
        'hcPhoneNumber': form['hcPhoneNumber'] ? form['hcPhoneNumber'].value : '',
        'hcFax': form['hcFax'] ? form['hcFax'].value : '',
        'hcEmail': form['hcEmail'] ? form['hcEmail'].value : '',
    }

    Meteor.call('createOrUpdatePrivateHealthcare', privHealthcareData, function(err, data) {
        if (data.status == false) {
            swal({
                title: 'Some error occured',
                text: data.err,
                allowEscapeKey: false,
                closeOnCancel: false,
                closeOnConfirm: true,
                type: 'error'
            });
        } else {
            swal({
                title: 'Create succeeded',
                text: 'Your data has been changed.',
                allowEscapeKey: false,
                closeOnCancel: false,
                closeOnConfirm: true,
                type: 'info'
            });
        }
    });
}

Template.pUser.events({
    'click #addNewAllergy': function() {
        console.log('add new allergy clicked');
        $('#newAllergyModal').modal('show');
    }
});
