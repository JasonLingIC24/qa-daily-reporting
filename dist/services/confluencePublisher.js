import { ConfluenceClient, } from "../clients/confluenceClient.js";
import { getConfluenceConfig, } from "../config/confluenceConfig.js";
export class ConfluencePublisher {
    client = new ConfluenceClient();
    config = getConfluenceConfig();
    async publish(reportDate, html) {
        const { year, month, } = this.getYearMonth(reportDate);
        const rootPageId = this.config.rootPageId;
        if (!rootPageId) {
            throw new Error("CONFLUENCE_ROOT_PAGE_ID not configured");
        }
        const yearPageId = await this.client
            .findOrCreateChildPage(year, rootPageId);
        const monthPageId = await this.client
            .findOrCreateChildPage(month, yearPageId);
        const reportPageId = await this.client
            .createOrUpdatePage(`QA Daily Summary - ${reportDate}`, html, monthPageId);
        return reportPageId;
    }
    getYearMonth(reportDate) {
        const date = new Date(`${reportDate}T00:00:00`);
        return {
            year: date
                .getFullYear()
                .toString(),
            month: date.toLocaleString("en-GB", {
                month: "long",
            }),
        };
    }
}
