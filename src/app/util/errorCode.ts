/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    USER_NOT_FOUND: {
        CODE: "USER_NOT_FOUND",
        MESSAGE: "User not found",
    },
    USER_WITH_ID_NOT_FOUND: {
        CODE: "USER_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    },
    INCORRECT_USERNAME_OR_PASSWORD: {
        // STATUS: 403,
        CODE: "INCORRECT_USERNAME_OR_PASSWORD",
        MESSAGE: "Incorrect Username or Password",
    },
    FAILED_TO_UPDATE: {
        CODE: "FAILED_TO_UPDATE",
        MESSAGE: "Failed to update employee",
    },
    FAILED_TO_DELETE: {
        CODE: "FAILED_TO_DELETE",
        MESSAGE: "Failed to delete employee",
    }
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
    // STATUS: 403
    CODE: string;
    MESSAGE: string;
}
