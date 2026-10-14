import axios from "axios";
export class TeamsPublisher {
    async publish(message) {
        const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
        if (!webhookUrl) {
            throw new Error("TEAMS_WEBHOOK_URL not configured");
        }
        await axios.post(webhookUrl, {
            text: message,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
