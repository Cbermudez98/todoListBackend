import { genSalt, hash, compare } from "bcrypt";

export class Bcrypt {
    constructor() {
        genSalt(10)
            .then((salt) => this.salt = salt);
    }

    async encrypt(data) {
        return await hash(data, this.salt);
    }

    async compare(data, encrypted) {
        const verified = await compare(data, encrypted);
        if (!verified) return false;
        return true;
    }

}