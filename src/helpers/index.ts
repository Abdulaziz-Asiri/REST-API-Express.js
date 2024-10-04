import crytpo from 'crypto';

const SECRET = "Abdul-1212"
export const random = () => crytpo.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
    return crytpo.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest('hex')
};

