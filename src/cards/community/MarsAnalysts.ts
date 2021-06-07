import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class MarsAnalysts extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.MARS_ANALYSTS,
      tags: [Tags.BUILDING, Tags.SCIENCE],
      startingMegaCredits: 39,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: '',
        description: 'You start with 1 steel production, and 39 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.steel(1)).nbsp.megacredits(39);
          b.corpBox('effect', (ce) => {
            ce.effect('You have +3 influence.', (eb) => {
              eb.startEffect.influence(3);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    if (player.game.turmoil) {
      player.game.turmoil.addInfluenceBonus(player);
      player.game.turmoil.addInfluenceBonus(player);
      player.game.turmoil.addInfluenceBonus(player);
    }
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }
}
