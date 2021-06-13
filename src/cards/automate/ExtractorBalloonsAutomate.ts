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
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';

export class ExtractorBalloonsAutomate extends Card implements IActionCard, IResourceCard {
  constructor() {
    super({
      name: CardName.EXTRACTOR_BALLOONS_AUTOMATE,
      cardType: CardType.ACTIVE,
      tags: [Tags.VENUS],
      cost: 20,
      resourceType: ResourceType.FLOATER,

      metadata: {
        description: 'Add 4 floaters here now and one more each production phase.',
        cardNumber: '223',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 3 Floaters here to raise Venus 1 step.', (be) => {
            be.floaters(3).startAction.venus(1);
          b.floaters(4).production((pb) => pb.floaters(1));
          });
        }),
      },
    });
  };

  public resourceCount: number = 0;

  public play(player: Player) {
    player.addResourceTo(this, {log: true});
    player.addResourceTo(this, {log: true});
    player.addResourceTo(this, {log: true});
    player.addResourceTo(this, {log: true});
    return undefined;
  }
  public canAct(player: Player): boolean {
      if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !player.canAfford(REDS_RULING_POLICY_COST)) {
        return false;
      }
    return this.resourceCount >= 3;
  }
  public action(player: Player) {
    player.removeResourceFrom(this, 3);
    LogHelper.logRemoveResource(player, this, 3, 'raise Venus 1 step');
    player.game.increaseVenusScaleLevel(player, 1);
    return undefined;
  }
  public onProductionPhase(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
