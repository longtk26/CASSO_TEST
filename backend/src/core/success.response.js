class SuccessResponse {
    constructor({ message = "", statusCode = 200, metadata = {} }) {
        this.message = !message ? "Sucessfully" : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

export default SuccessResponse;
