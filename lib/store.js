const storage = {};

const store = {
  getAll: (bucket, sort, order) => {
    if (!storage[bucket]) {
      return Promise.resolve([]);
    }
    const sortParam = sort || 'updatedAt';
    const orderParam = order || 'asc';
    return Promise.resolve(Object.keys(storage[bucket])
      .map(id => storage[bucket][id])
      .sort((diskA, diskB) => {
        if (diskA[sortParam] > diskB[sortParam]) {
          return orderParam === 'asc' ? 1 : -1;
        } else if (diskA[sortParam] < diskB[sortParam]) {
          return orderParam === 'asc' ? -1 : 1;
        }
        return 0;
      }));
  },
  get: (bucket, key) => {
    if (!storage[bucket] || !storage[bucket][key]) {
      return Promise.reject();
    }
    return Promise.resolve(storage[bucket][key]);
  },
  put: (bucket, key, value) => {
    if (!storage[bucket]) {
      storage[bucket] = {};
    }
    storage[bucket][key] = value;
    return Promise.resolve(value);
  },
  delete: (bucket, key) => {
    if (storage[bucket]) {
      delete storage[bucket][key];
    }
    return Promise.resolve();
  },
  clear: (bucket) => {
    storage[bucket] = {};
    return Promise.resolve();
  },
};

module.exports = store;
