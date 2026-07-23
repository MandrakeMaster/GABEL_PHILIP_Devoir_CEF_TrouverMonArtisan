import Link from 'next/link';

export default function ArtisanCard({ artisan }) {
  const specialiteNom = artisan.specialite || artisan.Specialite?.nom || 'Artisan';
  const villeNom = artisan.ville || artisan.localisation || '';
  const note = Number(artisan.note) || 0;

  return (
    <Link href={`/artisan/${artisan.id_artisan || artisan.id}`} className="text-decoration-none d-block">
      <div className="artisan-card py-3 px-4 text-center d-flex flex-column justify-content-between">
        <div>
          <h3 className="artisan-name mb-1">
            {artisan.nom}
          </h3>
          <p className="artisan-info mb-2">
            {specialiteNom} - {villeNom}
          </p>
        </div>

        <div className="mt-auto">
          {/* Affichage professionnel des étoiles avec gestion des décimales (plein, demi, vide) */}
          <div className="stars mb-1" aria-label={`Note de ${note} sur 5`}>
            {[1, 2, 3, 4, 5].map((index) => {
              if (note >= index) {
                return <span key={index} className="star-full">★</span>;
              } else if (note >= index - 0.5) {
                return <span key={index} className="star-half">⯪</span>;
              } else {
                return <span key={index} className="star-empty">☆</span>;
              }
            })}
          </div>
          <span className="note-text">
            {note}/5
          </span>
        </div>
      </div>
    </Link>
  );
}