import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('');
  phone = new FormControl('');
  email = new FormControl('', [Validators.email]);

  constructor() { }

  ngOnInit(): void {
  }

}
