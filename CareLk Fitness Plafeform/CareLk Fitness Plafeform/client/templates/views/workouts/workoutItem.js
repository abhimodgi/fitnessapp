Template.workoutItem.onRendered(function(){

var name = $(this)[0].data.name;
console.log('name ' + name );
//var category = this.find('td a#category').text();
//console.log('name ' + name + ' - category ' + category);

//var t = $('tr').last().find('td a#name').text();
//$(this).find("td:nth-child(2)").text();
//console.log('name child ' + t);

 $('td a#name[data-id="'+ $(this)[0].data.id +'"]').editable({
        type: 'text',
        pk: 1,
        name: 'name',
        title: 'Enter name',
        mode: 'inline',
        error: function(response, newValue) {
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
            {value: 'Strength', text: 'Strength'},
            {value: 'Cardio', text: 'Cardio'}
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
        error: function(response, newValue) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
    });

});

Template.workoutItem.helpers({
    category:this.category

});
