import {Card} from '../Card';
import {CorporationCard} from './CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Helion extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.HELION,
      tags: [Tags.SPACE],
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 5 heat production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.heat(5).digit).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.effect('You may use heat as MC. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(0).multiplier;
            });
          });
        }),
      },
    });
  }
  public play(player: Player) {
    player.canUseHeatAsMegaCredits = true;
    player.addProduction(Resources.HEAT, 5);
    return undefined;
  }
}
