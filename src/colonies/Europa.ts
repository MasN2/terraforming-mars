import {Colony, ShouldIncreaseTrack} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class Europa extends Colony {
    public name = ColonyName.EUROPA;
    public description = 'Production';
    public buildType = ColonyBenefit.PLACE_OCEAN_TILE;
    public tradeType = ColonyBenefit.GAIN_PRODUCTION;
    public tradeQuantity = [1, 1, 1, 1, 1, 1, 4];
    public tradeResource = [
      Resources.HEAT, Resources.MEGACREDITS,
      Resources.ENERGY, Resources.PLANTS,
      Resources.STEEL, Resources.TITANIUM, Resources.MEGACREDITS,
    ];
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusResource = Resources.MEGACREDITS;
    public colonyBonusQuantity = 2;
    public shouldIncreaseTrack = ShouldIncreaseTrack.ASK;
}
