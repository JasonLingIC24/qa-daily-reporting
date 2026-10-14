import fs from "node:fs";
import path from "node:path";
export function writeReport(reportDate, confluence, teams) {
    const dir = path.join("reports", reportDate);
    fs.mkdirSync(dir, {
        recursive: true,
    });
    fs.writeFileSync(`${dir}/confluence.html`, confluence);
    fs.writeFileSync(`${dir}/teams.md`, teams);
}
