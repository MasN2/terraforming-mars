import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Aphrodite extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.APHRODITE,
      tags: [Tags.VENUS, Tags.PLANT],
      startingMegaCredits: 39,
      cardType: CardType.CORPORATION,
      initialActionText: 'Raise Venus two steps',

      metadata: {
        cardNumber: 'R01',
        description: 'You start with 39 MC. As your first action, raise Venus two steps.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(39).venus(2);
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever Venus is terraformed 1 step, you gain 2 plants.', (eb) => {
              eb.venus(1).any.startEffect.plants(2);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.game.increaseVenusScaleLevel(player, 2);
    return undefined;
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }
}
