
/***
 * Medical records Repository management
 * Representation: {doctor_id, patient_id, patientproblems:{}, activemedications: {}, vaccinations: {name, date}, surgicalhistory:{}, notes:{}, otherdocuments:{}, clinicalnotes:{}, allergies:{}, radiologyresults: {}}
 * Storage for :
 * // 1. Patients problems: embeded document {name, description, start, end}
 * // 2. Active Medications: embeded document { name, dose, prescription}
 * // 3. Vaccinations: embeded document {name, date}
 * // 4. Surgical history: embeded document {name, date}
 * // 5. Notes in progress: embeded document {name,date}
 * // 6. vitals data: embeded document {name,value,date}
 * // 7. Other documents (txt, pdf, word, etc...): embeded document {name, date}
 * // 8. Clinical notes (txt, pdf, word, etc...): embeded document {name, date}
 * // 9. Allergies: embeded document {name, date}
 * // 10. Radiology results: embeded document {name, date}
 */

Meteor.methods({
    createVitalSigns: function(vitalData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        if (Meteor.users.findOne({_id: this.userId}).persodata.identity != 2) {
            throw new Meteor.Error('not-allowed', 'Only doctors can do this action!')
        }
        check(vitalData, Object);
        check(patientId, String);
        vitalData.date = new Date(vitalData.date);
        MedicalRecords.update({
            'patient.patientId': patientId
        }, {
            $push: {vitals: vitalData},
            $set: {'doctor.doctorId': this.userId}
        }, {upsert: true});
    },
    createAllergy: function(allergyData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        if (Meteor.users.findOne({_id: this.userId}).persodata.identity != 2) {
            throw new Meteor.Error('not-allowed', 'Only doctors can do this action!')
        }
        check(allergyData, Object);
        check(patientId, String);
        MedicalRecords.update({
            'patient.patientId': patientId
        }, {
            $push: {allergies: allergyData},
            $set: {'doctor.doctorId': this.userId}
        }, {upsert: true});
    },
    createVaccination: function(vaccinationData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        if (Meteor.users.findOne({_id: this.userId}).persodata.identity != 2) {
            throw new Meteor.Error('not-allowed', 'Only doctors can do this action!')
        }
        check(vaccinationData, Object);
        check(patientId, String);
        vaccinationData.dateAdministered = new Date(vaccinationData.dateAdministered);
        vaccinationData.givenDate = new Date(vaccinationData.givenDate);
        vaccinationData.expiryDate = new Date(vaccinationData.expiryDate);

        MedicalRecords.update({
            'patient.patientId': patientId
        }, {
            $push: {vaccinations: vaccinationData},
            $set: {'doctor.doctorId': this.userId}
        }, {upsert: true});
    },
    createPrescription: function(prescriptionData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        if (Meteor.users.findOne({_id: this.userId}).persodata.identity != 2) {
            throw new Meteor.Error('not-allowed', 'Only doctors can do this action!')
        }
        check(prescriptionData, Object);
        check(patientId, String);
        prescriptionData.startDate = new Date(prescriptionData.startDate);

        MedicalRecords.update({
            'patient.patientId': patientId
        }, {
            $push: {prescriptions: prescriptionData},
            $set: {'doctor.doctorId': this.userId}
        }, {upsert: true});
    },
    updatePrescription: function(prescriptionData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        check(prescriptionData, Object);
        check(patientId, String);
        
        if (this.userId == patientId) {
            // ask for renewal
            if (moment().diff(moment(prescriptionData.startDate), 'days') < 21 || prescriptionData.askForRenewal) {
                throw new Meteor.Error('not-authorized', 'You can\'t ask for renewal now!');
            } else {
                MedicalRecords.update({
                    'patient.patientId': this.userId,
                    'prescriptions': {
                        $elemMatch: {
                            'startDate': prescriptionData.startDate,
                            'drug': prescriptionData.drug,
                            'quantity': prescriptionData.quantity
                        }
                    }
                },{
                    $set: {
                        'prescriptions.$.askForRenewal': true
                    }
                });
            }
        } else {
            // confirm or reject renewal
            if (prescriptionData.confirmed) {
                var renewDate = new Date(moment(prescriptionData.startDate).add('1', 'M'));
                MedicalRecords.update({
                    'patient.patientId': patientId,
                    'prescriptions': {
                        $elemMatch: {
                            'startDate': prescriptionData.startDate,
                            'drug': prescriptionData.drug,
                            'quantity': prescriptionData.quantity
                        }
                    }
                },{
                    $set: {
                        'prescriptions.$.startDate': renewDate,
                        'prescriptions.$.askForRenewal': false
                    }
                });
                console.log(new Date(moment(prescriptionData.startDate).add('1', 'M')))
            } else {
                MedicalRecords.update({
                    'patient.patientId': patientId,
                    'prescriptions': {
                        $elemMatch: {
                            'startDate': prescriptionData.startDate,
                            'drug': prescriptionData.drug,
                            'quantity': prescriptionData.quantity
                        }
                    }
                },{
                    $set: {
                        'prescriptions.$.askForRenewal': false
                    }
                });
            }
        }
    },
    createHealthProblem: function(hpData, patientId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }
        if (Meteor.users.findOne({_id: this.userId}).persodata.identity != 2) {
            throw new Meteor.Error('not-allowed', 'Only doctors can do this action!')
        }
        check(hpData, Object);
        check(patientId, String);

        MedicalRecords.update({
            'patient.patientId': patientId
        }, {
            $push: {healthProblems: hpData},
            $set: {'doctor.doctorId': this.userId}
        }, {upsert: true});
    }
});
