import { Component } from '@angular/core';
/* import Http */
import { HttpClient } from '@angular/common/http';
/* import service */
import { DataService } from 'src/app/service/data.service';
/* impoer Model class IOrder */
import { Convert as basketCvt, Basket } from 'src/app/model/basket.model';
/* ต้องรอข้อมูลมาก่อน */
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง

import { Convert as customerCvt, Customer } from 'src/app/model/customer.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { DeliveryComponent } from '../delivery/delivery.component';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  /* Array ที่เป็นชนิดของ class IOrder */
  basket = Array<Basket>();
  customer = Array<Customer>();

   /* สร้าง ชื่อ columns ที่ต้องการแสดง โดยชื่อต้องตรงกับ iorderOid-model.ts*/
   displayedColumns: string[] = ['delete', 'url', 'goods_name', 'price', 'amount', 'total'];

   /* ราคารวมของรายการสินค้าทั้งหมด */
  sum_total = 0;

  constructor (private http: HttpClient, private dataService: DataService, private dialog : MatDialog) { // ทำการ Inject dialog เข้ามา มีชื่อว่า dialog มีชนิดเป็น MatDialog เพื่อใช้เปิดหน้าต่าง

    // /* เรียก api แสดงรายการอาหารที่อยู่ใน  order นั้นๆ*/
    // http.get(dataService.pathApi + '/iorder/' + dataService.oid).subscribe( (data:any) =>{
    //   this.iorderOid = IOrderOIDCvt.toIOrderOID(JSON.stringify(data));
    //   console.log(this.iorderOid);
    // });

    /* เรียกใช้ Method api*/
    this.getIorderOid(http, dataService);

  }

  /* Method เรียก api แบบ รอข้อมูลมาให้ครบก่อน */
  async getIorderOid(http:  HttpClient, dataService: DataService) {
    this.customer = this.dataService.customer;
    console.log('start');

    /* เรียก api แบบ await คือ รอข้อมมูลมาให้ครบก่อน*/
    this.basket = basketCvt.toBasket(JSON.stringify(
      await lastValueFrom(
        http.get(this.dataService.apiEndpoint + '/basket/' + this.customer[0].cid,
    ))));

    console.log(this.basket);

    console.log('compless');

    /* วนรอบ หา ราคารวมของรายการสินค้าทั้งหมด */
    this.basket.forEach(element => {
      this.sum_total = this.sum_total + element.total;
      console.log(element.total);
    });

  }

  /* Method ลบสินค้าอกจากตะกร้า */
  deleteGoods(element : any){

    this.sum_total = this.sum_total - element.total;

    let $cid = this.customer[0].cid;
    let jsonObj = {
      cid : $cid,
      gid : element.gid
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    this.http.post(this.dataService.apiEndpoint + "/basket/delete", jsonString,
    {observe: 'response'}).subscribe((response) => {

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));

      /* sql ดึงรายการสินค้าที่อยู่ในตะกร้า ของคนๆนั้น*/
      this.http.get(this.dataService.apiEndpoint + '/basket/' + this.customer[0].cid).subscribe((data) => {
        this.basket = basketCvt.toBasket(JSON.stringify(data));
      });

    });
  }

  /* Method แก้ไขจำนวนสินค้า */
  editAmount(element : any, new_amount : any) {

    /* วัด ความห่างของ จำนวนที่จะ เพิ่ม-ลด กับจำนวนที่มีอยู่แล้วของสินค้านั้นๆ
        ถ้า จำนวนใหม่ที่จะ เพิ่ม คือ 5 แต่จำนวนที่มีอยู่แล้วมี 3 ดังนั้นจะส่ง 2 ไปทำงานที่ sql สรุปจำนวนสินค้าชิ้นนี้จะเป็น 7
        ถ้า จำนวนใหม่ที่จะ ลด คือ 3 แต่จำนวนที่มีอยู่แล้วมี 5 ดังนั้นจะส่ง -2 ไปทำงานที่ sql สรุปจำนวนสินค้าชิ้นนั้นจะเป็น 3*/
    new_amount = new_amount - element.amount;

    let $cid = this.customer[0].cid;
    let jsonObj = {
      cid : $cid,
      gid : element.gid,
      amount : new_amount
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    this.http.post(this.dataService.apiEndpoint + "/basket", jsonString,
    {observe: 'response'}).subscribe((response) => {

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));

      /* sql ดึงรายการสินค้าที่อยู่ในตะกร้า ของคนๆนั้น*/
        this.http.get(this.dataService.apiEndpoint + '/basket/' + this.customer[0].cid).subscribe((data) => {
        this.basket = basketCvt.toBasket(JSON.stringify(data));

        /* เปลี่ยน ราารวมทั้งหมดใหม่ทุกครั้ง */
        this.sum_total = 0;
        this.basket.forEach(element => {
          this.sum_total = this.sum_total + element.total;
          console.log(element.total);
        });

      });
    });

  }

  /* Method กดยืนยันสั่งซื้อสินค้าทั้งหมด ที่อยู่ในตะกร้า */
  orderConfirmation() {
    this.dataService.sum_total = this.sum_total; // เมื่อกดสั่งซื้อจะเปิดหน้าต่าง dialog ขึ้นมาให้ลูกค้ากรอกข้อมูลการจัดส่ง เเละเก็บราคารวมของสินค้าในตะกร้าไว้ใน dataService เพื่อนำไปใช้ในหน้าต่อไป
    this.dialog.open(DeliveryComponent, {
      minWidth: '500px',
      minHeight: '330px',
    })

    // /* สร้าง json เพื่อเก็บข้อมูลที่จะส่งไปที่ api */
    // let jsonObj = {
    //   cid : "1",
    //   customer_phone : "0645474521",
    //   customer_address : "address"
    // }
    // /* แปลง เป็น json */
    // let jsonString = JSON.stringify(jsonObj);

    // /* เรียก api ยืนยันการสั่งซื้อ โดยส่ง jsonString ไปให้ตัวแปล response */
    // this.http.post(this.dataService.pathApi + '/basket/order/confirmation', jsonString, {observe: 'response'}).subscribe((data) => {

    //   /* sql ดึงรายการสินค้าที่อยู่ในตะกร้า ของคนๆนั้น*/
    //   this.http.get(this.dataService.pathApi + '/basket/' + this.customer[0].cid).subscribe((data) => {
    //     this.basket = basketCvt.toBasket(JSON.stringify(data));
    //   });

    //   /* เปลี่ยน ราารวมทั้งหมดใหม่ทุกครั้งเมื่อกดสั่งซื้อ */
    //   this.sum_total = 0;

    //   console.log(data);

    // });

  }
}





