export class AppError extends Error {
    stack?: string;

    // By default, error is 'Something went wrong!' and statusCode is 500
    constructor(public message: string = 'Something went wrong!', public statusCode: number = 500) {
        super(message);

        // This is for errors that may occur outside of app like MongoDB errors,etc
        // It captures stack trace and binds/assigns to stack property of this class
        Error.captureStackTrace(this, this.constructor);
    }
}

export interface ErrorResponseBody {
    message: string;
    stack?: string;
}

