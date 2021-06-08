import {IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {ResourceType} from '../../ResourceType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class FishAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.FISH_AUTOMATE,
      tags: [Tags.ANIMAL],
      cost: 7,
      resourceType: ResourceType.ANIMAL,

      requirements: CardRequirements.builder((b) => b.temperature(2)),
      metadata: {
        cardNumber: '052',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.minus().plants(1).any.br.animals(1)).br;
          b.vpText('1 VP for each Animal on this card.');
        }),
        description: {
          text: 'Requires +2 C° or warmer. Decrease any Plant production 1 step. Add 1 animal here each production phase.',
          align: 'left',
        },
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 1),
      },
    });
  }
    public resourceCount: number = 0;

    public canPlay(player: Player): boolean {
      return super.canPlay(player) && player.game.someoneHasResourceProduction(Resources.PLANTS, 1);
    }
    public getVictoryPoints(): number {
      return this.resourceCount;
    }
    public play(player: Player) {
      player.game.defer(new DecreaseAnyProduction(player, Resources.PLANTS, 1));
      return undefined;
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}
