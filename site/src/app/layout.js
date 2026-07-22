import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Trouve ton Artisan',
  description: 'Site de recherche d artisans',
};

// C'est ici que se joue la différence : on destructure l'objet avec { children }
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}