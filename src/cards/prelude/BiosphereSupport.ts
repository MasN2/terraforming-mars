import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class BiosphereSupport extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOSPHERE_SUPPORT,
      tags: [Tags.PLANT, Tags.PLANT],

      metadata: {
        cardNumber: 'P05',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).plants(2);
          });
        }),
        description: 'Increase your plant production 2 steps. Increase your M€ production 1 step.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }
}

