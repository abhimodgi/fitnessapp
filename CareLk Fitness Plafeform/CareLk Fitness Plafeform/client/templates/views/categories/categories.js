
Template.categoriesList.onRendered(function(){
     if ( _.isEmpty(Session.get('medicalcategories')) ) {
    
    Meteor.call('getMedicalCategories', function(err, data) {
         if(err) {
    console.log(err);
  }
  else {
        Session.set('medicalcategories', data);
  }
    });
  }
});

Template.categoriesList.helpers({
  categories: function() {
      console.log('call getMedicalCategories');
      
     var cats = Session.get('medicalcategories');
      
      return cats;
  }
});