import {IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Card} from '../Card';

export class VenusianInsectsAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      name: CardName.VENUSIAN_INSECTS_AUTOMATE,
      cardType: CardType.ACTIVE,
      tags: [Tags.VENUS, Tags.MICROBE],
      cost: 3,
      resourceType: ResourceType.MICROBE,

      requirements: CardRequirements.builder((b) => b.venus(12)),
      metadata: {
        cardNumber: '260',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.microbes(1);
          }).br;
          b.vpText('1 VP for every 2nd Microbe on this card.');
        }),
        description: 'Requires Venus 12%. Add 1 microbe here each production phase.',
        victoryPoints: CardRenderDynamicVictoryPoints.microbes(1, 2),
      },
    });
  };
  public resourceCount: number = 0;

  public play() {
    return undefined;
  }
  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 2);
  }
  public onProductionPhase(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
