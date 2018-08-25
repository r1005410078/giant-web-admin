import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill/quill.component';
import { BmapComponent } from './bmap/bmap.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IllustrationComponent } from './illustration/illustration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteBmapComponent } from './routeBmap/bmap.component';


@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [QuillComponent, BmapComponent, IllustrationComponent, RouteBmapComponent],
  declarations: [QuillComponent, BmapComponent, IllustrationComponent, RouteBmapComponent]
})
export class CommonsModule { }
