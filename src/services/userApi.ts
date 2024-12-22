import { setStoreValue } from 'pulsy';
import api from './api';

/**
 * Effectue une requête de login
 * @param email - L'email de l'utilisateur
 * @param password - Le mot de passe de l'utilisateur
 * @param rememberME - Indique si le token doit être stocké de façon persistante
 * @returns Les données de la réponse si le login est réussi
 * @throws Une erreur si le login échoue
 */
export const login = async (
  email: string,
  password: string,
  rememberME: boolean
) => {
  try {
    // Effectuer la requête de login
    const response = await api.post('auth/login', { email, password });

    // Vérifier si la réponse est valide
    if (response.status === 200 && response.data?.authorisation?.token) {
      const token = response.data.authorisation.token;

      // Stocker le token selon le choix de l'utilisateur
      if (rememberME) {
        localStorage.setItem('token', token); // Stockage persistant
      } else {
        sessionStorage.setItem('token', token); // Stockage temporaire
      }

      return response.data;
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error: any) {
    console.error('Login failed:', error?.message || error);
    throw new Error('Login failed, please try again');
  }
};

/**
 * Effectue une requête d'inscription
 * @param username - Le nom de l'utilisateur
 * @param email - L'email de l'utilisateur
 * @param password - Le mot de passe de l'utilisateur
 * @param phone_number - Le numéro de téléphone de l'utilisateur
 * @returns Les données de la réponse si l'inscription est réussie
 * @throws Une erreur si l'inscription échoue
 */
export const register = async (
  username: string,
  email: string,
  password: string,
  phone_number: string
) => {
  try {
    // Effectuer la requête d'inscription
    const response = await api.post('auth/register/', {
      username,
      email,
      password,
      phone_number,
    });

    // Vérifier si la réponse contient un token
    if (response.status === 200 && response.data?.authorisation?.token) {
      setStoreValue('token', response.data.authorisation.token);
      return response.data;
    } else {
      throw new Error('Invalid registration response');
    }
  } catch (error: any) {
    console.error('Registration failed:', error?.message || error);
    throw new Error('Registration failed, please try again');
  }
};

/**
 * Valide un code de vérification d'email
 * @param code - Le code de vérification
 * @throws Une erreur si la validation échoue
 */
export const validateEmailCode = async (code: string) => {
  try {
    // Effectuer la requête de validation
    const response = await api.post(`/verify-email/`, { code });

    // Mettre à jour le store si la validation est réussie
    if (response.status === 200) {
      setStoreValue('user', (user:any) => ({
        ...user,
        email_verified: true,
      }));
    } else {
      throw new Error('Invalid email verification response');
    }
  } catch (error: any) {
    console.error('Email validation error:', error?.message || error);
    throw new Error('Email verification failed, please try again');
  }
};

//list paginated users
export const getUsers = async (page: number, size: number) => {
  const response = await api.get(`users?page=${page}&size=${size}`);
  const data = await response.data;
  return data;
};

//get user by id
export const getUser = async (id: number) => {
  const response = await api.get(`users/${id}`);
  const data = await response.data;
  return data;
};

/**
 * Déconnecte l'utilisateur en supprimant le token et réinitialisant l'état utilisateur
 */
export const logoutUser = () => {
  try {
    // Supprimer le token des stockages persistants et temporaires
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Réinitialiser la valeur du token dans le store
    setStoreValue('token', null);

    // Optionnel : Réinitialiser les autres parties du store utilisateur si nécessaire
    setStoreValue('user', null);

    console.log('User logged out successfully');
  } catch (error: any) {
    console.error('Logout failed:', error?.message || error);
  }
};

/**
 * Valide un code de vérification pour un numéro de téléphone
 * @param phone_number - Le numéro de téléphone à vérifier
 * @param code - Le code de validation
 * @returns Un booléen indiquant le succès de la validation
 * @throws Une erreur si la validation échoue
 */
export const validatePhoneCode = async (
  phone_number: string,
  code: string
): Promise<boolean> => {
  try {
    // Effectuer la requête de validation
    const response = await api.post(`/verify-phone/`, { phone_number, code });

    // Vérifier la réponse et mettre à jour le statut de vérification
    if (response.status === 200) {
      setStoreValue('user', (user:any) => ({
        ...user,
        phone_verified: true, // Mettre à jour l'état de vérification dans le store
      }));
      console.log('Phone number validated successfully');
      return true;
    } else {
      console.warn('Phone validation failed: Invalid response');
      return false;
    }
  } catch (error: any) {
    console.error('Phone validation error:', error?.message || error);
    throw new Error('Phone verification failed, please try again');
  }
};
