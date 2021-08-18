import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class SolarWind extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.SOLAR_WIND,
      tags: [Tags.SPACE, Tags.ENERGY],
      startingMegaCredits: 44,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: '',
        description: 'You start with 44 M€, and 2 energy production.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(44).nbsp.production((pb) => pb.energy(2));
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever you increase energy production, including this, gain an equal amount of titanium.', (eb) => {
              eb.production((pb) => pb.energy(1)).startEffect.titanium(1);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 2);
    return undefined;
  }

  public static onProductionGain(player: Player, resource: Resources, amount: number) {
    if (amount > 0 && resource === Resources.ENERGY) {
      player.addResource(Resources.TITANIUM, amount);
    }
  }
}
