import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง
import { LogInComponent } from 'src/app/page/log-in/log-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog : MatDialog, private router: Router){ // ทำการ Inject dialog เข้ามา มีชื่อว่า dialog มีชนิดเป็น MatDialog เพื่อใช้เปิดหน้าต่าง

  }

  // function เเสดง dialog เพื่อใช้ในการ Log In
  addLogIn(){
    this.router.navigateByUrl("/logIn");

    /*
    this.dialog.open(LogInComponent, {
      minWidth: '500px',
      minHeight: '330px',
    });
    */
  }
}
