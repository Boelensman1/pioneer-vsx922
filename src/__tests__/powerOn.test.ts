import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Power on', () => (pioneer.power.on()));


afterAll(() => (pioneer.closeConnection()));
