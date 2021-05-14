import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../CardName';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../render/CardRenderer';

export class HugeAsteroid extends PreludeCard {
  constructor() {
    super({
      name: CardName.HUGE_ASTEROID,

      metadata: {
        cardNumber: 'P15',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3).br;
        }),
        description: 'Increase Temperature 3 steps.',
      },
    });
  }
  public play(player: Player) {
    player.game.increaseTemperature(player, 3);
    return undefined;
  }
}
