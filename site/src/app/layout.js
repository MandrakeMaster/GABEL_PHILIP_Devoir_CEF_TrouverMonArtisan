import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/main.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import de tes favicons depuis ton dossier assets
import favicon16 from '../assets/images/favicon.png';
import favicon32 from '../assets/images/favicon-32.png';

export const metadata = {
  title: 'Trouve ton Artisan',
  description: 'Site de recherche d artisans',
  icons: {
    icon: [
      { url: favicon16.src, sizes: '16x16' },
      { url: favicon32.src, sizes: '32x32' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="site-wrapper">
          <Header />
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}