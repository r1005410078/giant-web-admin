import { TaoCanModule } from './tao-can.module';

describe('TaoCanModule', () => {
  let taoCanModule: TaoCanModule;

  beforeEach(() => {
    taoCanModule = new TaoCanModule();
  });

  it('should create an instance', () => {
    expect(taoCanModule).toBeTruthy();
  });
});
