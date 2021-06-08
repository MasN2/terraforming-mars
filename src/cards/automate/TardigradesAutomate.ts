import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {IResourceCard} from '../ICard';
import {Player} from '../../Player';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class TardigradesAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.TARDIGRADES_AUTOMATE,
      tags: [Tags.MICROBE],
      cost: 2,
      resourceType: ResourceType.MICROBE,

      metadata: {
        description: 'Add 1 microbe here each production phase.',
        cardNumber: '049',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.microbes(1));
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.microbes(1, 4),
      },
    });
  }
    public resourceCount = 0;
    public getVictoryPoints(): number {
      return Math.floor(this.resourceCount / 4);
    }
    public play() {
      return undefined;
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}
