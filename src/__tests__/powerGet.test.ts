import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Get powerstate', () => (
  pioneer.power.get().then((pwr) => {
    expect(pwr).toBeDefined();
    expect(pwr).toBe(true);
  })
));


afterAll(() => (pioneer.closeConnection()));
