const request = require('supertest');
const app = require('../../src/app'); // Asegúrate de importar correctamente tu archivo principal de la aplicación donde se encuentra definida la función getPokemons

describe('GET /pokemons', () => {
  it('debería devolver un arreglo de Pokémon', async () => {
    const response = await request(app).get('/pokemons');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    // Aquí puedes agregar más expectativas para verificar la estructura de cada Pokémon devuelto si lo deseas
    // Ejemplo: expect(response.body[0]).toHaveProperty('id');
    // ...

  });

  it('debería devolver un código de estado 500 si ocurre un error', async () => {
    const response = await request(app).get('/pokemons/error');

    expect(response.status).toBe(500);
  });
});
