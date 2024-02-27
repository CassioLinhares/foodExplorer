const {verify} = require("jsonwebtoken");
const authConfig = require("../config/auth");
const AppError = require("../utils/appError");

function ensureAuthenticated(request, response, next) {
    const tokenInHeaders = request.headers;

    if (!tokenInHeaders.cookie) {
        throw new AppError("JWT, token uninformed!", 401);
    }

    const [, token] = tokenInHeaders.cookie.split("token=");

    try {
        const {role, sub: user_id} = verify(token, authConfig.jwt.secret);
        request.user = {
            id: Number(user_id),
            role
        }
        return next();
    } catch (error) {
        throw new AppError("JWT, token invalid!", 401)
    }
}

module.exports = ensureAuthenticated;