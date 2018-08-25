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

  constructor (private qiniuSerivce: QiniuUploadService) { }

  public imageb64toUrl (next): void {
    const imgs: NodeList = document.querySelectorAll('.ql-editor img');
    from(imgs).pipe(
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
