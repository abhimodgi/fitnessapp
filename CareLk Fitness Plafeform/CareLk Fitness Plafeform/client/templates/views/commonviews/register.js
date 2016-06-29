Template.register.onRendered(function() {
    console.log('Template.register.onRendered');
    // Initialize iCheck plugin
    /*   $('.i-checks').iCheck({
           checkboxClass: 'icheckbox_square-green',
           radioClass: 'iradio_square-green',
       });*/

    $("#registerForm").validate({
        rules: {
            password: {
                required: true,
                minlength: 8
            },
            password2: {
                required: true,
                minlength: 8,
                equalTo: '#password'
            },
            email: {
                required: true,
                email: true,
                minlength: 3
            },
            username: {
                required: true,
                url: false,
                minlength: 3
            },
            termsofuse: {
                required: true
            },
            firstname: {
              required: true,
              minlength: 2
            },
            lastname: {
              required: true,
              minlength: 2
            }
        },
        messages: {
            password: {
                required: "(Please enter your password)",
                minlength: "The mininum length for password is 8 characters"
            },
            password2: {
                required: "(Please enter your password)",
                minlength: "The mininum length for password is 8 characters"
            },
            email: {
                required: "The email is required",
                minlength: "This is custom message for min length"
            },
            username: {
                required: "The username is required",
                minlength: "This is custom message for min length"
            },
            termsofuse: {
                required: "(Please accept the terms of use)"
            }
        },
        cancelSubmit: function() {
            alert('cancel submit');
        },
        submitHandler: function(form) {
            event.preventDefault();
            var isPuser = $('input[name=profile]:checked', '#registerForm').val();
           console.log('isPuser ' + isPuser);
            var user = {
                "email": form['email'].value,
                "username": form['username'].value,
                "password": form['password'].value,
                "fname": $('#firstname').val(),
                "lname": $('#lastname').val(),
                "mobile": $('#mobilenumber').val(),
                "identity": isPuser
            }

            Meteor.call('register', user, function(err, data) {
                if (!data || !data.status) {
                    Command: toastr["error"]("Register failed", data.err)
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
                    console.log('register KO ' + data.err);
                }
                else {
                    console.log('register OK - status ' + data.status);
                    if (data.status) {

                        console.log('SendVerifyEmail ' + data.status);

                        Meteor.call('SendVerifyEmail', user.email, data.id, function(err1, data1) {

                            if (!data1 || !data1.status) {
                                swal({ title: 'Some error occured',
                                    text: err,
                                    allowEscapeKey:false,
                                    closeOnCancel:false,
                                    closeOnConfirm: true,
                                    type:'error'
                                });
                            }
                            else {
                                console.log('checkemail ');
                                Router.go('checkemail');
                            }
                        });
                  }
                }
            });
        },
        errorPlacement: function(error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .append(error);
        },
        errorElement: "span",
    });
});


Template.register.events({
    'click .cancel': function(event) {

        event.preventDefault();
        Router.go('login');
    }
});
