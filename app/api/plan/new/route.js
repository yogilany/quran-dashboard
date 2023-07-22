import Plan from "@/models/plan";
import { connectToDatabase } from "@/utils/database";

export const POST = async (req, res) => {
  const { plan, userId } = await req.json();

  try {
    connectToDatabase();

    // Step 1: Find the existing plan for the user
let existingPlan = await Plan.findOne({ creator: userId });

// Step 2: Check if an existing plan is found
if (existingPlan) {
  // If a plan already exists for the user, update it with the new plan details
  existingPlan.plan = plan;
} else {
  // If no plan exists, create a new one
  existingPlan = new Plan({
    creator: userId,
    plan: plan
  });
}

// Step 3: Save the plan (either the updated one or the new one)
await existingPlan.save();
    


  console.log('New plan added successfully.');


    return new Response(
      JSON.stringify({ message: "Plan created successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("=> error while connecting with database: ", err);
    return new Response(
        JSON.stringify({ message: "Failed to create new plan" }),
        {
          status: 500,
        }
      );
  }
};
