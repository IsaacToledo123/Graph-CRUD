import User from "../models/users.model";
import Channel from "../models/channels.model";
import Video from "../models/videos.model";
import { error } from "console";


const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("channel");
    },
    user: async (__: void, args: any) => {
      const id = args.id

      return await User.findById(id).populate("channel");
    },
    channels: async () => {
      return await Channel.find().populate("videos");
    },
    channel: async (__: void, args: any) => {
      const id = args.id
      return await Channel.findById(id).populate("videos");
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
      const {email,password,name}=args.UserInput
    },
    createChannel: async (__: void, args: any) => {
    },
    createVideo: async (__: void, args: any) => {
    },
    deleteChannel: async (__: void, args: any) => {
      try {
        const id = args.id;
        const channelE = await Channel.findByIdAndDelete(id)
        if (!channelE) {
          throw new Error("no existe ese canal")
        }
        return "eliminado correctamente"
      } catch (error) {
        throw new Error(`Error al eliminar el canal`);
      }

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