Template.qualification.onRendered(function(){

    $('#graduationDate').datepicker();
    
});


function getQualification()
{
    console.log('call getQualification');
    var user = Meteor.user();
    Meteor.call('getQualification', user, function(err, data) {
        if(data.status == false) {
                //$( '#form-error' ).text();
                $( '#form-error' ).html( 'Error happened.' );
                $( '#form-error' ).show();
        }
        else {
            if (data.statusCode == 200 || data.statusCode == 201)
            {
                var pUser = Meteor.user();
                
                $('#name').val(pUser.profile.fname);
                $('#surname').val(pUser.profile.lname);
                $('#maidenname').val(pUser.profile.maidenname);
                $('#jobtitle').val(pUser.profile.jobtitle);
           
            }
        }
        $(this).css({'cursor' : 'default'});
    });
}

