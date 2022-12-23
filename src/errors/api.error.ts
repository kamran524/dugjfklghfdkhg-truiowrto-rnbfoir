import {constants} from "http2";

export class ApiError extends Error {
  status: number;
  errors?: object;
  message: string;

  constructor(status: number, message: string, errors?: object) {
    super(message);
    this.errors = errors;
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  static UnauthorizedError(message = "You are not authenticated!") {
    return new ApiError(constants.HTTP_STATUS_UNAUTHORIZED, message);
  }

  static BadRequest(message = "Bad Request") {
    return new ApiError(constants.HTTP_STATUS_BAD_REQUEST, message);
  }

  static ConflictException(message = "Already exist") {
    return new ApiError(constants.HTTP_STATUS_CONFLICT, message);
  }

  static ForbiddenException(message = "Forbidden") {
    return new ApiError(constants.HTTP_STATUS_FORBIDDEN, message);
  }

  static GeneralException(message = "Internal server error") {
    return new ApiError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message);
  }

  static NoContentException(message = "No Content") {
    return new ApiError(constants.HTTP_STATUS_NO_CONTENT, message);
  }


  static ServiceUnavailableException(message = "Service Unavailable") {
    return new ApiError(constants.HTTP_STATUS_SERVICE_UNAVAILABLE, message);
  }

  static NotFoundException(message = "Not found") {
    return new ApiError(constants.HTTP_STATUS_NOT_FOUND, message);
  }

  static  PaymentRequired(message = " Payment Required") {
    return new ApiError(constants.HTTP_STATUS_PAYMENT_REQUIRED, message);
  }

  static ValidationError(message: string, errors: object[]) {
    return new ApiError(constants.HTTP_STATUS_PRECONDITION_FAILED, message, errors);
  }
}
