import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
	ClientValidator,
	ValidationService,
	ValidationOption,
	RequiredValidationRule,
	CustomValidationRule
} from "ngx-fw4c";
import { Observable, of } from "rxjs";
import { Consumer } from "./consumer.model";
import { EditConsumerService } from "./edit-consumer.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
	selector: "app-edit-consumer",
	templateUrl: "./edit-consumer.component.html"
})
export class EditConsumerComponent {
	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	public item: Consumer = {};
	public items: Consumer[] = [];
	constructor(
		private _service: EditConsumerService,
		private _validationService: ValidationService,
		private http: HttpClient
	) { }

	ngAfterViewInit() {
		this.initValidations();
	}

	public isValid(): boolean {
		if (this._validationService.isValid(false)) {
			return true;
		} else return false;
	}

	public apiUrl = "http://192.168.35.108:8001/consumers";
	public body: any;
	public header = {
		headers: new HttpHeaders({ "Content-Type": "application/json" })
	};

	callback(): Observable<any> {
		this.body = JSON.stringify(this.item);
		console.log(this.item);
		return of(this.postData());
	}

	postData() {
		this.http.post(this.apiUrl, this.body, this.header).subscribe();
	}

	private initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: "UserName",
				valueResolver: () => this.item.username,
				relevantFields: () => ["Custom_ID"],
				rules: [
					new RequiredValidationRule(),
					new CustomValidationRule(value => {
						return this._service.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: "Custom_ID",
				valueResolver: () => this.item.custom_id,
				relevantFields: () => ["UserName"],
				rules: [
					new RequiredValidationRule(),
					new CustomValidationRule((value, payload) => {
						return this._service.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: "Tags",
				valueResolver: () => this.item.tags,
				rules: [
					new CustomValidationRule((value, payload) => {
						return this._service.validateString(value);
					})
				]
			})
		];
		var validator = new ClientValidator({
			formRef: this.formRef,
			options: options,
			payloadRef: () => this.item
		});
		this._validationService.init({ validator });
	}
}
