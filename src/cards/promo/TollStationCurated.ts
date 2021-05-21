import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class TollStationCurated extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.TOLL_STATION_CURATED,
      tags: [Tags.SPACE],
      cost: 12,

      metadata: {
        cardNumber: '099',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).slash().space().played.any.asterix();
          });
        }),
        description: 'Increase your M€ production 1 step for each space tag of the OPPONENT with the most space tags.',
      },
    });
  }
  public play(player: Player) {
    const amount = player.game.getPlayers()
      .filter((aPlayer) => aPlayer !== player)
      .map((opponent) => opponent.getTagCount(Tags.SPACE, false, false))
      .reduce((a, c) => Math.max(a, c), 0);
    player.addProduction(Resources.MEGACREDITS, amount, {log: true});
    return undefined;
  }
}