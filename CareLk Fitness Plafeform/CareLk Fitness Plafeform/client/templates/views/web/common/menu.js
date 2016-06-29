Template.menu.onCreated(function() {
    $(".flexy-menu").flexymenu({speed: 400, indicator: true});
});


Template.menu.helpers({
	home: function() {
        console.log('homeclass ' + this.name);
        return this.name == "home" ? "active" : "";
    },
    services: function() {
        return this.name == "services" ? "active" : "";
    },
    contact: function() {
        return this.name == "contact" ? "active" : "";
    }
});