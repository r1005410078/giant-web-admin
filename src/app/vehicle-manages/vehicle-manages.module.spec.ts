import { VehicleManagesModule } from './vehicle-manages.module';

describe('VehicleManagesModule', () => {
  let vehicleManagesModule: VehicleManagesModule;

  beforeEach(() => {
    vehicleManagesModule = new VehicleManagesModule();
  });

  it('should create an instance', () => {
    expect(vehicleManagesModule).toBeTruthy();
  });
});
