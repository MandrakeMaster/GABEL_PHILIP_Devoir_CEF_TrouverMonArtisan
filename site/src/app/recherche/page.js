'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArtisanCard from '@/components/ArtisanCard';
import { getArtisans, getSpecialites } from '@/services/artisanService'; // Import des services front-end

/**
 * Composant interne gérant la logique de recherche et le filtrage des artisans.
 * Utilise useSearchParams pour récupérer le terme saisi dans l'URL.
 */
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilterData() {
      try {
        setLoading(true);

        // Récupération en parallèle de tous les artisans et des spécialités via les services
        const [allArtisans, specialites] = await Promise.all([
          getArtisans(),
          getSpecialites().catch(() => []) // Fallback si la récupération des spécialités échoue
        ]);

        // Création d'une table de correspondance (Map) des spécialités par ID
        let specialitesMap = {};
        specialites.forEach((spec) => {
          specialitesMap[spec.id_specialite] = spec.nom;
        });

        // Enrichissement de chaque artisan avec le libellé de sa spécialité
        const artisansWithSpecialty = allArtisans.map((artisan) => ({
          ...artisan,
          specialite: specialitesMap[artisan.id_specialite] || 'Artisan'
        }));

        // Filtrage multicritères si une requête de recherche est présente
        if (query.trim()) {
          const filtered = artisansWithSpecialty.filter((artisan) => {
            const name = artisan.nom?.toLowerCase() || '';
            const city = artisan.ville?.toLowerCase() || '';
            const postalCode = artisan.code_postal?.toString() || '';
            const specialtyName = artisan.specialite.toLowerCase();

            // La recherche s'applique sur le nom, la ville, le code postal ou la spécialité
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

      {/* Affichage conditionnel selon l'état de chargement ou les résultats */}
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

/**
 * Composant principal de la page de recherche.
 * Enveloppe le contenu dans une limite Suspense (requis par Next.js pour l'utilisation de useSearchParams).
 */
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