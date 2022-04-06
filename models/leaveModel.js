const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema(
  {
    reason: {
      type: String,
      required: [true, "Please Enter A Reason"],
    },
    dateOfLeave: {
      type: Date,
      required: [true, "Please Enter A Date"],
    },
    type: {
      type: String,
      enum: ["HALF", "FULL"],
      default: "FULL",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User Not Found, Login And try Again"],
    },
    status: {
      type: String,
      enum: ["NOT-APPROVED", "APPROVED", "REJECTED"],
      default: "NOT-APPROVED",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
