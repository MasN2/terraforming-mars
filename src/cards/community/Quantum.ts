import {Card} from '../Card';
import {CorporationCard} from './../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Quantum extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.QUANTUM,
      tags: [Tags.SCIENCE, Tags.ENERGY],
      startingMegaCredits: 41,

      metadata: {
        cardNumber: '',
        description: 'You start with 41 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(41);
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play a science tag, including this, increase your energy production.', (eb) => {
              eb.science(1).played.startEffect.production((pb) => pb.energy(1));
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.corporationCard !== undefined && player.corporationCard.name === this.name) {
      player.addProduction(Resources.ENERGY, card.tags.filter((tag) => tag === Tags.SCIENCE).length);
    }
    return undefined;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    return undefined;
  }
}
