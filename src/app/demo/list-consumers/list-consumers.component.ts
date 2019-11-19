import {
	Component,
	ViewChild,
	ElementRef,
	OnInit
} from "@angular/core";
import {
	TableOption,
	ModalService,
	TemplateViewModel,
	TableComponent,
	TableMode,
	TableColumnType
} from "ngx-fw4c";
import { ListConsumersService } from './list-consumers.service';
import { EditConsumerComponent } from '../edit-consumer/edit-consumer.component';

@Component({
	selector: 'app-list-consumers',
	templateUrl: './list-consumers.component.html'
})
export class ListConsumersComponent implements OnInit {
	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@ViewChild("tableTemplate", { static: true })
	public tableTemplate: TableComponent;
	public option: TableOption;

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