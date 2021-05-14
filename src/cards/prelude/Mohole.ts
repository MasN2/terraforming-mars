import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Mohole extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE,
      tags: [Tags.BUILDING, Tags.ENERGY],

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(4).energy(1)).br;
          b.heat(2);
        }),
        description: 'Increase your heat production 4 steps and energy production 1 step. Gain 2 heat.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.HEAT, 4);
    player.addProduction(Resources.ENERGY, 1);
    player.heat += 2;
    return undefined;
  }
}
