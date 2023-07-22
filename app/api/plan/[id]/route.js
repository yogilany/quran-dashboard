import Plan from "@/models/plan";
import { connectToDatabase } from "@/utils/database";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Find the prompt by ID and remove it
        await Plan.findByIdAndRemove(params.id);

        return new Response("Plan deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting plan", { status: 500 });
    }
};
