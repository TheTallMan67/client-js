interface ErrorResponse {
    error?: {
        status?: number;
        statusText?: string;
        responseText?: string;
        responseHeaders?: HeadersInit;
    };
}
export default class HttpError extends Error {
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
    responseHeaders: Headers;
    constructor(message: string, statusCode: number, statusText: string, responseHeaders: Headers);
    toJSON(): {
        name: string;
        statusCode: number;
        status: number;
        statusText: string;
        message: string;
        responseHeaders: Headers;
    };
    getResponseHeader(key: string): string;
    static create(failure?: string | Error | ErrorResponse): HttpError;
}
export {};
