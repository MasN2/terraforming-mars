import {Card} from '../Card';
import {CorporationCard} from './../corporation/CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {SelectAmount} from '../../inputs/SelectAmount';
import {LogHelper} from '../../LogHelper';
import {CardRenderer} from '../render/CardRenderer';

export class FuelGreen extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.FUEL_GREEN,
      tags: [Tags.PLANT, Tags.ENERGY],
      startingMegaCredits: 35,

      metadata: {
        cardNumber: '',
        description: 'You start with 4 plant produciton and 35 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.plants(4)).megacredits(35);
          b.corpBox('action', (ce) => {
            ce.effect('Spend any amount of Plants and gain that amount of Energy.', (eb) => {
              eb.text('x').plants(1).startAction.text('x').energy(1);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 4);
    return undefined;
  }
  public canAct(player: Player): boolean {
    return player.plants > 0;
  }
  public action(player: Player) {
    return new SelectAmount(
      'Select amount of plants to spend',
      'Spend plants',
      (amount: number) => {
        player.plants -= amount;
        player.energy += amount;
        LogHelper.logGainStandardResource(player, Resources.ENERGY, amount);
        return undefined;
      },
      1,
      player.plants,
    );
  }
}
