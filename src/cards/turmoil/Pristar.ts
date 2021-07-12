import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {IResourceCard} from '../ICard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class Pristar extends Card implements CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.PRISTAR,
      startingMegaCredits: 46,
      resourceType: ResourceType.PRESERVATION,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: 'R07',
        description: 'You start with 46 M€. Decrease your TR 1 step. 2 VP per preservation resource here.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(45).nbsp.nbsp.minus().tr();
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, if you did not get TR so far this generation, add one preservation resource here and gain 4 M€.', (eb) => {
              eb.production((pb) => pb.tr(1, Size.SMALL, true)).startEffect.preservation(1).megacredits(4);
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.preservation(2, 1),
      },
    });
  }

    public resourceCount = 0;

    public play(player: Player) {
      player.decreaseTerraformRatingSteps(1);
      return undefined;
    }

    public getVictoryPoints(): number {
      return 2 * this.resourceCount;
    }

    public onProductionPhase(player: Player) {
      if (!(player.hasIncreasedTerraformRatingThisGeneration)) {
        player.megaCredits += 4;
        player.addResourceTo(this, 1);
      }
      return undefined;
    }
}
