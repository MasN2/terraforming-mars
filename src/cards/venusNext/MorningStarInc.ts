import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {GlobalParameter} from '../../GlobalParameter';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class MorningStarInc extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.MORNING_STAR_INC,
      tags: [Tags.VENUS, Tags.VENUS],
      startingMegaCredits: 47,
      cardType: CardType.CORPORATION,
      initialActionText: 'Draw 3 cards with a Venus tag',

      metadata: {
        cardNumber: 'R06',
        description: 'You start with 47 M€. As your first action, reveal cards from the deck until you have revealed 3 Venus tags. Take them and discard the rest. 1 VP per two Venus tags you have.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(47).nbsp.cards(3).secondaryTag(Tags.VENUS);
          b.corpBox('effect', (ce) => {
            ce.effect('Your Venus requirements are +/- 3 steps, your choice in each case.', (eb) => {
              eb.plate('Venus requirements').startEffect.text('+/- 3');
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.venus(1, 2),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(3, {tag: Tags.VENUS});
    return undefined;
  }

  public getRequirementBonus(_player: Player, parameter: GlobalParameter): number {
    return parameter === GlobalParameter.VENUS ? 3 : 0;
  }

  public getVictoryPoints(player: Player) {
    return Math.floor(player.getTagCount(Tags.VENUS, false, false) / 2);
  }

  public play() {
    return undefined;
  }
}
