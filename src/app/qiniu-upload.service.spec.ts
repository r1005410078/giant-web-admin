import { TestBed, inject } from '@angular/core/testing';

import { QiniuUploadService } from './qiniu-upload.service';

describe('QiniuUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QiniuUploadService]
    });
  });

  it('should be created', inject([QiniuUploadService], (service: QiniuUploadService) => {
    expect(service).toBeTruthy();
  }));
});
