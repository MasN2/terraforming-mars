import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {CardRenderer} from '../render/CardRenderer';

export class PolarIndustries extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.POLAR_INDUSTRIES,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'P26',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(3)).megacredits(5).br;
          b.oceans(1);
        }),
        description: 'Increase your heat production 3 steps. Gain 5 MC. Place an Ocean tile.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.HEAT, 2);
    player.megaCredits += 5;
    player.game.defer(new PlaceOceanTile(player));
    return undefined;
  }
}
