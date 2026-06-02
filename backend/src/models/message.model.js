import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    }
  },
  {
    timestamps: true
  }
);