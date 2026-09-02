'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getArtisanById, sendContactMessage, getSpecialites } from '@/services/artisanService';

/**
 * Composant de la page de détail d'un artisan.
 * Affiche les informations complètes de l'artisan (profil, description, note, site web) 
 * ainsi qu'un formulaire de contact interactif validé et sécurisé.
 */
export default function ArtisanDetailPage() {
  const params = useParams();
  const id = params.id;

  const [artisan, setArtisan] = useState(null);
  const [specialiteNom, setSpecialiteNom] = useState('Artisan');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // État de chargement pour la soumission du formulaire

  // État local pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  /**
   * Chargement asynchrone optimisé des données de l'artisan et des spécialités 
   * via un appel groupé (Promise.all).
   */
  useEffect(() => {
    async function loadArtisanDetails() {
      try {
        setLoading(true);
        const [artisanData, specialites] = await Promise.all([
          getArtisanById(id),
          getSpecialites()
        ]);

        setArtisan(artisanData);

        // Association du nom de la spécialité correspondante à partir de son ID
        const foundSpec = specialites.find(s => s.id_specialite === artisanData.id_specialite);
        if (foundSpec) {
          setSpecialiteNom(foundSpec.nom);
        }
      } catch (error) {
        console.error("Erreur chargement détails artisan :", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadArtisanDetails();
    }
  }, [id]);

  /**
   * Met à jour dynamiquement l'état local du formulaire lors de la saisie utilisateur.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Valide rigoureusement les champs du formulaire côté client 
   * et transmet les données à l'API via le service de contact.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });

    // Validation du champ Nom (2 caractères minimum)
    if (!formData.nom || formData.nom.trim().length < 2) {
      setFormStatus({ type: 'error', message: 'Le nom doit contenir au moins 2 caractères.' });
      return;
    }

    // Validation du format de l'Email par RegEx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Votre email est obligatoire et doit être valide.' });
      return;
    }

    // Validation de l'Objet (5 caractères minimum)
    if (!formData.objet || formData.objet.trim().length < 5) {
      setFormStatus({ type: 'error', message: "L'objet du message doit contenir au moins 5 caractères." });
      return;
    }

    // Validation du Message (10 caractères minimum)
    if (!formData.message || formData.message.trim().length < 10) {
      setFormStatus({ type: 'error', message: 'Le message doit contenir au moins 10 caractères.' });
      return;
    }

    try {
      setIsSubmitting(true);

      // Envoi sécurisé des données au back-end
      await sendContactMessage(id, formData);

      setFormStatus({ type: 'success', message: 'Message envoyé avec succès à l\'artisan !' });
      setFormData({ nom: '', email: '', objet: '', message: '' }); // Réinitialisation du formulaire
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Affichage d'un loader pendant la récupération des données
  if (loading) {
    return (
      <>
        <title>Chargement - Fiche artisan</title>
        <div className="container py-5 text-center">Chargement des informations...</div>
      </>
    );
  }

  // Affichage d'un message si l'artisan n'existe pas
  if (!artisan) {
    return (
      <>
        <title>Artisan non trouvé</title>
        <div className="container py-5 text-center text-danger">Artisan non trouvé.</div>
      </>
    );
  }

  const note = Number(artisan.note) || 0;
  const artisanImage = artisan.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";

  return (
    <>
      <title>{artisan.nom} - Fiche artisan</title>
      <main className="container py-5">
        <div className="row g-4 justify-content-center align-items-start">
          
          {/* Bloc 1 : Informations détaillées de l'artisan */}
          <div className="col-12 col-lg-7">
            <div className="artisan-detail-card p-4 text-center">
              
              <div className="mb-4 position-relative d-inline-block rounded-3 overflow-hidden" style={{ width: '100%', maxWidth: '380px', height: '230px' }}>
                <img 
                  src={artisanImage} 
                  alt={artisan.nom} 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>

              <h1 className="fw-bold mb-2">
                {artisan.nom}
              </h1>

              {/* Affichage dynamique des étoiles de notation */}
              <div className="stars mb-1 fs-5" aria-label={`Note de ${note} sur 5`}>
                {[1, 2, 3, 4, 5].map((index) => {
                  if (note >= index) {
                    return <span key={index} className="text-warning">★</span>;
                  } else if (note >= index - 0.5) {
                    return <span key={index} className="text-warning">⯪</span>;
                  } else {
                    return <span key={index} className="text-muted">☆</span>;
                  }
                })}
              </div>
              
              <p className="fw-bold mb-3">{note}/5</p>

              <p className="text-muted fw-medium mb-4">
                {specialiteNom} - {artisan.ville}
              </p>

              <div className="text-start px-md-3">
                <h3 className="fw-bold fs-5 mb-2" style={{ color: 'var(--color-secondary, #00497c)' }}>
                  A propos de nous :
                </h3>
                <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                  {artisan.description}
                </p>
              </div>

            </div>
          </div>

          {/* Bloc 2 : Formulaire de contact et site web de l'artisan */}
          <div className="col-12 col-lg-5">
            <div className="contact-card p-4">
              <h2 className="fw-bold fs-4 text-center mb-4">
                Nous contacter :
              </h2>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label small fw-semibold text-muted mb-1">Votre nom :</label>
                  <input 
                    type="text" 
                    name="nom"
                    className="form-control" 
                    placeholder="Entrez votre nom..." 
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>2 caractères minimum</small>
                </div>

                <div>
                  <label className="form-label small fw-semibold text-muted mb-1">Votre email :</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Entrez votre email..." 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>Format email valide requis</small>
                </div>

                <div>
                  <label className="form-label small fw-semibold text-muted mb-1">Objet du message :</label>
                  <input 
                    type="text" 
                    name="objet"
                    className="form-control" 
                    placeholder="Entrez l'objet du message..." 
                    value={formData.objet}
                    onChange={handleChange}
                  />
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>5 caractères minimum</small>
                </div>

                <div>
                  <label className="form-label small fw-semibold text-muted mb-1">Votre message :</label>
                  <textarea 
                    name="message"
                    className="form-control" 
                    rows="4" 
                    placeholder="Entrez votre message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>10 caractères minimum</small>
                </div>

                {/* Bouton de soumission avec désactivation conditionnelle pendant l'envoi */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 fw-bold py-2 mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>

              {/* Message de retour (Succès ou Erreur) */}
              {formStatus.message && (
                <div className={`mt-3 p-2 text-center rounded border ${formStatus.type === 'success' ? 'text-success border-success bg-light' : 'text-danger border-danger bg-light'}`} style={{ fontSize: '0.9rem' }}>
                  {formStatus.message}
                </div>
              )}

              {/* Lien vers le site web externe de l'artisan (sécurisé) */}
              {artisan.site_web && (
                <div className="text-center mt-4 pt-3 border-top">
                  <p className="fw-semibold mb-1 text-muted">Visitez notre site :</p>
                  <a 
                    href={artisan.site_web} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-decoration-none fw-bold text-primary"
                  >
                    {artisan.site_web}
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </>
  );
}