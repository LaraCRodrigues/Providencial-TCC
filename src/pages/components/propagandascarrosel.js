import React, { useState, useEffect, useRef } from 'react';
import './cssComponentes/Carrosselpropagandas.css'
import imagem1 from './Imagens/BD imagens/propaganda 1.jpg';
import imagem2 from './Imagens/BD imagens/propaganda 2.jpg';
import imagem3 from './Imagens/BD imagens/propaganda 3.jpg';

const CarrosselPropagandas = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const autoSlideInterval = useRef(null); // Referência para o intervalo

    const slides = [
        { src: imagem1, alt: "Imagem 1" },
        { src: imagem2, alt: "Imagem 2" },
        { src: imagem3, alt: "Imagem 3" },
    ];

    const mudarSlidePara = (index) => {
        setActiveSlide(index);
        reiniciarAutoSlide();
    };

    const reiniciarAutoSlide = () => {
        clearInterval(autoSlideInterval.current);
        autoSlideInterval.current = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);
    };

    useEffect(() => {
        // Inicia o intervalo automaticamente ao montar o componente
        autoSlideInterval.current = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(autoSlideInterval.current);
    }, []);

    return (
        <section id="section2">
            <div className="container-propagandas">
                <div className="carrossel" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div
                            className={`slide ${index === activeSlide ? "ativo" : ""}`}
                            key={index}
                        >
                            <img src={slide.src} alt={slide.alt} />
                        </div>
                    ))}
                </div>

                {/* Indicadores de navegação */}
                <div className="indicadores">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`ponto ${index === activeSlide ? "ativo" : ""}`}
                            onClick={() => mudarSlidePara(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CarrosselPropagandas;
