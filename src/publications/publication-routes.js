import { Router } from "express";
import { check } from "express-validator";
import { getPublications, updatedPublication,deletePublication, getPublicationById, createPublication } from "./publication-controller.js";
import { existePublicationById } from "../helpers/db-validator.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {uploadProfilePicture} from "../middlewares/multer-upload.js";
import {validarJWT} from "../middlewares/validar-jwt.js"


const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('username','Este no es un username valido').not().isEmpty(),
        validarCampos
    
    ],
    createPublication
)

router.get("/", getPublications);

router.get(
    "/findPublication/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ],
    getPublicationById
)

router.put(
    "/:id",
    uploadProfilePicture.single('profilePicture'),
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ],
    updatedPublication
)
router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ],
    deletePublication
)

export default router;
