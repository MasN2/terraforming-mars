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
          b.production((pb) => pb.heat(3).energy(1)).br;
          b.energy(4);
        }),
        description: 'Increase your heat production 3 steps and energy production 1 step. Gain 4 energy.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.HEAT, 3);
    player.addProduction(Resources.ENERGY, 1);
    player.energy += 4;
    return undefined;
  }
}
