import api from './api';

export const postAnnonce = async (data :any) => {
    try {
        const response = await api.post('/announcers', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log("Réponse de l'API add annonce :", response.data);
        return response;
      } catch (error) {
        console.error('Erreur lors de la soumission :', error);
      }
}
