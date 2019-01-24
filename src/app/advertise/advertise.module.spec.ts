import { AdvertiseModule } from './advertise.module';

describe('AdvertiseModule', () => {
  let advertiseModule: AdvertiseModule;

  beforeEach(() => {
    advertiseModule = new AdvertiseModule();
  });

  it('should create an instance', () => {
    expect(advertiseModule).toBeTruthy();
  });
});
