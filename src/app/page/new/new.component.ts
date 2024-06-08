import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as goodsCvt, Goods } from 'src/app/model/goods.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { MatDialogRef } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง
import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป
import { Convert as customerCvt, Customer } from 'src/app/model/customer.model'; // จะเเปลง JSON เป็น class จะต้อง import

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  gid : Array<Goods>; // attribute เพื่อเก็บ gid ที่ลูกค้าเลือกจาก data service
  name : Array<Goods>; // attribute เพื่อเก็บ name ที่ลูกค้าเลือกจาก data service

  customer = Array<Customer>();

  // ทำการ Inject dialogRef เข้ามาเพื่อสามารถที่จะควบคุมการทํางานของ dialog โดยต้องสร้างให้ตรงชนิดของ class NewComponent
  constructor(private dataService : DataService, private dialogRef : MatDialogRef<NewComponent>, private http : HttpClient){
    this.gid = dataService.gid;
    this.name = dataService.name;
  }

  // function close() ที่สามารถกดเเล้วปิดหน้าต่าง dialog ได้
  close(){
    this.dialogRef.close();
  }
  // function addFood ในการเพิ่มอาหารลงในตะกร้า โดยรับ gid เเละ amount เข้ามาเพื่อไปเก็บใน data Service เพื่อจะเอาไปเเสดงผลหน้าตะกร้า
  addFood(gid : any, amount : any){
    this.customer = this.dataService.customer;

    let $cid = this.customer[0].cid;

    let jsonObj = {
      amount : amount,
      cid : $cid,
      gid : gid
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    this.http.post(this.dataService.apiEndpoint + "/basket", jsonString,
    {observe: 'response'}).subscribe((response) => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
    });
    this.dialogRef.close(); // ปิดหน้าต่าง dialog ได้
  }
}
