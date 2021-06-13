import {IActionCard, IResourceCard} from '../ICard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LogHelper} from '../../LogHelper';
import {Card} from '../Card';

export class LocalShadingAutomate extends Card implements IActionCard, IResourceCard {
  constructor() {
    super({
      name: CardName.LOCAL_SHADING_AUTOMATE,
      cardType: CardType.ACTIVE,
      tags: [Tags.VENUS],
      cost: 3,
      resourceType: ResourceType.FLOATER,

      metadata: {
        description: 'Add 1 floater here now and each production phase.',
        cardNumber: '235',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 2 Floaters here to increase your megacredit production 1 step.', (be) => {
            be.floaters(2).startAction.production((pb) => pb.megacredits(1));
          b.floaters(1).production((pb) => pb.floaters(1));
          });
        }),
      },
    });
  };

  public resourceCount: number = 0;

  public play(player: Player) {
    player.addResourceTo(this, {log: true});
    return undefined;
  }
  public canAct(): boolean {
    return this.resourceCount >= 2;
  }
  public action(player: Player) {
    player.removeResourceFrom(this, 2);
    LogHelper.logRemoveResource(player, this, 2, 'raise megacredit production 1 step');
    player.addProduction(Resources.MEGACREDITS, 1);
    return undefined;
  }
  public onProductionPhase(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
