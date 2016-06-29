Template.appointmentRow.helpers({
    formatedStartDate: function() {
        return moment(this.startDate).format('LLLL');
    },
    formatedEndDate: function() {
        return moment(this.endDate).format('LLLL');
    }
  
});
