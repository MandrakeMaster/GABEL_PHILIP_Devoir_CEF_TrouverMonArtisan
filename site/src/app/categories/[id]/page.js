'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArtisanCard from '@/components/ArtisanCard';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [category, setCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function fetchCategoryData() {
      try {
        const catResponse = await fetch(`${API_URL}/api/categories`);
        const categories = await catResponse.json();
        const currentCat = categories.find((c) => c.id_categorie.toString() === categoryId);
        setCategory(currentCat);

        const artisansResponse = await fetch(`${API_URL}/api/artisans/categorie/${categoryId}`);
        
        if (artisansResponse.ok) {
          const data = await artisansResponse.json();
          setArtisans(data);
        } else {
          setArtisans([]);
        }

      } catch (error) {
        console.error("Erreur lors du chargement des données de la catégorie :", error);
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <>
        <title>Chargement - Catégorie</title>
        <div className="container py-5 text-center">Chargement des artisans...</div>
      </>
    );
  }

  const categoryTitle = category ? category.nom : "Artisans de la catégorie";

  return (
    <>
      <title>{categoryTitle} - Trouve ton artisan</title>
      <main className="container py-5">
        <h1 className="fw-bold mb-4" style={{ color: 'var(--color-secondary, #00497c)' }}>
          {categoryTitle}
        </h1>

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