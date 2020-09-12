interface ErrorResponse {
    error?: {
        status?: number
        statusText?: string
        responseText?: string
        responseHeaders?: HeadersInit
    };
}
export default class HttpError extends Error
{
    /**
     * The HTTP status code for this error
     */
    statusCode: number;

    /**
     * The HTTP status code for this error.
     * Note that this is the same as `status`, i.e. the code is available
     * through any of these.
     */
    status: number;

    /**
     * The HTTP status text corresponding to this error
     */
    statusText: string;

    /**
     * The HTTP response headers corresponding to this error
     */
    responseHeaders: Headers

    constructor(message: string, statusCode: number, statusText: string, responseHeaders: Headers) {
        super(message);
        this.message    = message;
        this.name       = "HttpError";
        this.statusCode = statusCode;
        this.status     = statusCode;
        this.statusText = statusText;
        this.responseHeaders = responseHeaders;
    }

    toJSON() {
        return {
            name      : this.name,
            statusCode: this.statusCode,
            status    : this.status,
            statusText: this.statusText,
            message   : this.message,
            responseHeaders : this.responseHeaders
        };
    }

    getResponseHeader(key: string) {
        return (this.responseHeaders && this.responseHeaders.get(key)) || "";
    }

    static create(failure?: string | Error | ErrorResponse) {
        // start with generic values
        let status: string | number = 0;
        let statusText = "Error";
        let message = "Unknown error";
        let headers: Headers = new Headers();

        if (failure) {
            if (typeof failure == "object") {
                if (failure instanceof Error) {
                    message = failure.message;
                }
                else if (failure.error) {
                    status = failure.error.status || 0;
                    statusText = failure.error.statusText || "Error";
                    if (failure.error.responseText) {
                        message = failure.error.responseText;
                    }
                }
            }
            else if (typeof failure == "string") {
                message = failure;
            }
        }

        return new HttpError(message, status, statusText, headers);
    }
}
