import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../Units';

export class SocietySupport extends PreludeCard {
  constructor() {
    super({
      name: CardName.SOCIETY_SUPPORT,
      tags: [Tags.WILDCARD],
      productionBox: Units.of({heat: 1, plants: 1, energy: 1}),

      metadata: {
        cardNumber: 'P31',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plants(1).energy(1).heat(1);
          });
        }),
        description: 'Increase your plant, energy and heat production 1 step.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    player.addProduction(Resources.ENERGY, 1);
    player.addProduction(Resources.HEAT, 1);
    return undefined;
  }
}
