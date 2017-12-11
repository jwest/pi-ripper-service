module.exports = actual => ({
  toHaveLink: (expectedRel, expectedLink) => {
    const link = actual.links[0];
    expect(link.rel).toBe(expectedRel);
    expect(link.href.includes(expectedLink)).toBe(true);
  },
});
