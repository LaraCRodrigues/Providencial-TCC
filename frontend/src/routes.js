import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import PgPrincipal from './pages/Pgprincipal';
import PgProdutos from './pages/PgProdutos';
import PgLogin from './pages/PgLogin';
import PgCadastrar from './pages/PgCadastrar';
import PgComprarProduto from './pages/PgComprarProduto';
import PgEletrica from './pages/PaginasComplementares/PgEletrica';
import PgMateriais from './pages/PaginasComplementares/PgMateriais';
import PgFerramentas from './pages/PaginasComplementares/PgFerramentas';
import PgPintura from './pages/PaginasComplementares/PgPintura';
import Pgpagamento from './pages/PgPagamento';
import AppPagamento from './pages/AppPagamento';

import Carrinho from './pages/components/subcomponents/carrinho';
// adm

import PgprincAdm from './pages/pagesAdm/PgprincAdm';
import PgDashAdm from './pages/pagesAdm/PgDashAdm';
import QrCode from './pages/QrCode';

//const myRef = useRef(null);

const App = () => {
    return (
        <Router future={{ v7_startTransition: true }}>
            <Routes>


                <Route path="/comprar" element={<PgComprarProduto />} />
                <Route path="/" element={<PgPrincipal />} />
                <Route path="/loja" element={<PgProdutos />} />
                <Route path="/pagamento" element={<Pgpagamento />} />
                <Route path="/login" element={<PgLogin/>}/>
                 <Route path="/cadastrar" element={<PgCadastrar />} />
                <Route path="/Eletrica" element={<PgEletrica />} />
                <Route path="/Materiais" element={<PgMateriais />} />
                <Route path="/Ferramentas" element={<PgFerramentas />} />
                 <Route path="/Pintura" element={<PgPintura />} /> 
                 <Route path="/QrCode" element={<QrCode />} /> 
                 <Route path="/processarPagamento" element={<AppPagamento />} />
                 <Route path="/carrinho" element={<Carrinho />} />
           
            {/* adm gerenciamento */}
            <Route path="/gerenP" element={<PgprincAdm />} /> 
            <Route path="/gerenDash" element={<PgDashAdm />} /> 

            
            
            </Routes>
        </Router>
    );
};

export default App;
