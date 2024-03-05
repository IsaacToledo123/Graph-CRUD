import WebHookModel from '../models/webhook'; // Importa el modelo de WebHook, asegúrate de tenerlo definido correctamente
import axios from "axios";
const notifyUserAndPostWebHook = async (event: string, data: object, message: string) => {
  try {
    // Busca los webhooks asociados al evento
    const webhooks = await WebHookModel.find({ event });

    if (webhooks.length > 0) {
      const object = { data, message };

      // Itera sobre cada webhook y envía la notificación
      for (const webhook of webhooks) {
        try {
          await axios.post(webhook.url, object);
        } catch (error) {
          console.error('Error al enviar la notificación al webhook:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error al procesar el evento y enviar notificaciones:', error);
  }
};

export default { notifyUserAndPostWebHook };
