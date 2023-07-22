import Plan from "@/models/plan";
import { connectToDatabase } from "@/utils/database";

let attempts = 0;

export const GET = async (req, res) => {
    try {
        await connectToDatabase();

      // get a paramter sent in the url called ID
      const params = new URL(req.url).searchParams;
      const userId = params.get("userID");

      // get the posts. if the post was is hidden, don't populate the creator else populate the creator
      const plan = await Plan.find(
        
          { creator: userId }
        
      );



      return new Response(JSON.stringify(plan), {
        status: 200,
      });

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
