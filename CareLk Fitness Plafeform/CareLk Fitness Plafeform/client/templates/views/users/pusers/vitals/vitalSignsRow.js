Template.vitalSignsRow.helpers({
    formatedDate: function() {
        return moment(this.date).format('LLLL');
    }
});
