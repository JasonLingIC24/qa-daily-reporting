import {
  ConfluenceClient,
} from "../clients/confluenceClient.js";

import {
  getConfluenceConfig,
} from "../config/confluenceConfig.js";

export class ConfluencePublisher {

  private readonly client =
    new ConfluenceClient();

  private readonly config =
    getConfluenceConfig();

  async publish(
    reportDate: string,
    html: string,
  ): Promise<string> {

    const {
      year,
      month,
    } = this.getYearMonth(
      reportDate,
    );

    const rootPageId =
      this.config.rootPageId;

    if (!rootPageId) {
      throw new Error(
        "CONFLUENCE_ROOT_PAGE_ID not configured",
      );
    }

    const yearPageId =
      await this.client
        .findOrCreateChildPage(
          year,
          rootPageId,
        );

    const monthPageId =
      await this.client
        .findOrCreateChildPage(
          month,
          yearPageId,
        );

    const reportPageId =
      await this.client
        .createOrUpdatePage(
          `QA Daily Summary - ${reportDate}`,
          html,
          monthPageId,
        );

    return reportPageId;
  }

  private getYearMonth(
    reportDate: string,
  ): {
    year: string;
    month: string;
  } {

    const date =
      new Date(
        `${reportDate}T00:00:00`,
      );

    return {

      year:
        date
          .getFullYear()
          .toString(),

      month:
        date.toLocaleString(
          "en-GB",
          {
            month: "long",
          },
        ),
    };
  }
}