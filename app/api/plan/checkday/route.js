import Plan from "@/models/plan";
import { connectToDatabase } from "@/utils/database";


export const GET = async (req) => {
    try {
        await connectToDatabase();
        console.log("done connect")

      // get a paramter sent in the url called ID
      const params = new URL(req.url).searchParams;
      const userId = params.get("userId");
      const dayToFind = params.get("dayToFind");
      const doneValue = params.get("doneValue") === "true" ? true : false;

      console.log(userId,dayToFind,doneValue)

      const updatedPlan = await Plan.findOneAndUpdate(
        { plan: { $elemMatch: { day:parseInt( dayToFind) } } }, // Filter to find the specific day
        { $set: { 'plan.$.done': doneValue } }, // Update the done property
        { new: true } // Return the updated document
      );

      console.log("GOT HER22")

  

      
        if(updatedPlan){
            console.log('Updated plan done');

      return new Response(updatedPlan, {
        status: 200,
      });
    }
    else{
        console.log('Plan or day not found.');
    }

    } catch (err) {
      console.log("=> error while connecting with database: ", err);
      return new Response(
        JSON.stringify({ message: "Failed to fetch plan" }),
        {
          status: 500,
        }
      );
  }
};
