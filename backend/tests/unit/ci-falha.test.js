describe('Demonstração de falha no CI', () => {
    test('deve falhar propositalmente', () => {
        expect(true).toBe(false);
    });
});
