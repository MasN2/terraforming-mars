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
      startingMegaCredits: 40,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40);
          b.corpBox('action', (ce) => {
            ce.action('Increase your MC production by the current generation number.', (eb) => {
              eb.empty().startAction.production((pb) => pb.megacredits(1).slash().text('generation', Size.SMALL, true));
            });
          });
        }),
      },
    });
  }

  public play() {
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
