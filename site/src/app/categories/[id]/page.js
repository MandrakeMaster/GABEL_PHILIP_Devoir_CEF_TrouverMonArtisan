'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArtisanCard from '@/components/ArtisanCard';
import { getCategories } from '@/services/categoryServices'; // Import du service de gestion des catégories
import { getArtisansByCategory } from '@/services/artisanService'; // Import du service de récupération des artisans

/**
 * Composant de la page dynamique des catégories.
 * Affiche la liste des artisans rattachés à une catégorie spécifique (ex: Bâtiment, Services, etc.).
 */
export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [category, setCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Chargement asynchrone des données de la catégorie et des artisans associés 
   * via une exécution en parallèle (Promise.all).
   */
  useEffect(() => {
    async function loadCategoryData() {
      try {
        setLoading(true);
        
        // Récupération simultanée des catégories et des artisans de la catégorie (avec fallback sécurisé)
        const [categories, artisansData] = await Promise.all([
          getCategories(),
          getArtisansByCategory(categoryId).catch(() => []) // Retourne un tableau vide en cas d'erreur/404 de l'API
        ]);

        // Recherche de la catégorie correspondante dans le tableau global par son ID
        const currentCat = categories.find((c) => c.id_categorie.toString() === categoryId);
        setCategory(currentCat);
        setArtisans(artisansData);

      } catch (error) {
        console.error("Erreur lors du chargement des données de la catégorie :", error);
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId]);

  // Affichage d'un indicateur de chargement pendant la récupération des données
  if (loading) {
    return (
      <>
        <title>Chargement - Catégorie</title>
        <div className="container py-5 text-center">Chargement des artisans...</div>
      </>
    );
  }

  // Détermination dynamique du titre de la page
  const categoryTitle = category ? category.nom : "Artisans de la catégorie";

  return (
    <>
      {/* Balise title dynamique pour le référencement SEO */}
      <title>{categoryTitle} - Trouve ton artisan</title>
      <main className="container py-5">
        <h1 className="fw-bold mb-4" style={{ color: 'var(--color-secondary, #00497c)' }}>
          {categoryTitle}
        </h1>

        {/* Affichage conditionnel selon la présence ou non d'artisans */}
        {artisans.length === 0 ? (
          <p className="text-muted">Aucun artisan n’est actuellement disponible dans cette catégorie.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {artisans.map((artisan) => (
              <div className="col-12 col-md-6 col-lg-4" key={artisan.id_artisan || artisan.id}>
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}