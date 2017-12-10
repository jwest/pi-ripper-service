const request = require('supertest');
const app = require('../app');

describe('MainPage', () => {
  test('should response HATEOAS links', () =>
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.links.length).toBe(1);
      expect(response.body.links[0].href.includes('/api/v1/disks')).toBe(true);
    }));
});
