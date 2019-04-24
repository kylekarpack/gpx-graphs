import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxDataGridModule, DxSparklineModule, DxTemplateModule } from 'devextreme-angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppComponent } from './app.component';


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
