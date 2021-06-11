import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SmeltingPlant extends PreludeCard {
  constructor() {
    super({
      name: CardName.SMELTING_PLANT,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'P30',
        renderData: CardRenderer.builder((b) => {
          b.oxygen(2).br;
          b.steel(7);
        }),
        description: 'Raise oxygen 2 steps. Gain 7 steel.',
      },
    });
  }
  public play(player: Player) {
    player.steel += 7;
    return player.game.increaseOxygenLevel(player, 2);
  }
}
