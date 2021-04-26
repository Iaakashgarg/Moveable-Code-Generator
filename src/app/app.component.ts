
import { Component, HostListener } from '@angular/core';
import {AppConstants} from './Constants/AppConstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Moveable-Box-Generator';
  selectedBox: string = '';
  KeyboardControls = ['On','Off'];
  offKeyboardControls = false
  lastItem: number;
  totalBoxes: number = 126;  // Fixed no. of boxes in Rectangular Fence
  offSet: number;
  position: number;
  boxes: number[] = [];
  parentOffSetTop: number = 97;  // Fixed offSetTop of Rectangular Fence
  parentOffSetLeft: number = 35; // Fixed offSetLeft of Rectangular Fence
  pixel: number = 10; //Move box by 10 AppConstants.px in all sides

  // This method is used to add new box to the window
  addNewBox(): void {
    if (this.boxes.length < this.totalBoxes) {
    this.boxes.length == 0 ? this.lastItem = -1 : this.lastItem = this.boxes[this.boxes.length - 1];
    this.boxes.push(this.lastItem + 1);
    } 
  }

  // This method sets the z-index of newly created boxes
  ngAfterViewChecked() {
    if (this.boxes.length > 0) {
    const currentItem = (this.boxes.length - 1).toString();
    document.getElementById(currentItem).style.zIndex = currentItem;
    }
  }

  // Keyboard event listener method
  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
      if (this.offKeyboardControls) {
      event.returnValue = false;
      event.preventDefault();
      }
      else {
        if (event.code == AppConstants.KeyW || event.code == AppConstants.ArrowUp){
          this.position = (parseInt(document.getElementById(this.selectedBox).style.top, this.pixel) || 0);
          this.offSet = +(document.getElementById(this.selectedBox).offsetTop);
          if (this.offSet - this.pixel > this.parentOffSetTop) {
            this.position -= this.pixel;
            document.getElementById(this.selectedBox).style.top = this.position + AppConstants.px;
          }
          else
          {
            const offsetPartial = this.offSet - this.parentOffSetTop + this.pixel;
            this.position -= offsetPartial;
            document.getElementById(this.selectedBox).style.top = this.position + AppConstants.px;
          }
        }
        else if (event.code == AppConstants.KeyA || event.code == AppConstants.ArrowLeft) {
          this.offSet = +(document.getElementById(this.selectedBox).offsetLeft);
          this.position = (parseInt(document.getElementById(this.selectedBox).style.left, this.pixel) || 0);
          if (this.offSet - this.pixel > this.parentOffSetLeft) {
            this.position -= this.pixel;
            document.getElementById(this.selectedBox).style.left = this.position + AppConstants.px;
          }
          else
          {
            const offsetPartial = this.offSet - this.parentOffSetLeft + this.pixel;
            this.position -= offsetPartial;
            document.getElementById(this.selectedBox).style.left = this.position + AppConstants.px;
          }
        }
        else if (event.code == AppConstants.KeyS || event.code == AppConstants.ArrowDown) {
          this.position = (parseInt(document.getElementById(this.selectedBox).style.top, this.pixel) || 0) + this.pixel;
          this.offSet = +(document.getElementById(this.selectedBox).offsetTop);
          if (this.offSet - this.pixel < 643) {
          document.getElementById(this.selectedBox).style.top = this.position + AppConstants.px;
          }
        }
        else if (event.code == AppConstants.KeyD || event.code == AppConstants.ArrowRight) {
          this.position = (parseInt(document.getElementById(this.selectedBox).style.left, this.pixel) || 0) + this.pixel;
          this.offSet = +(document.getElementById(this.selectedBox).offsetLeft);
          if (this.offSet - this.pixel < 1396) {
          document.getElementById(this.selectedBox).style.left = this.position + AppConstants.px;
          }
          
        }
        else if (event.code == AppConstants.Delete) {
          if (+this.selectedBox == this.boxes[this.boxes.length - 1]) {
            const index = this.boxes.indexOf(+this.selectedBox);
            this.boxes.splice(index,1);
          }
          else {
            document.getElementById(this.selectedBox).style.visibility = AppConstants.Hidden;
          }
          this.selectedBox = '';       
        }
      }
    }

    // This method is used to disable/enable keyboard controls
    changeKeyboardControl(event: any){
        event == AppConstants.Off ? this.offKeyboardControls = true : this.offKeyboardControls = false;
    }

    // This method is used to highlight selected box
    selectBox(event: any) {
     if (this.selectedBox != null && this.selectedBox != undefined && this.selectedBox != '') {
     document.getElementById(this.selectedBox).style.backgroundColor = AppConstants.Aqua;
     }
     this.selectedBox = event.toElement.id;
     document.getElementById(this.selectedBox).style.backgroundColor = AppConstants.Red;

  }

}
