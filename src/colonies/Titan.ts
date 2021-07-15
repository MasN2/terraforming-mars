import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';
import {ResourceType} from '../ResourceType';

export class Titan extends Colony {
    public name = ColonyName.TITAN;
    public description = 'Floaters';
    public isActive = false;
    public resourceType = ResourceType.FLOATER;
    public buildType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public buildQuantity = [4, 4, 4];
    public tradeType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public tradeQuantity = [1, 2, 2, 3, 4, 5, 6];
    public colonyBonusType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
}
