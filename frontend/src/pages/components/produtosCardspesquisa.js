import React from 'react';
import ProdutoCard from './conteudocardprodutopesquisa';

const ProdutosPesquisa = () => {
  // Dados de exemplo - normalmente, você buscaria da API ou backend
  const produtos = [
    {
      id: 1,
      nome: "Cimento Elástico Impermeabilizante Caixa D'Água 4Kg",
      preco: 'R$200,90',
      marca: 'Elastment',
      imagem: 'Imagens/BD imagens/elastment_transit_mockup.webp',
      link: '/comprar',
    },
    {
      id: 2,
      nome: 'Tinta Branca Premium 18L',
      preco: 'R$350,00',
      marca: 'Supertintas',
      imagem: 'Imagens/BD imagens/tinta_branca.webp',
      link: '/comprar',
    },
    {
      id: 3,
      nome: 'Broca Multiuso 10mm',
      preco: 'R$15,90',
      marca: 'FerramentasPro',
      imagem: 'Imagens/BD imagens/broca_10mm.webp',
      link: '/comprar',
    },
    {
      id: 4,
      nome: 'Trena Digital Laser 40m',
      preco: 'R$189,90',
      marca: 'LaserTools',
      imagem: 'Imagens/BD imagens/trena_digital.webp',
      link: '/comprar',
    },
  ];

  return (
    <section className="produtos">
      <div className="container-produtos">
        <h2 className="titulo-produtos">Produtos Disponíveis</h2>
        <div className="lista-produtos">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                imagem={produto.imagem}
                marca={produto.marca}
                nome={produto.nome}
                preco={produto.preco}
                parcelas="em 2x sem Juros"
                link={produto.link}
              />
            ))
          ) : (
            <p className="mensagem-nenhum-produto">Nenhum produto disponível.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProdutosPesquisa;
