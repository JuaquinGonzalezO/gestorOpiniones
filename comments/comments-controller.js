import { response, request } from "express";
import Comment from "./comments-model.js";
import User from "../users/user.model.js";


export const createComment = async(req, res)=>{
    try {
        const data = req.body;
        const user = await User.findOne({username: data.username});
        console.log(user);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }


        const comment = new Comment({
            ...data,
            user: user._id
        });


        await comment.save();
        res.status(200).json({
            success: true,
            comment
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'error creating comment',
            error
        })
        
    }
}

export const updateComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, name, ...data } = req.body;

  
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

      
        comment.content = data.content;  
        await comment.save();

  
        res.status(200).json({
            success: true,
            msg: 'Updated comment',
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error updating comment',
            error: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findByIdAndUpdate(
            id, 
            { estado: false },
            { new: true } 
        );
        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: 'Comentario no encontrado'
            });
        }
        const authenticatedComments = req.user; 

        res.status(200).json({
            success: true,
            msg: 'Comentario marcado como no activo',
            comment,
            authenticatedComments
        });
    } catch (error) {
        console.error(error);  
        res.status(500).json({
            success: false,
            msg: 'Error al intentar actualizar el comentario',
            error: error.message
        });
    }
};
