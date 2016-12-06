import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {MCNotificationType, MCNotificationsService} from "../../../../../shared/mc-notifications.service";
import {OrganizationsService} from "../../../../../backend-api/identity-registry/services/organizations.service";
import {Organization} from "../../../../../backend-api/identity-registry/autogen/model/Organization";
import {FileUploadType, McFileUploader} from "../../../../../theme/components/mcFileUploader/mcFileUploader.component";
import {Doc} from "../../../../../backend-api/service-registry/autogen/model/Doc";
import {Xml} from "../../../../../backend-api/service-registry/autogen/model/Xml";
import {NavigationHelperService} from "../../../../../shared/navigation-helper.service";
import {XmlParserService} from "../../../../../shared/xml-parser.service";
import {DesignsService} from "../../../../../backend-api/service-registry/services/designs.service";
import {Design} from "../../../../../backend-api/service-registry/autogen/model/Design";
import {ActivatedRoute} from "@angular/router";
import {LabelValueModel} from "../../../../../theme/components/mcLabelValueTable/mcLabelValueTable.component";
import {SrViewModelService} from "../../../shared/services/sr-view-model.service";
import {InstancesService} from "../../../../../backend-api/service-registry/services/instances.service";
import {Instance} from "../../../../../backend-api/service-registry/autogen/model/Instance";
import {IdServicesService} from "../../../../../backend-api/identity-registry/services/id-services.service";
import {InstanceXmlParser} from "../../../shared/services/instance-xml-parser.service";
import {MrnHelperService} from "../../../../../shared/mrn-helper.service";
import {
	McFormControlModel, SelectModel,
	McFormControlType, McFormControlModelSelect, McFormControlModelCheckbox
} from "../../../../../theme/components/mcForm/mcFormControlModel";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {UrlValidator} from "../../../../../theme/validators/url.validator";
import {ServiceViewModel} from "../../../../org-identity-registry/services/view-models/ServiceViewModel";
import {Service} from "../../../../../backend-api/identity-registry/autogen/model/Service";

@Component({
  selector: 'instance-new',
  encapsulation: ViewEncapsulation.None,
  template: require('./instance-new.html'),
  styles: []
})
export class InstanceNewComponent implements OnInit {
	@ViewChild('uploadXml')	public fileUploadXml: McFileUploader;
	public hasMrnError: boolean = false;
	public mrnErrorText: string;

  public organization: Organization;
  public labelValues:Array<LabelValueModel>;
  public captionXml = 'Upload Instance Xml file';
  public captionDoc = 'Upload Instance Document file';
  public fileTypeXml = FileUploadType.Xml;
  public fileTypeDoc = FileUploadType.Doc;
  public requiredTextXml = 'You need to upload Xml file';
  public isLoading = true;

  public isRegistering = false;
  public registerTitle = "Register Instance";
  public registerButtonClass = "btn btn-danger btn-raised";
  public onRegister: Function;

  private design:Design;
  private xml:Xml;
  private doc:Doc;

  private useOIDC:boolean = false;
	private mrn:string = '';
	private name:string = '';
	public registerForm: FormGroup;
	public formControlModels: Array<McFormControlModel>;

  constructor(private formBuilder: FormBuilder, private xmlParser: InstanceXmlParser, private mrnHelper: MrnHelperService, private activatedRoute: ActivatedRoute, private xmlParserService: XmlParserService, private viewModelService: SrViewModelService, private navigationService: NavigationHelperService, private notifications: MCNotificationsService, private designsService: DesignsService, private orgService: OrganizationsService, private instancesService: InstancesService, private idServicesService: IdServicesService) {
    this.organization = {};
  }

  ngOnInit() {
    this.onRegister = this.register.bind(this);
    this.isRegistering = false;
    this.isLoading = true;
    this.generateForm();
    this.loadMyOrganization();
    this.loadDesign();
  }

  public isFormValid() {
  	var oidcTypeValid = true;
	  let oidcAccessType = this.registerForm.value.oidcAccessType;
	  if (this.useOIDC && (!oidcAccessType || oidcAccessType.toLowerCase().indexOf('undefined') >= 0)) {
		  oidcTypeValid = false;
	  }
    return this.xml != null && this.registerForm.valid && oidcTypeValid;
  }

  public onUploadDoc(file: Doc) {
    this.doc = file;
  }

  public onUploadXml(file: Xml) {
	  if (file && this.isXmlValid(file)) {
		  this.xml = file;
	  }else {
		  this.mrn = '';
		  this.name = '';
		  this.xml = null;
		  this.fileUploadXml.resetFileSelection();
		  this.registerForm.patchValue({mrn: this.mrn});
		  this.registerForm.patchValue({name: this.name});
	  }
  }

	private isXmlValid(file: Xml) : boolean {
		try {
			let mrn = this.xmlParser.getMrn(file);
			let isValid = this.mrnHelper.checkMrnForInstance(mrn);
			this.hasMrnError = !isValid;
			if (isValid) {
				this.mrn = mrn;
				this.name = this.xmlParser.getName(file);
			} else {
				this.mrn = '';
				this.name = '';
				this.mrnErrorText = "The ID in the Xml-file is wrong. The ID is supposed to be an MRN in the following format:<BR>"
					+ this.mrnHelper.mrnMaskForInstance() + "'ID'<BR>"
					+ "'ID'=" + this.mrnHelper.mrnPatternError();
			}
			this.registerForm.patchValue({mrn: this.mrn});
			this.registerForm.patchValue({name: this.name});
			return isValid;
		} catch ( error ) {
			this.notifications.generateNotification('Error in XML', error.message, MCNotificationType.Error, error);
			return false;
		}
	}

  public cancel() {
    this.navigationService.cancelCreateInstance();
  }

  public register() {
    this.isRegistering = true;
    try {
      var instance:Instance = {};
      instance.instanceAsXml = this.xml;
      instance.instanceAsDoc = this.doc;
	    instance.name = this.xmlParser.getName(this.xml);
	    instance.description = this.xmlParser.getDescription(this.xml);
	    instance.instanceId = this.xmlParser.getMrn(this.xml);
	    instance.keywords = this.xmlParser.getKeywords(this.xml);
	    instance.status = this.xmlParser.getStatus(this.xml);
	    instance.organizationId = this.organization.mrn;
	    instance.version = this.xmlParser.getVersion(this.xml);

      // TODO change this with new version
      instance.designs = [this.design];

      this.createInstance(instance);
    } catch ( error ) {
      this.isRegistering = false;
      this.notifications.generateNotification('Error in XML', error.message, MCNotificationType.Error, error);
    }
  }

  private createInstance(instance:Instance) {
    this.instancesService.createInstance(instance).subscribe(
      instanceCreated => {
        this.registerIdService(instanceCreated);
      },
      err => {
        this.isRegistering = false;
        this.notifications.generateNotification('Error', 'Error when trying to create instance', MCNotificationType.Error, err);
      }
    );
  }

	public registerIdService(instance:Instance) {
		let service:Service = {};
		service.mrn = this.mrn;
		service.name = this.name;
		service.permissions = this.registerForm.value.permissions;
		service.certDomainName = this.registerForm.value.certDomainName;
		if (this.useOIDC) {
			service.oidcRedirectUri = this.registerForm.value.oidcRedirectUri;
			let oidcAccessType = this.registerForm.value.oidcAccessType;
			if (oidcAccessType && oidcAccessType.toLowerCase().indexOf('undefined') < 0) {
				service.oidcAccessType = oidcAccessType;
			}
		}
		this.createIdService(service, instance);
	}
  private createIdService(idService:Service, instance:Instance) {
    this.idServicesService.createIdService(idService).subscribe(
      service => {
	      this.isRegistering = false;
	      this.navigationService.navigateToOrgInstance(instance.instanceId, instance.version);
      },
      err => {
	      this.isRegistering = false;
        this.notifications.generateNotification('Error', 'Error when trying to create service instance in Identity Registry', MCNotificationType.Error, err);
	      this.navigationService.navigateToOrgInstance(instance.instanceId, instance.version);
      }
    );

  }

  private loadMyOrganization() {
    this.orgService.getMyOrganization().subscribe(
      organization => {
        this.organization = organization;
      },
      err => {
        this.notifications.generateNotification('Error', 'Error when trying to get organization', MCNotificationType.Error, err);
      }
    );
  }

  private loadDesign() {
    let designId = this.activatedRoute.snapshot.queryParams['designId'];
    let version = this.activatedRoute.snapshot.queryParams['designVersion'];
    this.designsService.getDesign(designId, version).subscribe(
      design => {
        this.design = design;
        this.labelValues = this.viewModelService.generateLabelValuesForDesign(this.design);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.notifications.generateNotification('Error', 'Error when trying to get design', MCNotificationType.Error, err);
      }
    );
  }

	private shouldUseOIDC(useOIDC:boolean) {
		this.useOIDC = useOIDC;
		this.generateForm();
	}

	private generateForm() {
		var oldForm = this.registerForm;
		this.registerForm = this.formBuilder.group({});
		if (!oldForm) {
			oldForm = this.registerForm;
		}
		this.formControlModels = [];

		var formControlModel:McFormControlModel = {formGroup: this.registerForm, elementId: 'mrn', controlType: McFormControlType.Text, labelName: 'MRN', placeholder: 'Upload Instance Xml', isDisabled: true};
		var formControl = new FormControl(this.mrn, formControlModel.validator);
		this.registerForm.addControl(formControlModel.elementId, formControl);
		this.formControlModels.push(formControlModel);

		formControlModel = {formGroup: this.registerForm, elementId: 'name', controlType: McFormControlType.Text, labelName: 'Name', placeholder: 'Upload Instance Xml', isDisabled: true};
		formControl = new FormControl(this.name, formControlModel.validator);

		this.registerForm.addControl(formControlModel.elementId, formControl);
		this.formControlModels.push(formControlModel);

		formControlModel = {formGroup: this.registerForm, elementId: 'permissions', controlType: McFormControlType.Text, labelName: 'Permissions', placeholder: ''};
		formControl = new FormControl(oldForm.value.permissions, formControlModel.validator);
		this.registerForm.addControl(formControlModel.elementId, formControl);
		this.formControlModels.push(formControlModel);

		formControlModel = {formGroup: this.registerForm, elementId: 'certDomainName', controlType: McFormControlType.Text, labelName: 'Certificate domain name', placeholder: ''};
		formControl = new FormControl(oldForm.value.certDomainName, formControlModel.validator);
		this.registerForm.addControl(formControlModel.elementId, formControl);
		this.formControlModels.push(formControlModel);

		let formControlModelCheckbox:McFormControlModelCheckbox = {state:this.useOIDC, formGroup: this.registerForm, elementId: 'useOIDC', controlType: McFormControlType.Checkbox, labelName: 'Use OpenID Connect (OIDC)'};
		formControl = new FormControl({value: '', disabled: false}, formControlModelCheckbox.validator);
		formControl.valueChanges.subscribe(param => this.shouldUseOIDC(param));
		this.registerForm.addControl(formControlModelCheckbox.elementId, formControl);
		this.formControlModels.push(formControlModelCheckbox);

		if (this.useOIDC) {
			formControlModel = {formGroup: this.registerForm, elementId: 'oidcRedirectUri', controlType: McFormControlType.Text, labelName: 'OIDC Redirect URI', placeholder: '', validator:Validators.compose([Validators.required, UrlValidator.validate]), errorText:'URI not valid'};
			formControl = new FormControl('', formControlModel.validator);
			this.registerForm.addControl(formControlModel.elementId, formControl);
			this.formControlModels.push(formControlModel);

			let formControlModelSelect:McFormControlModelSelect = {selectValues:this.selectValues(), formGroup: this.registerForm, elementId: 'oidcAccessType', controlType: McFormControlType.Select, labelName: 'Access type', placeholder: '', validator:Validators.required};
			formControl = new FormControl('', formControlModelSelect.validator);
			this.registerForm.addControl(formControlModelSelect.elementId, formControl);
			this.formControlModels.push(formControlModelSelect);
		}
	}

	private selectValues():Array<SelectModel> {
		let selectValues: Array<SelectModel> = [];
		selectValues.push({value: undefined, label: 'Choose access type...'});
		let allOidcTypes = ServiceViewModel.getAllOidcAccessTypes();
		allOidcTypes.forEach(oidcType => {
			selectValues.push({value: oidcType.value, label: oidcType.label});
		});
		return selectValues;
	}
}
