import {CorporationCard} from '../corporation/CorporationCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class TerralabsResearch extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.TERRALABS_RESEARCH,
      tags: [Tags.SCIENCE, Tags.EARTH],
      startingMegaCredits: 21,
      cardType: CardType.CORPORATION,
      cardCost: 1,

      metadata: {
        cardNumber: 'R14',
        description: 'You start with 21 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(21);
          b.corpBox('effect', (ce) => {
            ce.effect('Buying cards to hand costs 1 M€.', (eb) => {
              eb.cards(1).startEffect.megacredits(1);
            });
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }
}
