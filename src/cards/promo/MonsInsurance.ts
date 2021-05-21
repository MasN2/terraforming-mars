import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class MonsInsurance extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MONS_INSURANCE,
      startingMegaCredits: 54,

      metadata: {
        cardNumber: 'R46',
        description: 'You start with 54 M€. Increase your M€ production 1 steps for each player, including you. ALL OPPONENTS DECREASE THEIR M€ production 2 STEPS. THIS DOES NOT TRIGGER THE EFFECT BELOW.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(54).production((pb) => {
            pb.megacredits(1).slash().megacredits(-2).any.asterix();
          });
          b.corpBox('effect', (cb) => {
            cb.vSpace(Size.SMALL);
            cb.effect('When a player causes another player to decrease production or lose resources, pay 3M€ to the victim, or as much as possible.', (eb) => {
              eb.production((pb) => pb.wild(1).any).or().minus().wild(1).any;
              eb.startEffect.text('pay', Size.SMALL, true).megacredits(3);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2 + player.game.getPlayers().length);
    for (const p of player.game.getPlayers()) {
      p.addProduction(Resources.MEGACREDITS, -2);
    }
    player.game.monsInsuranceOwner = player.id;
    if (player.game.getPlayers().length === 1) {
      p.addProduction(Resources.MEGACREDITS, 3);
    }
    return undefined;
  }
}
