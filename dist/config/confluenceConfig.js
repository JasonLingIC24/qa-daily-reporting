export function getConfluenceConfig() {
    return {
        baseUrl: process.env.CONFLUENCE_BASE_URL ?? "",
        email: process.env.CONFLUENCE_USER_EMAIL ?? "",
        apiToken: process.env.CONFLUENCE_API_TOKEN ?? "",
        spaceKey: process.env.CONFLUENCE_SPACE_KEY ?? "",
        rootPageId: process.env.CONFLUENCE_ROOT_PAGE_ID ?? "",
    };
}
