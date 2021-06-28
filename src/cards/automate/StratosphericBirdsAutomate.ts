import {IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {RemoveResourcesFromCard} from '../../deferredActions/RemoveResourcesFromCard';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Card} from '../Card';

export class StratosphericBirdsAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      name: CardName.STRATOSPHERIC_BIRDS,
      cardType: CardType.ACTIVE,
      tags: [Tags.VENUS, Tags.ANIMAL],
      cost: 10,
      resourceType: ResourceType.ANIMAL,

      requirements: CardRequirements.builder((b) => b.venus(12)),
      metadata: {
        cardNumber: '249',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.animals(1);
          }).br;
          b.minus().floaters(1).br;
          b.vpText('1 VP for each Animal on this card.');
        }),
        description: {
          text: 'Requires Venus 12% and that you spend 1 Floater from any card. Add 1 animal here each production phase.',
          align: 'left',
        },
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 1),
      },
    });
  };
  public resourceCount: number = 0;
  public canPlay(player: Player): boolean {
    const cardsWithFloater = player.getCardsWithResources().filter((card) => card.resourceType === ResourceType.FLOATER);
    if (cardsWithFloater.length === 0) return false;

    const meetsGlobalRequirements = super.canPlay(player);

    if (cardsWithFloater.length > 1) {
      return meetsGlobalRequirements;
    } else {
      const floaterCard = cardsWithFloater[0];
      if (floaterCard.name !== CardName.DIRIGIBLES) return meetsGlobalRequirements;

      const canPayForFloater = ((floaterCard.resourceCount! - 1) * 3 + player.megaCredits) >= 10;
      return canPayForFloater && meetsGlobalRequirements;
    }
  }
  public play(player: Player) {
    player.game.defer(new RemoveResourcesFromCard(player, ResourceType.FLOATER, 1, true));
    return undefined;
  }
  public getVictoryPoints(): number {
    return this.resourceCount;
  }
  public onProductionPhase(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
