const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    _id: false,
    date: Object,
}, {strict: false});

const historySchema = new mongoose.Schema({
    _id: false,
    date: Object,
}, {strict: false});

const trainingdataSchema = new mongoose.Schema({
    data: dataSchema,
    currentExercises: Array,
    history: historySchema,
});

const trainingdata = mongoose.model('trainingdata', trainingdataSchema);
module.exports = trainingdata;