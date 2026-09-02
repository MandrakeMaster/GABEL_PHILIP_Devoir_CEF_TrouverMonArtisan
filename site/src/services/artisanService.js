// site/src/services/artisanService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fonction utilitaire interne pour centraliser la gestion des réponses HTTP.
 * Vérifie le statut de la réponse et retourne les données au format JSON, 
 * ou lève une erreur en cas d'échec.
 */
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  return response.json();
}

/**
 * Récupère la liste complète des artisans depuis l'API.
 */
export async function getArtisans() {
  try {
    const response = await fetch(`${API_URL}/api/artisans`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Erreur service getArtisans :", error);
    throw error;
  }
}

/**
 * Récupère un artisan spécifique par son identifiant unique.
 * Utilisé principalement pour l'affichage de la fiche détaillée.
 */
export async function getArtisanById(id) {
  try {
    const response = await fetch(`${API_URL}/api/artisans/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erreur service getArtisanById (${id}) :`, error);
    throw error;
  }
}

/**
 * Récupère la liste des artisans rattachés à une catégorie spécifique.
 * Pointe vers la route back-end /api/artisans/categorie/:id
 */
export async function getArtisansByCategory(categoryId) {
  try {
    const response = await fetch(`${API_URL}/api/artisans/categorie/${categoryId}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erreur service getArtisansByCategory (${categoryId}) :`, error);
    throw error;
  }
}

/**
 * Récupère la sélection des artisans mis en avant ("coup de cœur" / Top 3).
 * Utilise 'cache: 'no-store'' pour garantir des données toujours actualisées sur la page d'accueil.
 */
export async function getTopArtisans() {
  try {
    const response = await fetch(`${API_URL}/api/artisans/top`, { cache: 'no-store' });
    return await handleResponse(response);
  } catch (error) {
    console.error("Erreur service getTopArtisans :", error);
    return []; // Retourne un tableau vide par défaut pour éviter de bloquer l'affichage de la page d'accueil
  }
}

/**
 * Récupère la liste globale de toutes les spécialités disponibles.
 */
export async function getSpecialites() {
  try {
    const response = await fetch(`${API_URL}/api/specialites`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Erreur service getSpecialites :", error);
    throw error;
  }
}

/**
 * Envoie un message de contact destiné à un artisan spécifique.
 * Transmet les données du formulaire (nom, email, objet, message) via une requête POST.
 */
export async function sendContactMessage(artisanId, contactData) {
  try {
    const response = await fetch(`${API_URL}/api/artisans/${artisanId}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erreur HTTP: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Erreur service sendContactMessage :", error);
    throw error;
  }
}