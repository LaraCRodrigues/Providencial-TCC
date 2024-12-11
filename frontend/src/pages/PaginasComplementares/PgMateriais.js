import React from 'react';
import Navbar from '../components/navbarsite';
import Produtos from '../components/componentes-pg-comple/prdMater';
import FooterSite from '../components/footer';
import Paginacao from '../components/paginacao'

// css
import '../components/componentes-pg-comple/paginaCp.css'
const PgMateriais = () => {
    return (
        <div>
            <Navbar />
            <Produtos/>
            <Paginacao/>
            <FooterSite/>
             
        </div>
    );
};

export default PgMateriais;
