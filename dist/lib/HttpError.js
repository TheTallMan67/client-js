"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class HttpError extends Error {
  constructor(message, statusCode, statusText, responseHeaders) {
    super(message);
    this.message = message;
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.status = statusCode;
    this.statusText = statusText;
    this.responseHeaders = responseHeaders;
  }

  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      status: this.status,
      statusText: this.statusText,
      message: this.message,
      responseHeaders: this.responseHeaders
    };
  }

  getResponseHeader(key) {
    return this.responseHeaders && this.responseHeaders.get(key) || "";
  }

  static create(failure) {
    // start with generic values
    let status = 0;
    let statusText = "Error";
    let message = "Unknown error";
    let headers = new Headers();

    if (failure) {
      if (typeof failure == "object") {
        if (failure instanceof Error) {
          message = failure.message;
        } else if (failure.error) {
          status = failure.error.status || 0;
          statusText = failure.error.statusText || "Error";

          if (failure.error.responseText) {
            message = failure.error.responseText;
          }
        }
      } else if (typeof failure == "string") {
        message = failure;
      }
    }

    return new HttpError(message, status, statusText, headers);
  }

}

exports.default = HttpError;