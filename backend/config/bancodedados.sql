CREATE TABLE CLIENTE (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,  
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE FUNCIONARIO (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,  
    cargo VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUTO (
    idProduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR (255),  
    idCategoria INT NOT NULL,
    preco DECIMAL(10,2),
    FOREIGN KEY (idCategoria) REFERENCES CATEGORIA (idCategoria)
);

CREATE TABLE ESTOQUE(
    idEstoque INT AUTO_INCREMENT PRIMARY KEY ,
    idProduto INT,
    quantidade INT NOT NULL CHECK (quantidade >= 0),  -- CHECK SE NÃO É UMA QUANTIDADE NEGATIVADA
    FOREIGN KEY (idProduto) REFERENCES PRODUTO(idProduto)
 );

CREATE TABLE ENDERECO( 
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100), 
    numero VARCHAR(20), 
    complemento VARCHAR(50),
    bairro VARCHAR(50), 
    cidade VARCHAR(50), 
    estado CHAR(2), 
    cep VARCHAR(10), 
    pais VARCHAR(50),
    idCliente INT, 
    tipoEndereco ENUM('cobranca','entrega'),
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente) 
);

CREATE TABLE PEDIDO( 
    idPedido INT PRIMARY KEY AUTO_INCREMENT, 
    idClientePedido INT,
    dataPedido DATE, 
    statusPedido ENUM('pendente', 'processando', 'enviado', 'entregue', 'cancelado'), 
    formaPagamento VARCHAR(50),
    valorTotal DECIMAL(10,2),
    FOREIGN KEY (idClientePedido) REFERENCES CLIENTE(idCliente) 
);

CREATE TABLE ITENS_PEDIDOS ( 
    idItensPedidos INT PRIMARY KEY AUTO_INCREMENT, 
    idPedido INT, 
    idProduto INT, 
    quantidade INT, 
    valorUnitario DECIMAL(10,2),
    valorTotal DECIMAL(10,2)
    FOREIGN KEY (idPedido) REFERENCES PEDIDO(idPedido),
    FOREIGN KEY (idProduto) REFERENCES PRODUTO(idProduto)
);

CREATE TABLE CATEGORIA(
    idCategoria INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(100) NOT NULL, 
    descricao TEXT
);

CREATE TABLE PAGAMENTO( 
    idPagamento INT PRIMARY KEY AUTO_INCREMENT, 
    idPedidoPagamento INT, 
    dataPagamento DATETIME,
    valorPago DECIMAL(10,2), 
    statusPagamento ENUM('pendente', 'aprovado', 'recusado'), 
    formaPagamento ENUM('cartão de crédito', 'boleto', 'transferência bancária','pix'), 
    FOREIGN KEY (idPedidoPagamento) REFERENCES PEDIDO(idPedido)
);


-- TRIGGER PARA ALTERAR O VALOR TOTAL DO PEDIDO --

CREATE TRIGGER trg_atualiza_valor_total_pedido 
AFTER INSERT ON ITENS_PEDIDOS 
FOR EACH ROW 
BEGIN 
    DECLARE total DECIMAL(10,2);

    -- Calcula o novo valor total do pedido
    SELECT SUM(valorUnitario * quantidade) 
    INTO total 
    FROM ITENS_PEDIDOS 
    WHERE idPedido = NEW.idPedido;

    -- Atualiza o valor total do pedido
    UPDATE PEDIDO 
    SET valorTotal = total 
    WHERE idPedido = NEW.idPedido;
END;

-- TRIGGER PARA ALTERAR O VALOR TOTAL DO PEDIDO (ATUALIZAÇÃO E EXCLUSÃO) --

CREATE TRIGGER trg_atualiza_valor_total_pedido_update 
AFTER UPDATE ON ITENS_PEDIDOS 
FOR EACH ROW 
BEGIN 
    DECLARE total DECIMAL(10,2);

    -- Calcula o novo valor total do pedido
    SELECT SUM(valorUnitario * quantidade) 
    INTO total 
    FROM ITENS_PEDIDOS 
    WHERE idPedido = NEW.idPedido;

    -- Atualiza o valor total do pedido
    UPDATE PEDIDO 
    SET valorTotal = total 
    WHERE idPedido = NEW.idPedido;
END;

CREATE TRIGGER trg_atualiza_valor_total_pedido_delete 
AFTER DELETE ON ITENS_PEDIDOS 
FOR EACH ROW 
BEGIN 
    DECLARE total DECIMAL(10,2);

    -- Calcula o novo valor total do pedido
    SELECT SUM(valorUnitario * quantidade) 
    INTO total 
    FROM ITENS_PEDIDOS 
    WHERE idPedido = OLD.idPedido;

    -- Atualiza o valor total do pedido
    UPDATE PEDIDO 
    SET valorTotal = total 
    WHERE idPedido = OLD.idPedido;
END;


-- Garantir que a quantidade de um produto não ultrapasse a quantidade disponível no estoque --

CREATE TRIGGER trg_verifica_estoque 
BEFORE INSERT ON ITENS_PEDIDOS 
FOR EACH ROW 
BEGIN 
    DECLARE quantidade_em_estoque INT;

    -- Obter a quantidade disponível em estoque para o produto
    SELECT quantidade INTO quantidade_em_estoque 
    FROM Estoque 
    WHERE idProduto = NEW.idProduto;

    -- Verificar se a quantidade solicitada excede o estoque disponível
    IF NEW.quantidade > quantidade_em_estoque THEN 
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'A quantidade solicitada excede o estoque disponível.'; 
    END IF; 
END;


-- ATUALIZAÇÃO DO ESTOQUE APÓS A COMPRA --

CREATE TRIGGER trg_atualiza_estoque_apos_confirmacao
AFTER UPDATE ON PEDIDO
FOR EACH ROW
BEGIN
    IF NEW.statusPedido = 'confirmado' AND OLD.statusPedido <> 'confirmado' THEN
        -- Atualiza a quantidade em estoque para cada item do pedido
        UPDATE ESTOQUE 
        SET quantidade = quantidade - (
            SELECT SUM(ip.quantidade) 
            FROM ITENS_PEDIDOS ip 
            WHERE ip.idPedido = NEW.idPedido 
              AND ip.idProduto = ESTOQUE.idProduto
        )
        WHERE idProduto IN (
            SELECT idProduto 
            FROM ITENS_PEDIDOS 
            WHERE idPedido = NEW.idPedido
        );
    END IF;
END;

-- NOTIFICA O CLIENTE POR EMAIL O STATUS DO PEDIDO --

CREATE TRIGGER trg_notifica_cliente_alteracao_status 
AFTER UPDATE ON PEDIDO 
FOR EACH ROW 
BEGIN 
  IF NEW.statusPedido <> OLD.statusPedido THEN 
    DECLARE email_cliente VARCHAR(100); -- Obter o email do cliente 
    SELECT email INTO email_cliente FROM CLIENTE WHERE idCliente = NEW.idCliente;

    -- Enviar o email (exemplo genérico, ajuste conforme seu SGBD)
    CALL enviar_email(email_cliente, 
                      CONCAT('Atualização do Status do Seu Pedido'), 
                      CONCAT('O status do seu pedido ', NEW.idPedido, ' foi alterado para ', NEW.statusPedido));
  END IF; 
END;