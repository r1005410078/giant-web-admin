import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  intervalForm: FormArray;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.userinfo.cookie.set("id", "11")
    this.router.navigateByUrl('/giant')
  }

  constructor(private router: Router, private fb: FormBuilder, private userinfo: UserinfoService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
