import {Card} from '../Card';
import {Tags} from '../Tags';
import {CorporationCard} from './CorporationCard';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Teractor extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.TERACTOR,
      tags: [Tags.EARTH, Tags.EARTH],
      startingMegaCredits: 51,

      cardDiscount: {tag: Tags.EARTH, amount: 5},
      metadata: {
        cardNumber: 'R30',
        description: 'You start with 51 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(51);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an Earth tag, you pay 5 M€ less for it.', (eb) => {
              eb.earth(1).played.startEffect.megacredits(-5);
            });
          });
        }),
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.EARTH).length * 5;
  }
  public play() {
    return undefined;
  }
}
