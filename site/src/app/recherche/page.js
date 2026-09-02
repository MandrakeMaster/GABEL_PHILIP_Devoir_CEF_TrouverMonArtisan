'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArtisanCard from '@/components/ArtisanCard';
import { getArtisans, getSpecialites } from '@/services/artisanService'; // <-- Import des services

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilterData() {
      try {
        setLoading(true);

        // On récupère en parallèle les artisans et les spécialités via les services
        const [allArtisans, specialites] = await Promise.all([
          getArtisans(),
          getSpecialites().catch(() => []) // Fallback si les spécialités échouent
        ]);

        let specialitesMap = {};
        specialites.forEach((spec) => {
          specialitesMap[spec.id_specialite] = spec.nom;
        });

        // On enrichit chaque artisan avec le nom de sa spécialité pour le composant carte
        const artisansWithSpecialty = allArtisans.map((artisan) => ({
          ...artisan,
          specialite: specialitesMap[artisan.id_specialite] || 'Artisan'
        }));

        if (query.trim()) {
          const filtered = artisansWithSpecialty.filter((artisan) => {
            const name = artisan.nom?.toLowerCase() || '';
            const city = artisan.ville?.toLowerCase() || '';
            const postalCode = artisan.code_postal?.toString() || '';
            const specialtyName = artisan.specialite.toLowerCase();

            return (
              name.includes(query) ||
              city.includes(query) ||
              postalCode.includes(query) ||
              specialtyName.includes(query)
            );
          });
          setArtisans(filtered);
        } else {
          setArtisans([]);
        }
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAndFilterData();
  }, [query]);

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: 'var(--color-secondary, #00497c)' }}>
        Résultats de recherche pour : &quot;{query}&quot;
      </h1>

      {loading ? (
        <div className="container py-5 text-center">Recherche en cours...</div>
      ) : artisans.length === 0 ? (
        <p className="text-muted">Aucun artisan ne correspond à votre recherche.</p>
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
  );
}

export default function SearchPage() {
  return (
    <>
      <title>Résultats de recherche - Trouve ton artisan</title>
      <Suspense fallback={<div className="container py-5 text-center">Chargement...</div>}>
        <SearchContent />
      </Suspense>
    </>
  );
}