import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
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
      startingMegaCredits: 19,
      cardType: CardType.CORPORATION,
      cardCost: 1,

      metadata: {
        cardNumber: 'R14',
        description: 'You start with 19 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(19);
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
