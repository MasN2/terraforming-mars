import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../Units';

export class AICentralAutomate extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.AI_CENTRAL_AUTOMATE,
      tags: [Tags.SCIENCE, Tags.BUILDING],
      cost: 19,
      productionBox: Units.of({energy: -1}),

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 3)),
      metadata: {
        description: {
          text: 'Requires 3 Science tags to play. Decrease your Energy production 1 step. Draw 2 cards now and each production phase.',
          align: 'left',
        },
        cardNumber: '208',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.minus().energy(1).br.cards(2)).cards(2);
        }),
        victoryPoints: 1,
      },
    });
  }
  public canPlay(player: Player): boolean {
    return super.canPlay(player) && player.getProduction(Resources.ENERGY) >= 1;
  }
  public play(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.drawCard(2);
    return undefined;
  }
  public getVictoryPoints() {
    return 1;
  }
  public onProductionPhase(player: Player) {
    player.drawCard(2);
    return undefined;
  }
}
