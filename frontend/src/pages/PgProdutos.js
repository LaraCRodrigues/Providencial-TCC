// componentes
import Navbar from './components/navbarsite';
import FooterSite from './components/footer';
import ProdutosLoja from './components/componentes-pg-comple/prdLoja';

// css
import './components/Icones/iconesSite.css';
import './styles/PrincipalPart.css';
import './styles/Principalstyle.css';
function  PgProdutos() {
  return (
    <div>
   <Navbar/>
   <ProdutosLoja/>
   <FooterSite/>
    </div>
  );
}

export default PgProdutos;
