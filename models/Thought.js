const { Schema, model, Types } = require('mongoose');


// schema to create thought model
const reactionSchema = new Schema(
{
    body: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    
}, {
    timestamps: true,
})

const thoughtSchema = new Schema(

)
    

thoughtSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})


const Thought = model('thoughts', thoughtSchema);
module.exports = Thought;
