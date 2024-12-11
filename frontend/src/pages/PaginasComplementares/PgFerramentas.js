import React from 'react';
import Navbar from '../components/navbarsite';
import Ferramentas from '../components/componentes-pg-comple/prcFerra';
import FooterSite from '../components/footer';
import Paginacao from '../components/paginacao'

// css
import '../components/componentes-pg-comple/paginaCp.css'
const PgFerramentas = () => {
    return (
        <div>
            <Navbar />
            <Ferramentas/>
            <Paginacao/>
            <FooterSite/>
             
        </div>
    );
};

export default PgFerramentas;
