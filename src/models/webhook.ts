import mongoose, { Schema } from 'mongoose'; // Importa Schema de mongoose

const WebHookSchema = new mongoose.Schema({
  url: { type: String, required: true },
  event: { type: String, required: true },
  userId: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' } 
});

const WebHook = mongoose.model('WebHook', WebHookSchema);

export default WebHook;
