Template.dietPlanItem.onRendered(function(){
console.log('Template.dietPlanItem.onRendered '  );

var meal = $(this)[0].data.meal;
console.log('name ' + meal );
//var category = this.find('td a#category').text();
//console.log('name ' + name + ' - category ' + category);

//var t = $('tr').last().find('td a#name').text();
//$(this).find("td:nth-child(2)").text();
//console.log('name child ' + t);


$('td a#mealValue[data-id="'+ $(this)[0].data.id +'"]').editable({
       type: 'text',
       pk: 1,
       name: 'mealValue',
       title: 'Enter name',
       mode: 'inline',
       error: function(response, newDietPlan) {
           if(response.status === 500) {
               return 'Service unavailable. Please try later.';
           } else {
               return response.responseText;
           }
       }
   });

 $('td a#day[data-id="'+ $(this)[0].data.id +'"]').editable({
        type: 'text',
        pk: 1,
        name: 'day',
        title: 'Enter name',
        mode: 'inline',
        error: function(response, newDietPlan) {
              if(response.status === 500) {
                  return 'Service unavailable. Please try later.';
              } else {
                  return response.responseText;
              }
          }
      });

 $('td a#meal[data-id="'+ $(this)[0].data.id +'"]').editable({
        type: 'text',
        pk: 1,
        name: 'meal',
        title: 'Enter name',
        mode: 'inline',
        error: function(response, newDietPlan) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
    });

    $('td a#category[data-id="'+ $(this)[0].data.id +'"]').editable({
        name: 'category',
        mode: 'inline',
        source: [
            {value: 'Breakfast', text: 'Breakfast'},
            {value: 'Lunch', text: 'Lunch'},
            {value: 'Dinner', text: 'Dinner'}

        ],
        display: function(value, sourceData) {
            var colors = {"": "gray", 1: "green", 2: "blue"},
                elem = $.grep(sourceData, function(o){return o.value == value;});
            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        },
        error: function(response, newDietPlan) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
    });

});

Template.dietPlanItem.helpers({
    category:this.category

});
