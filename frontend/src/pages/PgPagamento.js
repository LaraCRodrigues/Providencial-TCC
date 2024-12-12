// componentes
import NavbarPag from './components/navpagamento';
import PagamentoBloco from './components/blocopagamento';
import FooterSite from './components/footer';


// css
import './components/cssComponentes/MediaQueries.css'
import './components/Icones/iconesSite.css';
import './styles/Pgpagamento.css';

function Pgpagamento() {
  return (
    <div>
   <NavbarPag/>
    <PagamentoBloco/>
    
   <FooterSite/>
    </div>
  );
}

export default Pgpagamento;
