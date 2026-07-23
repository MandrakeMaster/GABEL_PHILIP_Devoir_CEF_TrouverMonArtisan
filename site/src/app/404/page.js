import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="container py-5 text-center my-auto">
      <div className="py-5">
        {/* Tu peux adapter le chemin de ton logo si nécessaire */}
        <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
        <h2 className="fw-bold mb-3" style={{ color: 'var(--color-secondary, #00497c)' }}>
          Oups, la page que vous demandez n’existe pas.
        </h2>
        <p className="text-muted mb-4">
          Il semble que vous ayez emprunté un chemin de traverse. Laissez-nous vous remettre sur la bonne voie.
        </p>
        <Link href="/" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
          Retourner à l’accueil
        </Link>
      </div>
    </main>
  );
}