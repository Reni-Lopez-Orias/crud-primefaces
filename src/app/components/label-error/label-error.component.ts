import { Component, Input } from '@angular/core'; 

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent {

  @Input("control")
  control: any; 

  errorMsg: string = '';
  
  constructor() { }
  
  ngDoCheck() { 
    if (this.control) {
      this.errorMsg = this.getErrors();
    } 
  }
  
  getErrors( ): string {  
    return Object.entries(this.control?.errors ?? {})
      .map(([key, msg]: [string, any]) => ({ key, msg }))[0]?.msg;
  }

}
