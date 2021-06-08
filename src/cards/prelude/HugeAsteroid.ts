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
          b.temperature(4).br;
          b.megacredits(-6);
        }),
        description: 'Increase Temperature 4 steps. Pay 6 M€.',
      },
    });
  }
  public play(player: Player) {
    player.game.increaseTemperature(player, 2);
    player.game.increaseTemperature(player, 2);
    player.game.defer(new SelectHowToPayDeferred(player, 6));
    return undefined;
  }
}
