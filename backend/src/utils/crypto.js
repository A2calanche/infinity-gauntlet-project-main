import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const algorithm = "aes-256-gcm";
const KEY = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY, "hex");

const encryptToken = (token) => {
    if(!token) return null;
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, KEY, iv);
    let encrypted = Buffer.concat([cipher.update(token, "utf8",)]);
    const authTag = cipher.getAuthTag()    
    return Buffer.concat([iv, authTag, encrypted]).toString("hex");
}

const decryptToken = (encryptedHex) => {
    if(!encryptedHex) return null;
    const data = Buffer.from(encryptedHex, "hex");
    const iv = data.subarray(0,16);
    const authTag = data.subarray(16, 32);
    const encrypted = data.subarray(32);
    const decipher = createDecipheriv(algorithm, KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
}

export default { encryptToken, decryptToken };