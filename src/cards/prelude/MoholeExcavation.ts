import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MoholeExcavation extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE_EXCAVATION,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'P23',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.steel(1).br;
            pb.heat(2);
          }).steel(6).digit;
        }),
        description: 'Increase your steel production 1 step and heat production 2 steps. Gain 6 steel.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.STEEL, 1);
    player.addProduction(Resources.HEAT, 2);
    player.steel += 6;
    return undefined;
  }
}
