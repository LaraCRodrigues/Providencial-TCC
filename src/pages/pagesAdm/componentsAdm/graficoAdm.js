import React, { useRef, useEffect } from 'react';

const Grafico = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Dados do gráfico
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
    const data = [100, 200, 300, 400];

    // Largura da barra
    const barWidth = 40;
    const spacing = 60;
    const maxHeight = 300;

    // Desenhando o gráfico
    const drawChart = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa o canvas

      // Desenhando as barras
      data.forEach((value, index) => {
        const x = index * spacing + 50; // Posição X da barra
        const y = maxHeight - value;  // Posição Y da barra
        const height = value;  // Altura da barra

        // Desenha a barra
        ctx.fillStyle = 'rgba(75, 192, 192, 0.8)';
        ctx.fillRect(x, y, barWidth, height);

        // Adicionando as labels
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(labels[index], x, maxHeight + 20); // Rótulo abaixo da barra
      });

      // Desenhando o eixo X e Y
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, maxHeight); // Eixo Y
      ctx.lineTo(50 + (data.length * spacing), maxHeight); // Eixo X
      ctx.strokeStyle = '#000';
      ctx.stroke();
    };

    drawChart();

    // Cleanup do gráfico quando o componente for desmontado
    return () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }, []);

  return (
    <article>
      <div className="container-card-dados">
        <div className="card-dados">
          <h4>Gráfico de Vendas no Mês</h4>
          <canvas ref={chartRef} id="salesChart" width="400" height="400"></canvas>
        </div>
      </div>
    </article>
  );
};

export default Grafico;
