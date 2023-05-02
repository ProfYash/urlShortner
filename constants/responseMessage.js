import { HttpStatusCode } from "./enums.js";

export const ResponseMessages = {
    [HttpStatusCode.OK]: "Operation successful",
    [HttpStatusCode.ACCEPTED]: "Request Accepted",
    [HttpStatusCode.CREATED]: "Create Success",
    [HttpStatusCode.BAD_REQUEST]: "Invalid Request",
    [HttpStatusCode.FORBIDDEN]: "Request not allowed",
    [HttpStatusCode.INTERNAL_SERVER]: "Internal server error",
    [HttpStatusCode.METHOD_NOT_ALLOWED]: "Invalid method called",
    [HttpStatusCode.NOT_ACCEPTABLE]: "Invalid input provided",
    [HttpStatusCode.NOT_FOUND]: "Not found",
    [HttpStatusCode.UNAUTHORIZED]: "User is not authenticated",
  };