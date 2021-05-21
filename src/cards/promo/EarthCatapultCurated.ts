import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';

export class EarthCatapultCurated extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.EARTH_CATAPULT_CURATED,
      tags: [Tags.EARTH],
      cost: 23,

      requirements: CardRequirements.builder((b) => b.tag(Tags.EARTH, 3)),
      cardDiscount: {amount: 2},
      metadata: {
        cardNumber: '070',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 2 M€ less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-2);
          });
        }),
        victoryPoints: 2,
      },
    });
  }

  public getCardDiscount() {
    return 2;
  }
  public play() {
    return undefined;
  }
  public getVictoryPoints() {
    return 2;
  }
}
