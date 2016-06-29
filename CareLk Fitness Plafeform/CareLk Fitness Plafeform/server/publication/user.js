Meteor.publish("userData", function() {
    // current user
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                'persodata': 1,
                'doctor': 1,
                'workouts':1,
                'dietPlans':1
            }
        });
    } else {
        this.ready();
    }
});

Meteor.publish('patients', function() {
    return Meteor.users.find({$and: [
        {doctor: {$exists: true}},
        {doctor: {$ne: null}},
        {'doctor.doctorId': this.userId}
    ]}, {fields: {'persodata': 1, 'doctor': 1}});
});

Meteor.publish('coach', function() {
    return Meteor.users.find({$and: [
        {doctor: {$exists: true}},
        {doctor: {$ne: null}},
        {'doctor.doctorId': this.userId}
    ]}, {fields: {'persodata': 1, 'doctor': 1}});
});

Meteor.publish('doctor', function() {
    if (Meteor.users.findOne({_id: this.userId}).doctor) {
    // if (Meteor.users.findOne({_id: this.userId})) {
        return Meteor.users.find({_id: Meteor.users.findOne({_id: this.userId}).doctor.doctorId}, {
            fields: {'persodata': 1}
        })
    } else {
        this.ready();
    }
});

Meteor.publish('doctors', function() {
    return Meteor.users.find({'persodata.identity': '2'}, {
        fields: {
            'persodata.fname': 1,
            'persodata.lname': 1,
            'persodata.address1': 1,
            'persodata.speciality': 1,
            'persodata.identity': 1
        }
    });
});

Meteor.publish('contacts', function() {
    if (this.userId) {
    return Meteor.users.find({_id: {$ne: this.userId}}, {fields: {'persodata.lname': 1, 'persodata.fname': 1, 'persodata.email': 1}});
    } else {
        this.ready();
    }
});
