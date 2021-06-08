import {IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class LivestockAutomate extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.LIVESTOCK_AUTOMATE,
      tags: [Tags.ANIMAL],
      cost: 11,
      resourceType: ResourceType.ANIMAL,

      requirements: CardRequirements.builder((b) => b.oxygen(9)),
      metadata: {
        cardNumber: '184',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().plants(1).br.plus().megacredits(2).animals(1);
          }).br;
          b.vpText('1 VP for each Animal on this card.');
        }),
        description: {
          text: 'Requires 9% oxygen. Decrease your Plant production 1 step and increase your M€ production 2 steps. Add 1 Animal to this card each production phase.',
          align: 'left',
        },
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 1),
      },
    });
  }

    public resourceCount = 0;
    public canPlay(player: Player): boolean {
      return super.canPlay(player) && player.getProduction(Resources.PLANTS) >= 1;
    }
    public getVictoryPoints(): number {
      return this.resourceCount;
    }
    public play(player: Player) {
      player.addProduction(Resources.PLANTS, -1);
      player.addProduction(Resources.MEGACREDITS, 2);
      return undefined;
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}

