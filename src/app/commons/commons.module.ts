import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill/quill.component';
import { BmapComponent } from './bmap/bmap.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IllustrationComponent } from './illustration/illustration.component';


@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [QuillComponent, BmapComponent, IllustrationComponent],
  declarations: [QuillComponent, BmapComponent, IllustrationComponent]
})
export class CommonsModule { }
