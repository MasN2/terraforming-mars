import {IActionCard, IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {LogHelper} from '../../LogHelper';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {CardRenderer} from '../render/CardRenderer';

export class NitriteReducingBacteriaAutomate extends Card implements IActionCard, IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.NITRITE_REDUCING_BACTERIA_AUTOMATE,
      tags: [Tags.MICROBE],
      cost: 10,
      resourceType: ResourceType.MICROBE,

      metadata: {
        description: 'Add 4 Microbes to this card, and one more each production phase.',
        cardNumber: '157',
        renderData: CardRenderer.builder((b) => {
          b.action('Remove 4 Microbes to increase your TR 1 step.', (eb) => {
            eb.microbes(4).startAction.tr(1);
          }).br;
          b.microbes(4).production((pb) => pb.microbes(1));
        }),
      },
    });
  }

    public resourceCount = 0;

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
      return this.resourceCount >= 4;
    }
    public action(player: Player) {
      player.removeResourceFrom(this, 4);
      LogHelper.logRemoveResource(player, this, 4, 'raise TR 1 step');
      player.increaseTerraformRating();
      return undefined;
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}
