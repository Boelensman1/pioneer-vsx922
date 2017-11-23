import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Set the volume to a value', () => (
  pioneer.setVolume(75).then((result) => {
    expect(result).toBeDefined();
  })
));


afterAll(() => (pioneer.closeConnection()));
