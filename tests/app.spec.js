const request = require('supertest');
const app = require('../app');
const linksExpect = require('./asserts/links-expect');

describe('MainPage', () => {
  test('should response HATEOAS links', () =>
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      linksExpect(response.body).toHaveLink('disks', '/api/v1/disks');
    }));
});
