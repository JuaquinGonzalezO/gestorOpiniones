import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { existeCommentById } from "../helpers/db-validator.js";
import {createComment, deleteComment, updateComment} from "./comments-controller.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();


router.post(
    "/",
    [
        validarJWT,
        check('username','Este no es un username valido').not().isEmpty(),
        validarCampos
    
    ],
    createComment
)


router.put(
    "/:id",
    uploadProfilePicture.single('profilePicture'),
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCommentById),
        validarCampos
    ],
    updateComment
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id","No es un Id valido").isMongoId(),
        check("id").custom(existeCommentById),
        validarCampos
    ],
    deleteComment
)

export default router;