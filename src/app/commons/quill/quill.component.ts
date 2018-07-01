import { Component, OnInit, AfterContentInit } from '@angular/core';
import Quill, { DeltaStatic, Sources } from "quill";

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css']
})
export class QuillComponent implements OnInit, AfterContentInit {
  private editor: Quill
  public get editorInnerHTML () {
    return this.imageb64toUrl();
  }

  private imageb64toUrl ():string {
    const imgs:NodeList = document.querySelectorAll('.ql-editor img')
    for (let index = 0; index < imgs.length; index++) {
      const img = imgs[index] as HTMLImageElement;
      img.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530464545486&di=8cd2ddddd8522cebbbfb5d6205601d99&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F29%2F66%2F40G58PIC9bI.jpg'
    }
    return this.editor.container.firstChild.innerHTML;
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit () {
    console.log(document.getElementById('quill'))
    this.editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow'
    });
  }
}
