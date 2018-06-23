import { MattersModule } from './matters.module';

describe('MattersModule', () => {
  let mattersModule: MattersModule;

  beforeEach(() => {
    mattersModule = new MattersModule();
  });

  it('should create an instance', () => {
    expect(mattersModule).toBeTruthy();
  });
});
