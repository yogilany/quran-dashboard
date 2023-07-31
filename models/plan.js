import mongoose, {Schema, model, models} from "mongoose";
const PlanSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
    },
    plan:  {
        type: Schema.Types.Array,
    }, 
    date_created: {
        type: Date,
        default: Date.now,
    },



});

const Plan = models.Plan || model("Plan", PlanSchema);

export default Plan;