import { Component, OnInit, AfterContentInit } from '@angular/core';
import Quill, { DeltaStatic, Sources } from 'quill';
import { QiniuUploadService } from '../../qiniu-upload.service';
import { from, Observable } from 'rxjs';
import { map, concatMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css']
})
export class QuillComponent implements OnInit, AfterContentInit {
  public editor: any;

  constructor (public qiniuSerivce: QiniuUploadService) { }

  public imageb64toUrl (next): void {
    const imgs: any = document.querySelectorAll('.ql-editor img');
    const imageb64s = [];
    for (const img of imgs) {
      if (img.src.indexOf('http') === -1) {
        imageb64s.push(img);
      }
    }

    from(imageb64s).pipe(
      concatMap((img: HTMLImageElement) => {
        return this.qiniuSerivce.upload([img.src])
          .pipe(
            tap(url => {
              img.src = url;
            })
          );
      })
    )
    .subscribe({
      complete: () => next(this.editor.container.firstChild.innerHTML)
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit () {
    this.editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow'
    });
  }
}
