import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/Logo.png'; // Utilise ton logo existant

export default function NotFound() {
  return (
    <main className="container py-5 text-center my-auto">
      <div className="py-5">
        {/* Affichage de ton logo */}
        <div className="mb-4">
          <Image src={logo} alt="Logo Trouve ton artisan" width={180} height={60} style={{ height: 'auto' }} priority />
        </div>
        
        <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
        <h2 className="fw-bold mb-3" style={{ color: 'var(--color-secondary, #00497c)' }}>
          Oups, la page que vous demandez n'existe pas.
        </h2>
        <p className="text-muted mb-4">
          Il semble que vous ayez emprunté un mauvais chemin. Laissez-nous vous remettre sur la bonne voie.
        </p>
        <Link href="/" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
          Retourner à l'accueil
        </Link>
      </div>
    </main>
  );
}