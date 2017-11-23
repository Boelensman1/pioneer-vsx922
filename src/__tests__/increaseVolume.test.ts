import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Increases the volume', () => (
  pioneer.volume.increase().then((volume) => {
    expect(volume).toBeDefined();
    // between 0 and 100
    expect(volume).toBeGreaterThanOrEqual(0);
    expect(volume).toBeLessThanOrEqual(100);
  })
));


afterAll(() => (pioneer.closeConnection()));
