import React from 'react';
import Navbar from './components/navbarsite';
import FooterSite from './components/footer';
import Paginacao from './components/paginacao';

import BarraCategoriasPesquisa from './components/barracategoriaspesquisa';
import ProdutosPesquisa from './components/produtosCardspesquisa';

import './styles/paginaPesquisa.css';
const PgPesquisaProduto = () => {
    return (
        <div>
            <Navbar />
            <BarraCategoriasPesquisa/>
            <ProdutosPesquisa/>
            <Paginacao/>
            <FooterSite/>
        </div>
    );
};

export default PgPesquisaProduto;
