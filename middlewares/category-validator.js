import { body } from "express-validator";
import { validateFields } from "./multer-upload.js";
import { categoryExists } from "../helpers/db-validator.js";
import { handleErrors } from "./delete-file-on-error.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validar-jwt.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("name").custom(categoryExists),
    validateFields,
    handleErrors,
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").custom(categoryExists),
    validateFields,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validateFields,
    handleErrors
]