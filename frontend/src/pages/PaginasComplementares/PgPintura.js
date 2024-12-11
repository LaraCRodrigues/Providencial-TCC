import React from 'react';
import Navbar from '../components/navbarsite';
import Pintura from '../components/componentes-pg-comple/prdPintura';
import FooterSite from '../components/footer';
import Paginacao from '../components/paginacao'

// css
import '../components/componentes-pg-comple/paginaCp.css'
const PgFerramentas = () => {
    return (
        <div>
            <Navbar />
            <Pintura/>
            <Paginacao/>
            <FooterSite/>
             
        </div>
    );
};

export default PgFerramentas;