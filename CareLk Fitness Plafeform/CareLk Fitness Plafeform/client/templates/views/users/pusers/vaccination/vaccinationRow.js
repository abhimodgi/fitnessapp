Template.vaccinationRow.helpers({
    formDateAdministered: function() {
        return moment(this.dateAdministered).format('LLLL');
    },
    formGivenDate: function() {
        return moment(this.givenDate).format('LLLL');
    },
    formExpiryDate: function() {
        return moment(this.expiryDate).format('LLLL');
    }
});
