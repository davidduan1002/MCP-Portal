import {Vessel} from "../../../../backend-api/identity-registry/autogen/model/Vessel";
import {VesselAttribute} from "../../../../backend-api/identity-registry/autogen/model/VesselAttribute";
import AttributeNameEnum = VesselAttribute.AttributeNameEnum;

export interface VesselAttributeViewModel extends VesselAttribute {
	attributeNameText?:string;
}

// TODO maybe this should just be a helper.service instead. Or mayby just static methods if no objects is needed
export class VesselViewModel {
	private attributes:Array<VesselAttributeViewModel>;
	private vessel:Vessel;
	constructor(vessel:Vessel) {
		this.vessel = vessel;
		this.generateAttributes();
	}

	public static convertVesselsToViewModels(vessels:Array<Vessel>):Array<VesselViewModel> {
		let viewModels:Array<VesselViewModel> = [];
		if (vessels) {
			vessels.forEach(vessel => {
				viewModels.push(new VesselViewModel(vessel));
			});
		}
		return viewModels;
	}

	public getVessel():Vessel {
		return this.vessel;
	}

	public getAttributeViewModels():Array<VesselAttributeViewModel> {
		return this.attributes;
	}

	private generateAttributes() {
		this.attributes = [];
		if (this.vessel.attributes) {
			this.vessel.attributes.forEach(attribute => {
				this.attributes.push(this.attributeViewModelFromAttribute(attribute));
			});
		}
	}

	private attributeViewModelFromAttribute(attribute:VesselAttribute): VesselAttributeViewModel {
		let attributeViewModel: VesselAttributeViewModel = attribute;
		attributeViewModel.attributeNameText = this.getTextForVesselAttributeNameEnum(attribute.attributeName);
		return attributeViewModel;
	}

	private getTextForVesselAttributeNameEnum(vesselAttributeEnum:AttributeNameEnum):string {
		var text = '';
		switch (vesselAttributeEnum) {
			case AttributeNameEnum.ais_class: {
				text = 'AIS class';
				break;
			}
			case AttributeNameEnum.callsign: {
				text = 'Call sign';
				break;
			}
			case AttributeNameEnum.flagstate: {
				text = 'Flag state';
				break;
			}
			case AttributeNameEnum.imo_number: {
				text = 'IMO number';
				break;
			}
			case AttributeNameEnum.mmsi_number: {
				text = 'MMSI number';
				break;
			}
			case AttributeNameEnum.port_of_register: {
				text = 'Port of register';
				break;
			}
			default : {
				text = AttributeNameEnum[vesselAttributeEnum];
			}
		}
		return text;
	}

}