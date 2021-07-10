import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {IActionCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {Resources} from '../../Resources';

export class LTConglomerateMars extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.LT_CONGLOMERATE_MARS,
      tags: [Tags.EARTH],
      startingMegaCredits: 32,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 32 MC and 13 MC production.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(34).production((pb) => pb.megacredits(1).slash().delegates(1).asterix()).nbsp.minus().tr(1, Size.SMALL);
          b.corpBox('effect', (ce) => {
            ce.action('After production on generation 5 only, -39 MC.', (eb) => {
              eb.text('generation 5', Size.SMALL, true).startEffect.production((pb) => pb.megacredits(-39));
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 13);
    return undefined;
  }

  public onProductionPhase(player: Player) {
    if (player.game.generation == 5) {
      player.megaCredits -= 39;
    }
    if (player.megaCredits < 0) {
      player.megaCredits = 0;
    }
    return undefined;
  }
}
