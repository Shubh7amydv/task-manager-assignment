class ErrorResponse {
  constructor() {
    this.success = false;
    this.message = 'Request failed';
    this.data = {};
    this.err = {};
  }
}

module.exports = ErrorResponse;
