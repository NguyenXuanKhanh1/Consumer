import { NgModule } from '@angular/core';
import { TabDemoComponent } from './tab';
import { ValidationDemoComponent } from './validation';
import { DashboardDemoComponent } from './dashboard/index';
import { DashboardFakeComponent } from './dashboard-fake/dashboard-fake.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { ButtonDemoComponent } from './button';
import { FormsModule } from '@angular/forms';
import { Framework4CModule, FormModule } from 'ngx-fw4c';
import { CommonModule } from '@angular/common';
import { ListConsumersComponent } from './list-consumers/list-consumers.component';
import { EditConsumerComponent } from './edit-consumer/edit-consumer.component';


const declarations = [
  TabDemoComponent,
  ValidationDemoComponent,
  DashboardDemoComponent,
  DashboardFakeComponent,
  ButtonDemoComponent,
  ServiceManagementComponent,
  ListConsumersComponent,
  EditConsumerComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [
    FormsModule,
    CommonModule,
    Framework4CModule.forRoot()
  ]
})

export class DemoModule { }
