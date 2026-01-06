import { getClicksByCountry, getClicksByDay, getClicksByDevice, getTotalClicks } from "./analytics.service.js";

export async function summarize(req, res){

    const { shortCode } = req.params;

    if(!shortCode){
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
         totalClicks: await getTotalClicks(shortCode),
         clicksByDay: await getClicksByDay(shortCode),
    });


}