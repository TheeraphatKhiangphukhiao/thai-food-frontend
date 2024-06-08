import { Component } from '@angular/core';
import { Convert as goodsCvt, Goods } from 'src/app/model/goods.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป
import { DataService } from 'src/app/service/data.service';
import { Convert as typeCvt, Type } from 'src/app/model/type.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { MatDialog } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง
import { NewComponent } from 'src/app/page/new/new.component';

import { Convert as adminCvt, Admin } from 'src/app/model/admin.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { Convert as customerCvt, Customer } from 'src/app/model/customer.model'; // จะเเปลง JSON เป็น class จะต้อง import

import { Router } from '@angular/router';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.scss']
})
export class CentralComponent {

  goods = Array<Goods>(); // สร้าง attribute ของ class มีชนิดเป็น Array ของ Goods คือ Model Serialization ที่เราสร้างขึ้น เพื่อเอาข้อมูล JSON มาเเปลงเป็น Object ให้อยู่ในรูปเเบบของ class
  type = Array<Type>(); // attribute สำหรับเก็บข้อมูลประเภทสินค้าเพื่อจะนำไปเเสดงให้ผู้ใช้เลือกในหน้า html

  admin = Array<Admin>();
  customer = Array<Customer>();

  constructor(private dataService : DataService, private http : HttpClient, private dialog : MatDialog, private router: Router){ // ทำการ Inject dialog เข้ามา มีชื่อว่า dialog มีชนิดเป็น MatDialog เพื่อใช้เปิดหน้าต่าง

    http.get(dataService.apiEndpoint + "/goods").subscribe((data : any) => { // dataService.apiEndpoint คือการเรียกใช้ attribute ของ Service ที่สร้างขึ้น ที่เก็บ url ของ api

      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
      console.log(this.goods); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });

    http.get(dataService.apiEndpoint + "/type").subscribe((data : any) => { // เรียก api ในการ select ประเภทสินค้าออกมา
      this.type = typeCvt.toType(JSON.stringify(data));
      console.log(this.type); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });
  }

  // function ในการค้นหาอาหารเฉพาะประเภทที่เลือก โดยรับ พารามิเตอร์ เป็นชื่อ ประภท
  findByType(name : string){
    this.http.get(this.dataService.apiEndpoint + "/goods/type/" + name).subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // เมื่อได้รับข้อมูลเเล้วนำไปเก็บใน attribute goods ซึ่งเป็นตัวเเปรที่จะเเสดงสินค้า
    });
  }

  // function ในการค้นหาอาหารทั้งหมด
  findAll(){
    this.http.get(this.dataService.apiEndpoint + "/goods").subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
      console.log(this.goods); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });
  }

  // function ในการค้นหาอาหารจากชื่ออาหาร
  search(productName : string){
    this.http.get(this.dataService.apiEndpoint + "/goods/name/" + productName).subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
    });
  }

  // function addNew แสดง dialog เพื่อใช้ในการเพิ่มอาหารลงตะกร้า เก็บไว้ใน data Service
  addNew(gid : any, name : any){
    this.dataService.gid = gid; // gid ไปเก็บใน data Service
    this.dataService.name = name; // name ไปเก็บใน data Service
    this.dialog.open(NewComponent, { // หมายความว่าจะทำการเเสดง dialog โดยการเปิดหน้า new.component.html มาเเสดงเป็น dialog
      minWidth: '300px',
      minHeight: '220px',
    });
  }

  openBasket(){
    this.customer = this.dataService.customer;
    console.log(this.customer[0].name);
    this.router.navigateByUrl("/basket");
  }

  /*
  images = [ // Array ที่เก็บข้อมูลรูปภาพเเต่ละรูป
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/01.jpg', alt: 'Image 1', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/02.jpg', alt: 'Image 2', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/03.jpg', alt: 'Image 3', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/04.jpg', alt: 'Image 4', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/05.jpg', alt: 'Image 5', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/06.jpg', alt: 'Image 6', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/07.jpg', alt: 'Image 7', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/08.jpg', alt: 'Image 8', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/09.jpg', alt: 'Image 9', description: 'Image 6 Description'},
    {src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Pizza%20Shop/10.jpg', alt: 'Image 10', description: 'Image 6 Description'},
  ];
  */

  /*
  imageRows = this.chunkArray(this.images, 5); // เรียกใช้ฟังก์ชัน chunkArray เพื่อแยกรูปภาพออกเป็นอาร์เรย์ 5 ซึ่งถูกกำหนดให้กับ imageRows พร็อพเพอร์ตี้ ในเทมเพลต HTML

  // function to split array into chunks of specified size
  private chunkArray(arr: any[], size: number): any[] {
    let chunkedArray = [];
    let i = 0;
    while (i < arr.length) {
      chunkedArray.push(arr.slice(i, i + size));
      i += size;
    }
    return chunkedArray;
  }
  */
}
