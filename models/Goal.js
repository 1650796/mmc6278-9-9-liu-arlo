const { Schema, model, models } = require("mongoose");

const GoalsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },  

        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)


module.exports = models.Goal || model("Goal", GoalsSchema);