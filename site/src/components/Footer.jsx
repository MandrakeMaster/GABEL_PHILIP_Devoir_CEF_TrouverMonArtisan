import Link from 'next/link';

/**
 * Composant du pied de page (Footer).
 * Regroupe les informations de contact institutionnelles et les liens vers les pages légales obligatoires.
 */
export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container py-4 py-md-5">
        <div className="row gy-4 align-items-center align-items-md-start justify-content-between text-center text-md-start">
          
          {/* Bloc gauche : Informations de contact et adresse officielle */}
          <div className="col-12 col-md-5">
            <p className="footer-contact-title mb-3">Contactez nous :</p>
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2 mb-3">
              <address className="footer-address mb-0">
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </address>
            </div>
            <div>
              <a href="tel:+33426734000" className="footer-phone">
                +33 (0)4 26 73 40 00
              </a>
            </div>
          </div>

          {/* Ligne de séparation visible uniquement sur support mobile (conformité Figma) */}
          <div className="col-12 d-md-none">
            <hr className="footer-divider my-1" />
          </div>

          {/* Bloc droit : Liens vers les pages légales obligatoires */}
          <div className="col-12 col-md-7">
            <div className="row gy-3">
              <div className="col-12 col-md-6">
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  <li>
                    <Link href="/mentions-legales" className="footer-link">Mentions légales</Link>
                  </li>
                  <li>
                    <Link href="/accessibilite" className="footer-link">Accessibilité</Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  <li>
                    <Link href="/donnees-personnelles" className="footer-link">Données personnelles</Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="footer-link">Cookies</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}