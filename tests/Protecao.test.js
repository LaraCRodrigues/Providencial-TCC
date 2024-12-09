// JÁ TESTADO E FUNCIONANDO CORRETAMENTE (TESTE UNITÁRIO)

const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const protecao = require("../routes/ProtecaoRotas");

process.env.JWT_SECRET = 'd3ca9349a8bfcdb73272da2d23b72e76a4751685989ce1fb069a1acd6139a224';

describe('Middleware de Autorização', () => {
    test('Deve retornar 403 se o token não for fornecido', () => {
        const req = httpMocks.createRequest({
            headers: {}
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        protecao(req, res, next);

        expect(res.statusCode).toBe(403);
        expect(res._getData()).toBe('Token não fornecido');
        expect(next).not.toHaveBeenCalled();
    });

    test('Deve retornar 401 se o token for inválido', () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'token-invalido'
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        protecao(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getData()).toBe('Token inválido');
        expect(next).not.toHaveBeenCalled();
    });

    test('Deve chamar next se o token for válido', () => {
        const userId = 123; // ID de exemplo
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
        
        const req = httpMocks.createRequest({
            headers: {
                authorization: token
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        protecao(req, res, next);

        expect(req.userId).toBe(userId);
        expect(next).toHaveBeenCalled();
        expect(res.statusCode).toBe(200); // O status não deve mudar, então permanece 200
    });
});

