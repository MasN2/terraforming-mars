import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class Pluto extends Colony {
    public name = ColonyName.PLUTO;
    public description = 'Animal/Cards';
    public resourceType = ResourceType.ANIMAL;
    public buildType = ColonyBenefit.ADD_RESOURCES_TO_CARD;
    public tradeType = ColonyBenefit.DRAW_CARDS;
    public tradeQuantity = [1, 1, 2, 2, 3, 3, 4];
    public colonyBonusType = ColonyBenefit.DRAW_CARDS;
}
