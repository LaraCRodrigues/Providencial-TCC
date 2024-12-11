// Seleciona o botão e a barra lateral
const btnCategorias = document.getElementById('btn-categorias');
const barraLateral = document.getElementById('barra-lateral-categorias');

// Alterna a classe 'show' na barra lateral ao clicar no botão
btnCategorias.addEventListener('click', () => {
  barraLateral.classList.toggle('show');
});

// Fecha a barra lateral ao clicar fora dela
window.addEventListener('click', (event) => {
  if (!barraLateral.contains(event.target) && !btnCategorias.contains(event.target)) {
    barraLateral.classList.remove('show');
  }
});

// chat do comercio
const btnChat = document.getElementById('btn-chat-comercio');
const chatBox = document.getElementById('chat-box');
const btnCloseChat = document.getElementById('btn-close-chat');

btnChat.addEventListener('click', () => {
  chatBox.style.display = 'block';
});

btnCloseChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
});


// model acessibilidade
function toggleBalao() {
  const balao = document.getElementById('balaoAcessibilidade');
  balao.style.display = balao.style.display === 'block' ? 'none' : 'block';
}

// Fecha o balão ao clicar fora dele
// Botão para fechar o balão
const btnFecharBalao = document.getElementById("btnFecharBalao");
const balaoAcessibilidade = document.getElementById("balaoAcessibilidade");

btnFecharBalao.addEventListener("click", function() {
    balaoAcessibilidade.style.display = "none";
});

// Seleciona os links de acessibilidade
const linkFonteGrande = document.getElementById("link-fonte-grande");
const linkAltoContraste = document.getElementById("link-alto-contraste");
const linkTextoNegrito = document.getElementById("link-texto-negrito");

// Alterna Fonte Grande
linkFonteGrande.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.toggle("fonte-grande");
});

// Alterna Alto Contraste
linkAltoContraste.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.toggle("alto-contraste");
});

// Alterna Texto em Negrito
linkTextoNegrito.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.toggle("texto-negrito");
});

// carrinho
function abrirCarrinho() {
  document.getElementById("carrinhoSidebar").style.right = "0"; // Abre a barra lateral
}

function fecharCarrinho() {
  document.getElementById("carrinhoSidebar").style.right = "-300px"; // Fecha a barra lateral
}
// let isMouseDown = false;
// let startX;
// let scrollLeft;
// const slider = document.getElementById('loja-carousel');

// slider.addEventListener('mousedown', (e) => {
//     isMouseDown = true;
//     startX = e.pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;
// });

// slider.addEventListener('mouseleave', () => {
//     isMouseDown = false;
// });

// slider.addEventListener('mouseup', () => {
//     isMouseDown = false;
// });

// slider.addEventListener('mousemove', (e) => {
//     if (!isMouseDown) return;
//     e.preventDefault();
//     const x = e.pageX - slider.offsetLeft;
//     const walk = (x - startX) * 3; // O "3" controla a velocidade do arraste
//     slider.scrollLeft = scrollLeft - walk;
// });

// // Para toque (mobile)
// let startTouchX;
// let touchScrollLeft;

// slider.addEventListener('touchstart', (e) => {
//     isMouseDown = true;
//     startTouchX = e.touches[0].pageX - slider.offsetLeft;
//     touchScrollLeft = slider.scrollLeft;
// });

// slider.addEventListener('touchend', () => {
//     isMouseDown = false;
// });

// slider.addEventListener('touchmove', (e) => {
//     if (!isMouseDown) return;
//     const x = e.touches[0].pageX - slider.offsetLeft;
//     const walk = (x - startTouchX) * 3;
//     slider.scrollLeft = touchScrollLeft - walk;
// });
