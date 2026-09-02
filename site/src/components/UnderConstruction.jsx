import Image from 'next/image';
import enTravauxImg from '@/assets/images/en-travaux.png';

/**
 * Composant utilitaire "UnderConstruction".
 * Permet d'afficher une page d'attente homogène pour les sections en cours de rédaction (mentions légales, cookies, etc.).
 */
export default function UnderConstruction({ title }) {
  return (
    <main className="container py-5 text-center my-auto">
      <div className="py-4">
        {/* Titre dynamique transmis en props */}
        <h1 className="fw-bold mb-3" style={{ color: 'var(--color-secondary, #00497c)' }}>
          {title}
        </h1>
        <p className="text-muted mb-4">
          Cette page est actuellement en cours de rédaction ou de mise à jour. Elle sera très prochainement disponible.
        </p>
        <div className="my-4">
          <Image 
            src={enTravauxImg} 
            alt="Page en travaux" 
            style={{ maxWidth: '350px', width: '100%', height: 'auto' }} 
            priority
          />
        </div>
      </div>
    </main>
  );
}