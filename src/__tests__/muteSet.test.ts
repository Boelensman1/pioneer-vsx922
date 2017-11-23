import Pioneer from '..'; // tslint:disable-line import-name

const pioneer = new Pioneer('10.0.0.117');

it('Set mutestate', () => (
  pioneer.volume.setMuted(false).then((muted) => {
    expect(muted).toBeDefined();
    expect(muted).toBe(false);
  })
));


afterAll(() => (pioneer.closeConnection()));
