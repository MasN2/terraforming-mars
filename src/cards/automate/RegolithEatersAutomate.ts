import {IActionCard, IResourceCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {OrOptions} from '../../inputs/OrOptions';
import {ResourceType} from '../../ResourceType';
import {SelectOption} from '../../inputs/SelectOption';
import {CardName} from '../../CardName';
import {LogHelper} from '../../LogHelper';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {CardRenderer} from '../render/CardRenderer';

export class RegolithEatersAutomate extends Card implements IActionCard, IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.REGOLITH_EATERS_AUTOMATE,
      tags: [Tags.SCIENCE, Tags.MICROBE],
      cost: 12,
      resourceType: ResourceType.MICROBE,

      metadata: {
        description: 'Add 1 microbe here now and each production phase.',
        cardNumber: '033',
        renderData: CardRenderer.builder((b) => {
          b.action('Remove 3 Microbes from this card to raise oxygen level 1 step.', (eb) => {
            eb.microbes(3).startAction.oxygen(1);
          }).br;
          b.microbes(1).production((pb) => pb.microbes(1));
        }),
      },
    });
  }

    public resourceCount = 0;
  
    public play(player: Player) {
      player.addResourceTo(this, {log: true});
      return undefined;
    }
    public canAct(): boolean {
      if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !player.canAfford(REDS_RULING_POLICY_COST)) {
        return false;
      }
      return this.resourceCount >= 3;
    }
    public action(player: Player) {
      player.removeResourceFrom(this, 3);
      LogHelper.logRemoveResource(player, this, 3, 'raise oxygen 1 step');
      return player.game.increaseOxygenLevel(player, 1);
    }
    public onProductionPhase(player: Player) {
      player.addResourceTo(this);
      return undefined;
    }
}
