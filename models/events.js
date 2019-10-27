
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventId: String,
  title: String,
  link: String,
  categoryNumber: Number,
  categoryName: String,
  sources: [
    {
      id: String,
      url: String,
    },
  ],
  date: String,
  geometriesType: String,
  coordinates: [String],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
