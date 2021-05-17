import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class WarpHub extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.WARP_HUB,
      tags: [Tags.SCIENCE, Tags.SPACE],
      startingMegaCredits: 35,

      cardDiscount: {tag: Tags.SPACE, amount: 7},
      metadata: {
        cardNumber: '',
        description: 'You start with 35 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(35);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a space tag, you pay 7 M€ less for it.', (eb) => {
              eb.space().played.startEffect.megacredits(-7);
            });
          });
        }),
      },
    });
  }


  public getCardDiscount(_player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.SPACE).length * 7;
  }

  public play() {
    return undefined;
  }
}
