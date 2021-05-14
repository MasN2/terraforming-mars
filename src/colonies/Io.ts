import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';
import {Resources} from '../Resources';

export class Io extends Colony {
    public name = ColonyName.IO;
    public description = 'Heat';
    public buildType = ColonyBenefit.INCREASE_TEMPERATURE;
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [2, 3, 5, 7, 9, 12, 15];
    public tradeResource = Resources.HEAT;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 3;
    public colonyBonusResource = Resources.HEAT;
}
