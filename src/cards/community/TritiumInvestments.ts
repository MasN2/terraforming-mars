import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {IActionCard, IResourceCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {Resources} from '../../Resources';

export class TritiumInvestments extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.TRITIUM_INVESTMENTS,
      tags: [Tags.EARTH, Tags.EARTH],
      startingMegaCredits: 31,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 31 M€ and 1 MC production per OTHER player. Decrease your TR 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(31).production((pb) => pb.megacredits(1).slash().delegates(1).asterix()).nbsp.minus().tr(1, Size.SMALL);
          b.corpBox('action', (ce) => {
            ce.action('Increase your MC production by the current generation number.', (eb) => {
              eb.empty().startAction.production((pb) => pb.megacredits(1).slash().text('generation', Size.SMALL, true));
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, player.game.getPlayers().length - 1);
    player.decreaseTerraformRatingSteps(1);
    if (player.game.getPlayers().length === 1) {
      player.addProduction(Resources.MEGACREDITS, 3);
    }
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addProduction(Resources.MEGACREDITS, player.game.generation, {log: true});
    return undefined;
  }
}
