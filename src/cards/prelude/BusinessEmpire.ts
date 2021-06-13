import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../render/CardRenderer';

export class BusinessEmpire extends PreludeCard {
  constructor() {
    super({
      name: CardName.BUSINESS_EMPIRE,
      tags: [Tags.EARTH],

      metadata: {
        cardNumber: 'P06',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(5)).br;
          b.megacredits(-2);
        }),
        description: 'Increase your M€ production 5 steps. Pay 2 M€.',
      },
    });
  }
  public canPlay(player: Player) {
    if (player.isCorporation(CardName.MANUTECH)) return true;
    return player.canAfford(2);
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 5);
    player.game.defer(new SelectHowToPayDeferred(player, 2));
    return undefined;
  }
}

