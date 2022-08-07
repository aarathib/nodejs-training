import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    super(403, ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD.MESSAGE, ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;
