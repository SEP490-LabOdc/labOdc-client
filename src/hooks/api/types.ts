export enum ApiErrorTypes {
    ValidationError = "ValidationFailure",
    PermissionBoundaryError = "PermissionBoundaryError",
    BadRequestError = "BadRequest",
    UnauthorizedError = "UnauthorizedError",
    ForbiddenError = "PermissionDenied",
    CustomForbiddenError = "ForbiddenError"
}

export type TApiErrors =
    | {
        success: boolean;
        error: ApiErrorTypes.ValidationError;
        message: string;
        errorCode: 422;
    }
    | {
        success: boolean;
        error: ApiErrorTypes.UnauthorizedError;
        message: string;
        errorCode: 401;
    }
    | {
        success: boolean;
        error: ApiErrorTypes.ForbiddenError;
        message: string;
        errorCode: 403;
    }
    | {
        success: boolean;
        error: ApiErrorTypes.BadRequestError;
        message: string;
        errorCode: 400;
    }

/**
 * Cấu trúc response chung cho tất cả các API
 */
export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    errorCode: string
    timestamp: string
}