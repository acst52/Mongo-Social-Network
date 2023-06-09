const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
{
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
},
{
    toJSON: {
      getters: true,
    },
    id: false,
}
);

// No need to init - reactionSchema used as a subdoc schema in Thought model. Only need to export reactionSchema & import into Thought mod

module.exports = reactionSchema;