import {Colony} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class Ganymede extends Colony {
    public name = ColonyName.GANYMEDE;
    public description = 'Microbes/Plants';
    public resourceType = ResourceType.MICROBE;
    public buildType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public buildQuantity = [3, 3, 3];
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [1, 2, 3, 4, 5, 6, 7];
    public tradeResource = Resources.PLANTS;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 2;
    public colonyBonusResource = Resources.PLANTS;
}
