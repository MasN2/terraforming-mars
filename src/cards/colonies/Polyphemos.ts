import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Polyphemos extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS,
      tags: [Tags.SPACE],
      startingMegaCredits: 40,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: 'R11',
        description: 'You start with 40 MC.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.effect('When you decline to buy a card, gain 1 titanium, including the starting hand.', (eb) => {
              eb.cards(1, true).startEffect.titanium(1);
            });
          });
        }),
      },
    });
  }
  public play(player: Player) {
    player.titanium = 10 - player.cardsInHand.length;
    return undefined;
  }
}
