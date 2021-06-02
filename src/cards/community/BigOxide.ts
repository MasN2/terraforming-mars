import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Tags} from '../Tags';
import {IActionCard, IResourceCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';

export class BigOxide extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.BIG_OXIDE,
      tags: [Tags.VENUS, Tags.BUILDING],
      startingMegaCredits: 37,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 37 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(37);
          b.corpBox('action', (ce) => {
            ce.action('Spend 1 energy to raise oxygen or Venus.', (eb) => {
              eb.energy(1).startAction.oxygen(1).or().venus(1);
            });
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const hasEnoughEnergy = player.energy >= 1;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(REDS_RULING_POLICY_COST) && hasEnoughEnergy;
    }

    return hasEnoughEnergy;
  }

  public action(player: Player) {
    player.energy -= 1;

    const game = player.game;
    const increaseOxy = new SelectOption('Raise oxygen 1 step', 'Raise oxygen', () => {
      game.increaseOxygenLevel(player, 1);
      return undefined;
    });
    const increaseVenus = new SelectOption('Raise Venus 1 step', 'Raise venus', () => {
      game.increaseVenusScaleLevel(player, 1);
      return undefined;
    });
    const increaseOxyOrVenus = new OrOptions(increaseOxy, increaseVenus);
    increaseOxyOrVenus.title = 'Choose global parameter to raise';
    return increaseOxyOrVenus;
  }
}
