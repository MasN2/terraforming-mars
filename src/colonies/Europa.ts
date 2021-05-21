import {Colony, ShouldIncreaseTrack} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class Europa extends Colony {
    public name = ColonyName.EUROPA;
    public description = 'Production';
    public buildType = ColonyBenefit.PLACE_OCEAN_TILE;
    public tradeType = ColonyBenefit.GAIN_PRODUCTION;
    public tradeQuantity = [1, 1, 1, 1, 1, 5, 3];
    public tradeResource = [
      Resources.HEAT, Resources.MEGACREDITS,
      Resources.ENERGY, Resources.STEEL,
      Resources.TITANIUM, Resources.MEGACREDITS, Resources.PLANTS,
    ];
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusResource = Resources.PLANTS;
    public colonyBonusQuantity = 1;
    public shouldIncreaseTrack = ShouldIncreaseTrack.ASK;
}
