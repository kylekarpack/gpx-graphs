import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxDataGridComponent, DxDataGridModule, DxCheckBoxModule, DxSparklineModule, DxTemplateModule } from 'devextreme-angular';
  import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
  


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule,

    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
