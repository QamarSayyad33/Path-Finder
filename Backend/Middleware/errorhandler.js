const { constants } = require("../constants");

const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    const errorMessage = err?.message || "An unknown error occurred";
    const errorStack = err?.stack || "No stack trace available";

    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
        default:
            res.json({
                title: "Unknown Error",
                message: errorMessage,
                stackTrace: errorStack,
            });
            break;
    }
};

module.exports = errorhandler;
