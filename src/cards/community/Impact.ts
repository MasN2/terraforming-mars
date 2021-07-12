import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {IActionCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../constants';
import {RemoveAnyPlants} from '../../deferredActions/RemoveAnyPlants';

export class Impact extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      name: CardName.IMPACT,
      tags: [],
      startingMegaCredits: 34,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 34 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(34);
          b.corpBox('action', (ce) => {
            ce.action('Raise temperature 8 steps, remove up to 16 plants from any player, and put this card face-down in your EVENTS pile. Activate only during generation 4 or later.', (eb) => {
              eb.empty().startAction.temperature(8).minus().plants(-16).any.event().played;
            });
          });
        }),
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    if (this.isDisabled) return false;
    if (player.game.generation < 4) return false;
    const remainingTemperatureSteps = (MAX_TEMPERATURE - player.game.getTemperature()) / 2;
    const stepsRaised = Math.min(remainingTemperatureSteps, 8);

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(REDS_RULING_POLICY_COST * stepsRaised);
    }
    return true;
  }

  public action(player: Player) {
    player.game.increaseTemperature(player, 3);
    player.game.increaseTemperature(player, 3);
    player.game.increaseTemperature(player, 2);
    player.game.defer(new RemoveAnyPlants(player, 16));
    this.isDisabled = true;
    return undefined;
  }
}
