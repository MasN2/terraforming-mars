import {Card} from '../Card';
import {CorporationCard} from './CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Inventrix extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.INVENTRIX,
      tags: [Tags.SCIENCE, Tags.SCIENCE],
      initialActionText: 'Draw 4 cards',
      startingMegaCredits: 42,

      metadata: {
        cardNumber: 'R43',
        description: 'As your first action in the game, draw 4 cards. Start with 42 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(42).nbsp.cards(4);
          b.corpBox('effect', (ce) => {
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +3 or -3 steps, your choice in each case.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 3');
            });
          });
        }),
      },
    });
  }
  public initialAction(player: Player) {
    player.drawCard(4);
    return undefined;
  }
  public getRequirementBonus(): number {
    return 3;
  }
  public play() {
    return undefined;
  }
}

