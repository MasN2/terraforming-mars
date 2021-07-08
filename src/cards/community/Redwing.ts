import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {IResourceCard} from '../ICard';
import {CardRenderer} from '../render/CardRenderer';

export class Redwing extends Card implements CorporationCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.REDWING,
      tags: [Tags.EARTH, Tags.ANIMAL],
      resourceType: ResourceType.ANIMAL,
      startingMegaCredits: 35,

      metadata: {
        cardNumber: '',
        description: 'You start with 35 M€ and two animals. Add one more animal here each production phase.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(35).animals(2).production((pb) => pb.animals(1));
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a card, you pay 1 M€ less for it for each three animals on this card.', (eb) => {
              eb.empty().startEffect.megacredits(-1).slash().animals(3);
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public getCardDiscount(_player: Player, _card: IProjectCard) {
    return Math.floor(this.resourceCount / 3);
  }

  public play() {
    this.resourceCount = 2;
    return undefined;
  }

  public onProductionPhase(_player: Player) {
    this.resourceCount += 1;
    return undefined;
  }
}
