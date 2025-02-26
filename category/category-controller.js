import Category from './category-model.js'
import Publication from '../publications/publication-model.js';


export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        
        if (!data.name || !data.description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
        }

        const category = await Category.create(data);

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (err) {
        console.error("Error creating category:", err);
        return res.status(500).json({
            success: false,
            message: "Category creation failed",
            error: err.message
        });
    }
};


export const updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const category = await Category.findByIdAndUpdate(id, data, { new: true }); 

        return res.status(200).json({
            success: true,
            message: 'Updated category',
            category
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: err.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });
        const defaultCategory = await Category.findOne({ name: 'default' });

        const publications = await Publication.find({ category: id });

        await Promise.all(
            publications.map(async (publication) => {
                publication.category = defaultCategory._id;
                return publication.save();
            })
        );

        return res.status(200).json({
            success: true,
            message: 'Deleted category',
            category
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: err.message
        });
    }
}