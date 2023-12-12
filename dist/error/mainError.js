"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainError = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATE"] = 201] = "CREATE";
    HTTP[HTTP["BAD"] = 404] = "BAD";
    HTTP[HTTP["DELETE"] = 204] = "DELETE";
    HTTP[HTTP["UPDATE"] = 203] = "UPDATE";
})(HTTP = exports.HTTP || (exports.HTTP = {}));
class mainError extends Error {
    constructor(args) {
        super(args.message);
        this.success = false;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name;
        this.message = args.message;
        this.status = args.status;
        if (this.success === undefined) {
            this.success = args.success;
        }
        Error.captureStackTrace(this);
    }
}
exports.mainError = mainError;
