import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('get the muteState', () => (
  pioneer.volume.isMuted().then((result) => {
    expect(result).toBeDefined();
    expect(typeof(result)).toBe('boolean');
  })
));


afterAll(() => (pioneer.closeConnection()));
