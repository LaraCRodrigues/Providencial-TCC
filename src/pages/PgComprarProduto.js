import React from 'react';
import Navbar from './components/navbarsite';
import ComprarProduto from './components/blococompraproduto';
import ProdutosRelacionados from './components/subcomponents/produtosrelacionados';
import FooterSite from './components/footer';

const PgComprarProduto = () => {
    return (
        <div>
            <Navbar />
            <ComprarProduto/>
            <ProdutosRelacionados/>
            <FooterSite/>
        </div>
    );
};

export default PgComprarProduto;
