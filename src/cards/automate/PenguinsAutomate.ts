import {IProjectCard} from '../IProjectCard';
import {IResourceCard} from '../ICard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {ResourceType} from '../../ResourceType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class PenguinsAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.PENGUINS_AUTOMATE,
      tags: [Tags.ANIMAL],
      cost: 5,
      resourceType: ResourceType.ANIMAL,

      requirements: CardRequirements.builder((b) => b.oceans(8)),
      metadata: {
        cardNumber: '212',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.animals(1));
          b.vpText('1 VP for each animal on this card.');
        }),
        description: 'Requires 8 oceans. Add 1 animal here each production phase.',
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 1),
      },
    });
  }
    public resourceCount = 0;

    public play() {
      return undefined;
    }

    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }

    public getVictoryPoints(): number {
      return this.resourceCount;
    }
}
