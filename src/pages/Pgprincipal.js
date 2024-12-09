// componentes
import Navbar from './components/navbarsite';
import FooterSite from './components/footer';
import CarrosselPropagandas from './components/propagandascarrosel';
import ProdutosGeral from './components/produtosLoja';
import CardsSeguranca from './components/cardsdeseguranca';
import CardsNavegaveis from './components/cardsatalho';
import ChatProvidencial from './components/subcomponents/chatloja';
// 
import ErrorBoundary from '../pages/components/tratacaoerros/ErrorBoundary '
// css
import './components/cssComponentes/MediaQueries.css'
import './components/Icones/iconesSite.css';
import './styles/PrincipalPart.css';
import './styles/Principalstyle.css';
function PgPrincipal() {
  return (
    <div>
   <Navbar/>
   <ChatProvidencial/>
      <CarrosselPropagandas/>
      <ErrorBoundary>
      <ProdutosGeral/>
      </ErrorBoundary>
      <CardsSeguranca/>
      <CardsNavegaveis/>
   <FooterSite/>
    </div>
  );
}

export default PgPrincipal;
