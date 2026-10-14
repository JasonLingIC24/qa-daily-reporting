import axios from "axios";
import { getConfluenceConfig, } from "../config/confluenceConfig.js";
export class ConfluenceClient {
    config = getConfluenceConfig();
    get authHeader() {
        return Buffer
            .from(`${this.config.email}:${this.config.apiToken}`)
            .toString("base64");
    }
    get headers() {
        return {
            Authorization: `Basic ${this.authHeader}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
    async getSpaceId() {
        const response = await axios.get(`${this.config.baseUrl}/api/v2/spaces?keys=${this.config.spaceKey}`, {
            headers: this.headers,
        });
        const space = response.data.results?.[0];
        if (!space) {
            throw new Error(`Space not found: ${this.config.spaceKey}`);
        }
        return String(space.id);
    }
    async createPage(title, html, parentId) {
        const spaceId = await this.getSpaceId();
        const response = await axios.post(`${this.config.baseUrl}/api/v2/pages`, {
            spaceId,
            parentId,
            status: "current",
            title,
            body: {
                representation: "storage",
                value: html,
            },
        }, {
            headers: this.headers,
        });
        return response.data;
    }
    async findPageByTitle(title) {
        const spaceId = await this.getSpaceId();
        const response = await axios.get(`${this.config.baseUrl}/api/v2/pages`, {
            headers: this.headers,
            params: {
                spaceId,
                title,
            },
        });
        return (response.data.results?.[0] ??
            null);
    }
    async findChildPage(title, parentId) {
        const spaceId = await this.getSpaceId();
        const response = await axios.get(`${this.config.baseUrl}/api/v2/pages`, {
            headers: this.headers,
            params: {
                spaceId,
                title,
            },
        });
        const matches = response.data.results ?? [];
        return (matches.find((page) => String(page.parentId) ===
            String(parentId)) ?? null);
    }
    async findOrCreateChildPage(title, parentId) {
        const existing = await this.findChildPage(title, parentId);
        if (existing) {
            return existing.id;
        }
        const page = await this.createPage(title, "", parentId);
        return page.id;
    }
    async updatePage(pageId, title, html, version) {
        const response = await axios.put(`${this.config.baseUrl}/api/v2/pages/${pageId}`, {
            id: pageId,
            status: "current",
            title,
            version: {
                number: version + 1,
            },
            body: {
                representation: "storage",
                value: html,
            },
        }, {
            headers: this.headers,
        });
        return response.data;
    }
    async createOrUpdatePage(title, html, parentId) {
        const existing = await this.findChildPage(title, parentId);
        if (existing) {
            await this.updatePage(existing.id, title, html, existing.version.number);
            return existing.id;
        }
        const page = await this.createPage(title, html, parentId);
        return page.id;
    }
    async getPage(pageId) {
        const response = await axios.get(`${this.config.baseUrl}/api/v2/pages/${pageId}`, {
            headers: this.headers,
        });
        return response.data;
    }
}
