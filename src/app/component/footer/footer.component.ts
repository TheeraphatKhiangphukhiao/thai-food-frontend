import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /*
  ใน method scrollToTop() นี้ เราใช้ window.scrollTo() method เพื่อเลื่อนหน้าเว็บไปยัง
  ด้านบนของหน้าเว็บ โดยกำหนดค่า top: 0 เพื่อให้หน้าเว็บเลื่อนขึ้นไปยังด้านบนของหน้าเว็บ และ
  behavior: 'smooth' เพื่อให้การเลื่อนเป็นการเลื่อนแบบ smooth scrolling ที่สวยงามและ
  สามารถควบคุมความเร็วได้
  */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
}
