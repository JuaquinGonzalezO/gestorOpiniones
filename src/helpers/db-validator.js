import User from '../users/user.model.js';


export const existenteEmail = async (correo = ' ') => {

    const existeEmail = await User.findOne({ correo });

    if(existeEmail){
        throw new Error(`El correo ${ correo } ya existe en la base de datos`);
    }
}

export const existeUsuarioById = async (id = "") => {
    const existeUsuario = await User.findById(id);
 
    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe b`)
    }
}

export const existePublicationById = async (id = "") => {
    const existePublication = await User.findById(id);
 
    if(!existePublication){
        throw new Error(`El ID ${id} no existe `)
    }
}

export const existeCommentById = async (id = "") =>{
    const existeComment = await User.findById(id);

    if(!existeComment){
        throw new Error (`El Id ${id} no existe`)
    }
}

export const existeCategoryById = async (id = "")=>{
    const existeCategory = await User.findById(id);
    if(!existeCategory){
        throw new Error (`El Id ${id} not exist`)
        
    }
}