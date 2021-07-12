import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {IActionCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Resources} from '../../Resources';

export class UnitedNationsMagnetizerProject extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      name: CardName.UNITED_NATIONS_MAGNETIZER_PROJECT,
      tags: [Tags.EARTH, Tags.BUILDING],
      startingMegaCredits: 35,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 35 M€ and 1 energy production. 1 additional VP per three TR you have.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(35).production((pb) => pb.energy(1));
          b.corpBox('action', (ce) => {
            ce.action('Decrease your Energy production 1 step to increase your terraform rating 1 step.', (eb) => {
              eb.production((pb) => pb.energy(1)).startAction.tr(1);
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.tr(1, 3),
      },
    });
  }

  public getVictoryPoints(player: Player) {
    return Math.floor(player.getTerraformRating() / 3);
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    return undefined;
  }

  public canAct(player: Player): boolean {
    const hasEnergyProduction = player.getProduction(Resources.ENERGY) >= 1;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(REDS_RULING_POLICY_COST) && hasEnergyProduction;
    }

    return hasEnergyProduction;
  }
  public action(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.increaseTerraformRating();
    return undefined;
  }
}
