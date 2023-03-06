export class HttpResponse {
    constructor() {}

    response(promise, req, res) {
        promise.then((data) => {
            const obj = {
                status: true,
            }

            if (data?.msg && typeof data?.msg === "string") {
                obj.msg = data.msg
            } else {
                obj.data = data;
            }
            if (data?.msg) {
                obj.msg = data.msg;
            }
            res.status(200).send(obj);
        })
        .catch((error) => {
            let obj = {
                msg: "Internal server error"
            };
            if (error?.code) {
                obj.code = error?.code;
            }
            if (error?.msg) {
                obj.msg = error.msg;
            }
            res.status(500).send(obj);
        });
    }
}