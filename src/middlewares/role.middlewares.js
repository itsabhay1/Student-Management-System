import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ApiError(403, "Access denied: insufficient permissions");
    }

    next();
  };
};
