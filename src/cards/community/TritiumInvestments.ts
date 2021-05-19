import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
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
      resourceType: ResourceType.CAMP,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 31 M€ and 1 MC production per OTHER player. Decrease your TR 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(31).production((pb) => pb.megacredits(1).slash().delegates(1)).minus().tr(1, Size.SMALL);
          b.corpBox('action', (ce) => {
            ce.action('Increase your MC production by 1 per camp here, THEN add a camp here.', (eb) => {
              eb.empty().startAction.production((pb) => pb.megacredits(1).slash().camps()).camps();
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, player.game.getPlayers().length - 1);
    player.decreaseTerraformRatingSteps(1);
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addProduction(Resources.MEGACREDITS, this.resourceCount, {log: true});
    player.addResourceTo(this);
    return undefined;
  }
}
