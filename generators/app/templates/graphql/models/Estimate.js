const { model, Schema } = require('mongoose');

const EstimateSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Object'},
    value: Schema.Types.Number,
});

module.exports = model('Estimate', EstimateSchema);