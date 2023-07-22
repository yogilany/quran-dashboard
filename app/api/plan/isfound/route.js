import Plan from "@/models/plan";
import { connectToDatabase } from "@/utils/database";

let attempts = 0;

export const GET = async (req, res) => {
    try {
        await connectToDatabase();

      // get a paramter sent in the url called ID
      const params = new URL(req.url).searchParams;
      const userId = params.get("userID");

      const existingPlan = await Plan.findOne({ creator: userId });
      
        if(existingPlan){
      return new Response(true, {
        status: 200,
      });
    }
    else{
        return new Response(false, {
            status: 200,
          });
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
