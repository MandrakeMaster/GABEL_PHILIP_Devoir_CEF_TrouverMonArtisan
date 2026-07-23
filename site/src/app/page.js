import ArtisanCard from '@/components/ArtisanCard';

export const metadata = {
  title: 'Accueil | Trouve ton Artisan',
  description: 'Trouvez facilement un artisan qualifié en région Auvergne-Rhône-Alpes et contactez-le en quelques clics.',
};

async function getTopArtisans() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${API_URL}/api/artisans/top`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des artisans du mois');
    }
    return await res.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
}

export default async function Home() {
  const artisansMois = await getTopArtisans();

  return (
    <div className="home-page py-4 py-md-5">
      {/* Section 1 : Comment trouver mon artisan ? (Sans cadres, épuré) */}
      <section className="container mb-5 text-center">
        <h1 className="fw-bold mb-5" style={{ color: 'var(--color-secondary, #00497c)' }}>
          Comment trouver mon artisan ?
        </h1>
        
        <ol className="list-unstyled row g-4 justify-content-center">
          <li className="col-12 col-md-6 col-lg-3">
            <div className="px-3 h-100">
              <span className="d-block fw-bold fs-2 text-primary mb-2">1</span>
              <p className="mb-0 text-muted">Choisir la catégorie d’artisanat dans le menu.</p>
            </div>
          </li>
          <li className="col-12 col-md-6 col-lg-3">
            <div className="px-3 h-100">
              <span className="d-block fw-bold fs-2 text-primary mb-2">2</span>
              <p className="mb-0 text-muted">Choisir un artisan.</p>
            </div>
          </li>
          <li className="col-12 col-md-6 col-lg-3">
            <div className="px-3 h-100">
              <span className="d-block fw-bold fs-2 text-primary mb-2">3</span>
              <p className="mb-0 text-muted">Le contacter via le formulaire de contact.</p>
            </div>
          </li>
          <li className="col-12 col-md-6 col-lg-3">
            <div className="px-3 h-100">
              <span className="d-block fw-bold fs-2 text-primary mb-2">4</span>
              <p className="mb-0 text-muted">Une réponse vous sera apportée sous 48h.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Section 2 : Les artisans du mois (Top 3 avec les cartes ovales bleues) */}
      <section className="container">
        <h2 className="text-center fw-bold mb-4" style={{ color: 'var(--color-secondary, #00497c)' }}>
          Les artisans du mois
        </h2>

        {artisansMois.length === 0 ? (
          <p className="text-center text-muted">Chargement des artisans ou indisponibilité de l’API...</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {artisansMois.map((artisan) => (
              <div className="col-12 col-md-6 col-lg-4" key={artisan.id || artisan.id_artisan}>
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}