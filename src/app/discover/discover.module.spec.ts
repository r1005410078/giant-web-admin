import { DiscoverModule } from './discover.module';

describe('DiscoverModule', () => {
  let discoverModule: DiscoverModule;

  beforeEach(() => {
    discoverModule = new DiscoverModule();
  });

  it('should create an instance', () => {
    expect(discoverModule).toBeTruthy();
  });
});
