const request = require('supertest');
const app = require('../app');
const store = require('../lib/store');
const diskExpect = require('./asserts/disk-expect');
const linksExpect = require('./asserts/links-expect');

describe('Disks', () => {
  test('should create disk', () =>
    request(app)
      .post('/api/v1/disks')
      .send({ artist: 'ARTIST', title: 'TITLE' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const { id } = response.body;
        expect(response.headers.location.includes(`/api/v1/disks/${id}`)).toBe(true);
        return id;
      })
      .then(id =>
        request(app)
          .get(`/api/v1/disks/${id}`)
          .then((getResponse) => {
            expect(getResponse.statusCode).toBe(200);
            diskExpect(getResponse.body)
              .toEqual({ id, artist: 'ARTIST', title: 'TITLE' });
          })));

  test('should update disk', () =>
    request(app)
      .post('/api/v1/disks')
      .send({ artist: 'ARTIST', title: 'TITLE' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const { id } = response.body;
        expect(response.headers.location.includes(`/api/v1/disks/${id}`)).toBe(true);
        return id;
      })
      .then(id =>
        request(app)
          .put(`/api/v1/disks/${id}`)
          .send({ artist: 'ARTIST_UPDATED', title: 'TITLE_UPDATED' })
          .then((putResponse) => {
            expect(putResponse.statusCode).toBe(200);
            diskExpect(putResponse.body)
              .toEqual({ id, artist: 'ARTIST_UPDATED', title: 'TITLE_UPDATED' });
            return id;
          }))
      .then(id =>
        request(app)
          .get(`/api/v1/disks/${id}`)
          .then((getResponse) => {
            expect(getResponse.statusCode).toBe(200);
            diskExpect(getResponse.body)
              .toEqual({ id, artist: 'ARTIST_UPDATED', title: 'TITLE_UPDATED' });
          })));

  test('should delete disk', () =>
    request(app)
      .post('/api/v1/disks')
      .send({ artist: 'ARTIST', title: 'TITLE' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const { id } = response.body;
        expect(response.headers.location.includes(`/api/v1/disks/${id}`)).toBe(true);
        return id;
      })
      .then(id =>
        request(app)
          .delete(`/api/v1/disks/${id}`)
          .then((deleteResponse) => {
            expect(deleteResponse.statusCode).toBe(200);
            return id;
          }))
      .then(id =>
        request(app)
          .get(`/api/v1/disks/${id}`)
          .then((getResponse) => {
            expect(getResponse.statusCode).toBe(404);
          })));

  describe('get all', () => {
    test('should get all disk', () =>
      Promise.all([
        request(app).post('/api/v1/disks')
          .send({ artist: 'ARTIST_1', title: 'TITLE_1' }),
        request(app).post('/api/v1/disks')
          .send({ artist: 'ARTIST_2', title: 'TITLE_2' }),
        request(app).post('/api/v1/disks')
          .send({ artist: 'ARTIST_3', title: 'TITLE_3' }),
      ]).then(() =>
        request(app)
          .get('/api/v1/disks')
          .then((getResponse) => {
            expect(getResponse.statusCode).toBe(200);
            expect(getResponse.body.length).toBe(3);
            getResponse.body.forEach((disk) => {
              diskExpect(disk).toSimilar({ artist: 'ARTIST', title: 'TITLE' });
              linksExpect(disk).toHaveLink('disk', `/api/v1/disks/${disk.id}`);
            });
          })));

    describe('order', () => {
      test('should get all disk and order by "title"', () =>
        Promise.all([
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_1', title: 'TITLE_1' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_2', title: 'TITLE_2' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_3', title: 'TITLE_3' }),
        ]).then(() =>
          request(app)
            .get('/api/v1/disks?sort=title')
            .then((getResponse) => {
              expect(getResponse.statusCode).toBe(200);
              expect(getResponse.body.map(disk => disk.title)).toEqual([
                'TITLE_1', 'TITLE_2', 'TITLE_3',
              ]);
            })));

      test('should get all disk and order by "title DESC"', () =>
        Promise.all([
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_1', title: 'TITLE_1' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_2', title: 'TITLE_2' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_3', title: 'TITLE_3' }),
        ]).then(() =>
          request(app)
            .get('/api/v1/disks?sort=title&order=desc')
            .then((getResponse) => {
              expect(getResponse.statusCode).toBe(200);
              expect(getResponse.body.map(disk => disk.title)).toEqual([
                'TITLE_3', 'TITLE_2', 'TITLE_1',
              ]);
            })));
    });

    describe('limit', () => {
      test('should get one disk and order by "title"', () =>
        Promise.all([
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_1', title: 'TITLE_1' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_2', title: 'TITLE_2' }),
          request(app).post('/api/v1/disks')
            .send({ artist: 'ARTIST_3', title: 'TITLE_3' }),
        ]).then(() =>
          request(app)
            .get('/api/v1/disks?limit=1&sort=title&order=desc')
            .then((getResponse) => {
              expect(getResponse.statusCode).toBe(200);
              expect(getResponse.body.map(disk => disk.title)).toEqual([
                'TITLE_3',
              ]);
            })));
    });
  });

  beforeEach(() => {
    store.clear('disks');
  });
});
