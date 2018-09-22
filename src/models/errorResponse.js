class ErrorResponse extends Error {
  constructor(title, detail, httpStatusCode) {
    super();
    this.title = title;
    this.detail = detail;
    this.httpStatusCode = httpStatusCode;
  }
}

module.exports = ErrorResponse;
