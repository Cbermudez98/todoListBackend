import pkg from "jsonwebtoken";

export class Jwt {
    constructor() {
        this.secretKey = process.env?.SECRET_KEY || "123456";
    }

    sign(email) {
        return pkg.sign({email, date: Date.now()}, this.secretKey, { expiresIn: "12h" });
    }

    applyJwt() {
        return (req, res, next) => {
            try {
                const token = req.headers?.authorization.split(" ")[1] || "";
                if (!token) {
                    return res.status(401).send({
                        msg: "Not authorize"
                    });
                }

                const verity = pkg.verify(token, this.secretKey);
                if (!verity) {
                    return res.status(401).send({
                        msg: "Not authorize"
                    });
                }
                next();
            } catch (error) {
                res.status(401).send({
                    msg: "Not authorize"
                });
            }
        };
    }
}