import { SuggestRouteModule } from './suggest-route.module';

describe('SuggestRouteModule', () => {
  let suggestRouteModule: SuggestRouteModule;

  beforeEach(() => {
    suggestRouteModule = new SuggestRouteModule();
  });

  it('should create an instance', () => {
    expect(suggestRouteModule).toBeTruthy();
  });
});
