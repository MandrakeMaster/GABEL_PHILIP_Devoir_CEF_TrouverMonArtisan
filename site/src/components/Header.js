'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoArtisan from '../assets/images/Logo.png';
import searchIcon from '../assets/images/icon-search.svg';
import burgerIcon from '../assets/images/icon-burger.svg';

import '../assets/styles/style.scss';
import '../assets/styles/header.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        const data = await response.json();
        console.log("Données reçues de l'API :", data);
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Le Logo avec priority pour le LCP */}
        <Link href="/" className="logo-link">
          <Image src={logoArtisan} alt="Logo Trouve ton artisan" className="logo" priority />
        </Link>

        {/* Navigation Desktop */}
        <div className="desktop-nav">
          <nav>
            <ul className="category-list">
              {loading ? (
                <li>Chargement...</li>
              ) : (
                categories.map((cat) => (
                  <li key={cat.id_categorie}>
                    <Link href={`/categories/${cat.id_categorie}`}>
                      {cat.nom}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </nav>

          <form role="search" className="search-bar">
            <input type="search" placeholder="Rechercher" />
          </form>
        </div>

        {/* Navigation Mobile */}
        <div className="mobile-nav">
          <button type="button" aria-label="Rechercher" className="search-btn">
            <Image src={searchIcon} alt="Recherche" width={24} height={24} />
          </button>

          <button 
            type="button" 
            aria-label="Menu" 
            className="burger-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image src={burgerIcon} alt="Menu" width={24} height={24} />
            <span className="menu-text">Menu</span>
          </button>
        </div>

      </div>

      {/* Le Menu Déroulant Mobile */}
      <div className={`mobile-menu-dropdown ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-category-list">
          {categories.map((cat) => (
            <li key={cat.id_categorie}>
              <Link href={`/categories/${cat.id_categorie}`} onClick={() => setIsMenuOpen(false)}>
                {cat.nom}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}