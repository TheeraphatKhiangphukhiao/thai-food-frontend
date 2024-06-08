import { Component } from '@angular/core';
/* import service */
import { DataService } from 'src/app/service/data.service';
import { MatDialogRef } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง
import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  /* ราคารวมของรายการสินค้าทั้งหมด */
  sum_total = 0; // ตัวเเปรสำหรับเก็บราคารวมในตะกร้าสินค้าจาก dataService ที่เก็บไว้ก่อนหน้านี้เพื่อจะนำไปเเสดงผลเเละใช้งานอื่นๆ
  constructor(private http : HttpClient, private dataService: DataService, private dialogRef : MatDialogRef<DeliveryComponent>) {
    this.sum_total = dataService.sum_total; // constructor จะทำงานทันที จากนั้นนำข้อมูลราคารวมของสินค้าในตะกร้าไปเก็บไว้ใน sum_total
    console.log(this.sum_total); // ทำการ log ออกมาดู
  }

  // เมธอดในการปิดหน้าต่าง dialog
  cancel() {
    this.dialogRef.close();
  }

  // เมธอดในการสั่งซื้อสินค้า
  addOrder(name : any, phone : any, address : any) {
    console.log(name); // ทำการ log ออกมาดู
    console.log(phone); // ทำการ log ออกมาดู
    console.log(address); // ทำการ log ออกมาดู

    let jsonObj = {
      cid : this.dataService.customer[0].cid, // นำ cid ของลูกค้าคนั้นๆมาเพื่อจะ insert ลง database
      customer_name : name,
      customer_phone : phone,
      customer_address : address
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    if(name && phone && address) {
      this.http.post(this.dataService.apiEndpoint + "/basket/order/confirmation", jsonString,
      {observe: 'response'}).subscribe((response) => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));

        this.dialogRef.close(); // คำสั่งในการปิด dialog
      });
    } else {
      console.log("กรุณาป้อนข้อมูลให้ครบ");
    }
  }
}
