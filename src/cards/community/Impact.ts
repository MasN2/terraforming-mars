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
      startingMegaCredits: 35,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 35 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(35);
          b.corpBox('action', (ce) => {
            ce.action('Raise temperature 7 steps, remove up to 14 plants from any player, and put this card face-down in your EVENTS pile. Activate only during generation 4 or later.', (eb) => {
              eb.empty().startAction.temperature(7).minus.plant(-14).any;
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
    const stepsRaised = Math.min(remainingTemperatureSteps, 7);

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(REDS_RULING_POLICY_COST * stepsRaised);
    }
    return true;
  }

  public action(player: Player) {
    player.game.increaseTemperature(player, 3);
    player.game.increaseTemperature(player, 3);
    player.game.increaseTemperature(player, 1);
    player.game.defer(new RemoveAnyPlants(player, 14));
    this.isDisabled = true;
    return undefined;
  }
}
