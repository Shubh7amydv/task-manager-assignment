class SuccessResponse {
  constructor() {
    this.success = true;
    this.message = 'Request completed successfully';
    this.data = {};
    this.err = {};
  }
}

module.exports = SuccessResponse;
