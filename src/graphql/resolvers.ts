import User from "../models/User";
import Comment from "../models/Comment";
import Video from "../models/Video";
import { error } from "console";
import { constants } from "buffer";


const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("channel");
    },
    user: async (__: void, args: any) => {
      const id = args.id
      return await User.findById(id)
    },
   
    videos: async () => {
      return await Video.find().populate("channel");
    },
    video: async (__: void, args: any) => {
      const id = args.id
      return await Video.findById(id).populate("channel");
    },
  },
  Mutation: {
    createUser: async (__: void, args: any) => {
      const password=args.UserInput.password
      const email=args.UserInput.email
      const name=args.UserInput.name 
     
      
      try {
        // Crear una nueva instancia del modelo User
        const newUser = new User({name,email,password });
    
        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();
  
        return savedUser;
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Error('Error al crear el usuario');
      }
    

    },
 
    createVideo: async (__: void, args: any) => {
    },

    deleteVideo: async (__: void, args: any) => {
      try {
        const id = args.id;
        const channelE = await Video.findByIdAndDelete(id)
        if (!channelE) {
          throw new Error("no existe")
        }
        return "eliminado correctamente"
      } catch (error) {
        throw new Error(`Error al eliminar el video`);
      }

    },
    deleteUser: async (__: void, args: any) => {
      try {
        const id = args.id;
        const channelE = await User.findByIdAndDelete(id)
        if (!channelE) {
          throw new Error("no existe ")
        }
        return "eliminado correctamente"
      } catch (error) {
        throw new Error(`Error al eliminar `);
      }

    },
    updateUser: async (__: void, args: any) => {
      try {
        const { id, nombre, password } = args.updateUsuario;
        const usuario = await User.findById(id);
        if (!usuario) {
          throw new Error('No se encontró el usuario');
        }
        if (nombre) {
          usuario.name = nombre; 
        }
        if (password) {
          usuario.password = password;
        }
        
        await usuario.save();
        return "actualizado";
      } catch (error) {
        throw new Error(`Error al actualizar el usuario`);
      }
    }



  },
};


export { resolvers };