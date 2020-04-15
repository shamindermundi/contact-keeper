const moongoose = require("mongoose");

const ContactSchema = moongoose.Schema({
  user: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = moongoose.model("contact", ContactSchema);
