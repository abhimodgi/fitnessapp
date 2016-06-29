Template.vitalSigns.onCreated(function() {
    var self = this;
});

Template.vitalSigns.onRendered(function() {
    this.$('#vitalsignsTable').dataTable();
});

Template.vitalSigns.helpers({

});
