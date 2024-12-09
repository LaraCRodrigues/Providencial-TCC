import React, { useState } from 'react';
import SidebarAdm from './componentsAdm/barralateral'; 
import BlocoAddAdm from './componentsAdm/BlocoAddAdm'; 
import Grafico from './componentsAdm/graficoAdm'; 


const DashAdm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const alternarBarra = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const links = [

    { href: '/gerenP', icon: 'bi-house', label: 'Início', className: '' },
    { href: '/gerenDash', icon: 'bi-speedometer2', label: 'Dashboard', className: '' },
    { href: '/configuracao', icon: 'bi-gear', label: 'Configuração', className: '' },
    { href: '/login', icon: 'bi-box-arrow-left', label: 'Sair', className: 'link-sair' },
  ];

  return (
    <div>
      <SidebarAdm
        logoSrc="/Imagens/Logos Providencial/Providencial logo 2.png"
        links={links}
        alternarBarra={alternarBarra}
        isOpen={isSidebarOpen}
      />
      <BlocoAddAdm/>


      <Grafico/>


    </div>
  );
};

export default DashAdm;
