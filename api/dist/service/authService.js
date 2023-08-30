import fs from "fs";
export default function getStoredTokens() {
    const tokens = fs.readFileSync("refreshTokens.json").toString();
    if (!tokens)
        throw new Error("Failed reading the tokens database");
    return tokens;
}
//# sourceMappingURL=authService.js.map