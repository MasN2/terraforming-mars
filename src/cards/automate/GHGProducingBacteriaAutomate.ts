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
import {CardRequirements} from '../CardRequirements';

export class GHGProducingBacteriaAutomate extends Card implements IActionCard, IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.GHG_PRODUCING_BACTERIA_AUTOMATE,
      tags: [Tags.SCIENCE, Tags.MICROBE],
      cost: 7,
      resourceType: ResourceType.MICROBE,

      requirements: CardRequirements.builder((b) => b.oxygen(4)),
      metadata: {
        description: 'Requires 4% oxygen. Add 1 microbe here now and each production phase.',
        cardNumber: '034',
        renderData: CardRenderer.builder((b) => {
          b.action('Remove 3 Microbes from this card to raise temperature 1 step.', (eb) => {
            eb.microbes(3).startAction.temperature(1);
          }).br;
          b.microbes(1).production((pb) => pb.microbes(1));
        }),
      },
    });
  }

    public resourceCount: number = 0;

    public play(player: Player) {
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
      LogHelper.logRemoveResource(player, this, 3, 'raise oxygen 1 step');
      return player.game.increaseTemperature(player, 1);
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}
