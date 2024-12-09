import React from 'react';
import { Link } from 'react-router-dom';
import '../cssAdm/barralateral.css';


const SidebarAdm = ({ logoSrc, links = [], alternarBarra, isOpen }) => (
  <div className={`sidebar ${isOpen ? 'aberta' : 'fechada'}`}>
    <div className="container-logo">
      <img src={logoSrc} alt="Logo Providencial" />
      <button className="botao-toggle" onClick={alternarBarra}>
        <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
      </button>
    </div>
    <ul>
      {links.map(({ href, icon, label, className }, index) => (
        <li key={index} className={className}>
          <Link to={href}>
            <i className={`bi ${icon}`}></i>
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SidebarAdm;
