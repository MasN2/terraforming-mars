import {Tags} from '../Tags';
import {IActionCard} from '../ICard';
import {Player} from '../../Player';
import {CorporationCard} from './../corporation/CorporationCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {LogHelper} from '../../LogHelper';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../Units';

export class RobinsonIndustries extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ROBINSON_INDUSTRIES,
      tags: [Tags.WILDCARD],
      startingMegaCredits: 41,
      productionBox: Units.of({megacredits: 2}),

      metadata: {
        cardNumber: 'R27',
        description: 'You start with 41 M€ and 2 MC production.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.production((pb) => pb.megacredits(2)).megacredits(41);
          b.corpBox('action', (ce) => {
            ce.action('Spend 4 M€ to increase (one of) your LOWEST production 1 step.', (eb) => {
              eb.megacredits(4).startAction.production((pb) => pb.wild(1).asterix());
            });
          });
        }),
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2);
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.canAfford(4);
  }

  public action(player: Player) {
    let minimum = player.getProduction(Resources.MEGACREDITS);
    let lowest: Array<SelectOption> = [];

    [Resources.MEGACREDITS, Resources.STEEL, Resources.TITANIUM, Resources.PLANTS, Resources.ENERGY, Resources.HEAT].forEach((resource) => {
      const option = new SelectOption('Increase ' + resource + ' production 1 step', 'Select', () => {
        this.increaseAndLogProduction(player, resource);
        return undefined;
      });

      if (player.getProduction(resource) < minimum) {
        lowest = [];
        minimum = player.getProduction(resource);
      }
      if (player.getProduction(resource) === minimum) lowest.push(option);
    });

    const result = new OrOptions();
    result.options = lowest;
    return result;
  }

  private increaseAndLogProduction(player: Player, resource: Resources) {
    player.addProduction(resource, 1);
    player.megaCredits -= 4;
    LogHelper.logGainProduction(player, resource);
  }
}
