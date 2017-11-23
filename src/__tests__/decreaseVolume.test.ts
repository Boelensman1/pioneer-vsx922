import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Decreases the volume', () => (
  pioneer.decreaseVolume().then((volume) => {
    expect(volume).toBeDefined();
    // between 0 and 100
    expect(volume).toBeGreaterThanOrEqual(0);
    expect(volume).toBeLessThanOrEqual(100);
  })
));


afterAll(() => (pioneer.closeConnection()));
