import {Colony} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class Callisto extends Colony {
    public name = ColonyName.CALLISTO;
    public description = 'Energy';
    public buildType = ColonyBenefit.GAIN_PRODUCTION;
    public buildResource = Resources.ENERGY;
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [2, 3, 4, 6, 9, 13, 18];
    public tradeResource = Resources.ENERGY;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 4;
    public colonyBonusResource = Resources.ENERGY;
}
