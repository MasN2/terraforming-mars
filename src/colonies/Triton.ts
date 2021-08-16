import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';
import {Resources} from '../Resources';
import {ResourceType} from '../ResourceType';

export class Triton extends Colony {
    public name = ColonyName.TRITON;
    public description = 'Floaters/Titanium';
    public resourceType = ResourceType.FLOATER;
    public buildType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public buildQuantity = [4, 4, 4];
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [1, 1, 2, 2, 3, 4, 5];
    public tradeResource = Resources.TITANIUM;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusResource = Resources.TITANIUM;
}
