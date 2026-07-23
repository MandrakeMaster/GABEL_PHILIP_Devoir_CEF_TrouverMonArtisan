'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoArtisan from '@/assets/images/Logo.png';
import iconBurger from '@/assets/images/icon-burger.svg';
import iconSearch from '@/assets/images/icon-search.svg';

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Recherche lancée");
  };

  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-md navbar-light container py-3">
        
        <Link href="/" className="navbar-brand d-flex align-items-center logo-link me-2">
          <Image 
            src={logoArtisan} 
            alt="Logo Trouve ton artisan" 
            width={150} 
            height={40} 
            style={{ width: 'auto', height: 'auto' }} 
            priority 
          />
        </Link>

        {/* Boutons mobiles dissociés avec icônes agrandies */}
        <div className="d-flex align-items-center gap-3 ms-auto d-md-none">
          <button 
            type="button" 
            className="btn border-0 p-0 search-mobile-toggle d-flex align-items-center"
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              setIsMobileMenuOpen(false);
            }}
            aria-label="Ouvrir la recherche"
          >
            <Image src={iconSearch} alt="Recherche" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
          </button>

          <button 
            className="navbar-toggler border-0 p-0 burger-toggle d-flex align-items-center" 
            type="button" 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsMobileSearchOpen(false);
            }}
            aria-label="Ouvrir le menu"
          >
            <Image src={iconBurger} alt="Menu" width={32} height={32} style={{ width: 'auto', height: 'auto' }} />
          </button>
        </div>

        {/* Navigation principale pour Desktop / Tablette */}
        <div className="collapse navbar-collapse justify-content-end align-items-center d-none d-md-flex" id="navbarContent">
          <ul className="navbar-nav mb-0 me-3 d-flex align-items-center flex-row">
            {loading ? (
              <li className="nav-item"><span className="nav-link text-muted">Chargement...</span></li>
            ) : (
              categories.map((cat) => (
                <li className="nav-item" key={cat.id_categorie}>
                  <Link href={`/categories/${cat.id_categorie}`} className="nav-link fw-medium">
                    {cat.nom}
                  </Link>
                </li>
              ))
            )}
          </ul>

          <form className="search-form align-items-center d-flex" role="search" onSubmit={handleSearchSubmit}>
            <div className="position-relative w-100">
              <input className="form-control form-control-sm" type="search" placeholder="Rechercher..." />
              <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent p-2 search-btn">
                <Image src={iconSearch} alt="Valider" width={16} height={16} style={{ width: 'auto', height: 'auto' }} />
              </button>
            </div>
          </form>
        </div>
      </nav>

      {/* Menu Burger déroulant mobile */}
      {isMobileMenuOpen && (
        <div className="container d-md-none pb-3 mobile-dropdown-menu">
          <ul className="navbar-nav text-center py-2">
            {loading ? (
              <li className="nav-item"><span className="nav-link text-muted">Chargement...</span></li>
            ) : (
              categories.map((cat) => (
                <li className="nav-item py-1" key={cat.id_categorie}>
                  <Link 
                    href={`/categories/${cat.id_categorie}`} 
                    className="nav-link fw-medium" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.nom}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Barre de recherche mobile déroulante */}
      {isMobileSearchOpen && (
        <div className="container d-md-none pb-3 mobile-dropdown-search">
          <form className="search-form w-100" role="search" onSubmit={handleSearchSubmit}>
            <div className="position-relative w-100">
              <input className="form-control form-control-sm" type="search" placeholder="Rechercher..." autoFocus />
              <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent p-2 search-btn">
                <Image src={iconSearch} alt="Valider" width={16} height={16} style={{ width: 'auto', height: 'auto' }} />
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}