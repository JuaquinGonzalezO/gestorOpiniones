import { response, request } from "express";
import Publication from "./publication-model.js";
import User from "../users/user.model.js";

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ username: data.username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const publication = new Publication({
            ...data,
            user: user._id
        });

        await publication.save();

        res.status(200).json({
            success: true,
            publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating publication',
            error
        });
    }
};

export const getPublications = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            publications
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting the publications',
            error
        });
    }
};

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            publication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error finding the publication',
            error
        });
    }
};

export const updatedPublication = async (req, res) => {
    try {
        const { user } = req;
        const data = req.body;
        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: "Publication not found"
            });
        }

        if (user._id.toString() !== publication.creator.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can't update this publication"
            });
        }

    const updatedPublication = await Publication.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Updated publication',
            publication: updatedPublication,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error updating publication',
            error: err.message
        });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publications = await Publication.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Publication disabled',
            publications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting the publication',
            error
        });
    }
};
