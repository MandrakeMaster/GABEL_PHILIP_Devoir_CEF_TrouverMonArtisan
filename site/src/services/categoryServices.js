// site/src/services/categoryServices.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fonction utilitaire interne pour centraliser la gestion des réponses HTTP.
 */
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  return response.json();
}

/**
 * Récupère la liste complète des catégories depuis l'API.
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Erreur service getCategories :", error);
    throw error;
  }
}