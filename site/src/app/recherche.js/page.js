'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function fetchSearchResults() {
      // Si la query est vide, on vide les résultats directement sans passer par des setState superflus
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/artisans`);
        const artisans = await response.json();

        const filtered = artisans.filter((artisan) => {
          const name = (artisan.nom || artisan.name || '').toLowerCase();
          const specialty = (artisan.specialite || artisan.specialty || '').toLowerCase();
          const location = (artisan.ville || artisan.city || '').toLowerCase();
          const q = query.toLowerCase();

          return name.includes(q) || specialty.includes(q) || location.includes(q);
        });

        setResults(filtered);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: 'var(--color-secondary, #00497c)' }}>
        Résultats de recherche pour : &quot;{query}&quot;
      </h1>

      {loading ? (
        <p className="text-muted">Recherche en cours...</p>
      ) : results.length === 0 ? (
        <p className="text-muted">Aucun artisan ne correspond à votre recherche.</p>
      ) : (
        <div className="row g-4">
          {results.map((artisan) => (
            <div className="col-md-4" key={artisan.id || artisan.id_artisan}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h3 className="h5 fw-bold">{artisan.nom || artisan.name}</h3>
                  <p className="text-muted mb-2">Spécialité : {artisan.specialite || artisan.specialty}</p>
                  <p className="mb-3">📍 {artisan.ville || artisan.city}</p>
                  <Link 
                    href={`/artisans/${artisan.id || artisan.id_artisan}`} 
                    className="btn btn-outline-primary mt-auto rounded-pill"
                  >
                    Voir le profil
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-5 text-center">Chargement...</div>}>
      <SearchContent />
    </Suspense>
  );
}