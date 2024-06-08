import { Injectable } from '@angular/core';
import { Convert as adminCvt, Admin } from 'src/app/model/admin.model'; // จะเเปลง JSON เป็น class จะต้อง import
import { Convert as customerCvt, Customer } from 'src/app/model/customer.model'; // จะเเปลง JSON เป็น class จะต้อง import

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiEndpoint = 'http://localhost:80/shopwebapi' // attribute เพื่อเอาไว้เก็บ url ของ api
  type : any; // attribute เพื่อเก็บข้อมูลชนิดทั้งหมดที่มี
  gid : any; // attribute เพื่อเก็บ gid ของอาหาร ที่ลูกค้าเลือก
  name : any; // attribute เพื่อเก็บ name ของอาหาร ที่ลูกค้าเลือก
  sum_total : any; // attribute เพื่อเก็บ ราคารวมของสินค้าในตะกร้า เพื่อนำไปเเสดงผลเเละ insert ลง database เมื่อลูกค้ากดยืนยันการสั่งซื้อ

  // admin = Array<Admin>(); // attribute เพื่อเก็บข้อมูลของ admin ที่ทำการ Log In โดยมีชนิดเป็น Admin = model ที่เราสร้างขึ้น
  // customer = Array<Customer>(); // attribute เพื่อเก็บข้อมูลของ customer ที่ทำการ Log In โดยมีชนิดเป็น customer = model ที่เราสร้างขึ้น

  admin : any;
  customer : any;

  data: [number, number][] = []; // Array Tuple ใช้เก็บข้อมูลสินค้าที่ลูกค้าเพิ่มลงในตะกร้า โดย key จะเก็บ gid กับ value จะเก็บจำนวนอาหารที่ลูกค้าเพิ่มลงตะกร้า

  constructor() { }
}
