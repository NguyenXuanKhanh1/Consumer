// import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
// import { TableComponent, TableOption, ModalService, DataService, TemplateViewModel, ConfirmViewModel, TableConstant, TableMode, TableColumnType } from 'ngx-fw4c';
// import { ServiceManagementService } from '../service-management/service-management.service';
// import { ButtonDemoComponent } from '..';
// import { ListConsumersService } from './list-consumers.service';

// @Component({
//   selector: 'app-list-consumers',
//   templateUrl: './list-consumers.component.html',
//   styleUrls: ['./list-consumers.component.scss']
// })
// export class ListConsumersComponent implements OnInit {

//   // @ViewChild("imageTemplate", { static: true })
//   // public imageTemplate: TemplateRef<any>;
//   // @ViewChild("tableTemplate", { static: true })
//   // public tableTemplate: TableComponent;
//   // public option: TableOption;

//   // @ViewChild("detailTemplate", { static: true })
//   // public datailTemplate: TemplateRef<any>;
//   @ViewChild("formRef", { static: true }) public formRef: ElementRef;
//   @ViewChild("tableTemplate", { static: true })
//   public tableTemplate: TableComponent;
//   public option: TableOption;
//   @ViewChild("imageTemplate", { static: true })
//   public imageTemplate: TemplateRef<any>;

//   constructor(
//     private _modalService: ModalService,
//     private _dataService: DataService,
//     private _consumerService: ListConsumersService
//   ) {}

//   ngOnInit(): void {
//     this.initTable();
//   }

//   private initTable() {
//     this.option = new TableOption({
//       inlineEdit: false,
//       mode: TableMode.full,
//       searchFields: ["name", "host"],
//       // displayText: {
//       //   pageTitle: 'test',
//       //   allTitle: 'aaa'
//       // },
//       topButtons: [
//         {
//           icon: "fa fa-plus",
//           customClass: "primary",
//           title: () => "New",
//           executeAsync: item => {
//             this._modalService.showTemplateDialog(new TemplateViewModel({
//               customSize: 'modal-lg',
//               title: 'Add New Service',
//               template: ButtonDemoComponent,
//               btnAcceptTitle: 'Add',
//               acceptCallback: () => {
//                 this.tableTemplate.reload().subscribe();
//               }
//             }));
//           }
//         },
//         {
//           icon: "fa fa-refresh",
//           title: () => "Reload",
//           executeAsync: item => {
//             this.tableTemplate.reload();
//           }
//         }
//       ],
//       actions: [
//         {
//           icon: "fa fa-edit",
//           executeAsync: () => {
//             //call other api....
//           }
//         },
//         // {
//         //   icon: "fa fa-remove",
//         //   executeAsync: (item) => {
//         //     this._consumerService.deleteData(item.id)
//         //   }
//         // }
//       ],
//       mainColumns: [
//         {
//           type: TableColumnType.String,
//           title: () => "NAME",
//           valueRef: () => "name",
//           width: 500,
//           allowFilter: false
//         },
//         {
//           type: TableColumnType.String,
//           title: () => "USERNAME",
//           valueRef: () => "username",
//           allowFilter: false
//         },
//         {
//           type: TableColumnType.String,
//           title: () => "TAGS",
//           valueRef: () => "tags",
//           allowFilter: false
//         },
//         {
//           type: TableColumnType.String,
//           title: () => "Created",
//           valueRef: () => "created_at",
//           allowFilter: false
//         }
//       ],
//       serviceProvider: {
//         searchAsync: request => {
//           return this._consumerService.getData(request);
//         }
//       }
//     });
//   }

// }


import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input,
  TemplateRef
} from "@angular/core";
import {
  ValidationService,
  ValidationOption,
  ClientValidator,
  CustomValidationRule,
  RequiredValidationRule,
  ValidationRuleResponse
} from "ngx-fw4c";
import { of } from "rxjs";
import {
  TableOption,
  ModalService,
  DataService,
  TemplateViewModel,
  TableComponent,
  ConfirmViewModel,
  TableConstant,
  TableMode,
  TableColumnType
} from "ngx-fw4c";
import { ListConsumersService } from './list-consumers.service';
import { ButtonComponent } from 'ngx-fw4c/lib/components/shared/button/button/button.component';
import { EditConsumerComponent } from '../edit-consumer/edit-consumer.component';
// import { AddServiceComponent } from './add-service/add-service.component';
// import { ServiceManagementService } from './service-management.service';

@Component({
  selector: 'app-list-consumers',
  templateUrl: './list-consumers.component.html',
  styleUrls: ['./list-consumers.component.scss']
})
export class ListConsumersComponent implements OnInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true })
  public tableTemplate: TableComponent;
  public option: TableOption;
  @ViewChild("imageTemplate", { static: true })
  public imageTemplate: TemplateRef<any>;

  constructor(
    private _modalService: ModalService,
    private _serviceManagementService: ListConsumersService
  ) { }

  ngOnInit() {
    this.initTable();

  }
  private initTable() {
    this.option = new TableOption({
      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ["name", "host"],
      // displayText: {
      //   pageTitle: 'test',
      //   allTitle: 'aaa'
      // },
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: item => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              customSize: 'modal-lg',
              title: 'Add New Service',
              template: EditConsumerComponent,
              btnAcceptTitle: 'Add',
              acceptCallback: (response, provider) => {
                this.tableTemplate.reload(true).subscribe();
                this.tableTemplate.reload();
              }
            }));
          }
        },
        {
          icon: "fa fa-refresh",
          title: () => "Reload",
          executeAsync: item => {
            this.tableTemplate.reload();
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: () => {
            //call other api....
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (item) => {
            this._serviceManagementService.deleteData(item.id).subscribe(data => {
              this.tableTemplate.reload().subscribe();
            })
          }
        }
      ],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => 'USERNAME',
          valueRef: () => 'username',
          width: 500,
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "CUSTOM_ID",
          valueRef: () => "custom_id",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Tags",
          valueRef: () => "tags",
          allowFilter: false
        },
        {
          type: TableColumnType.Date,
          title: () => "Created",
          valueRef: () => "created_at",
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {

          return this._serviceManagementService.getData(request);
        }
      }
    });
  }
}