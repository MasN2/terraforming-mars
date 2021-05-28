import {CorporationCard} from '../corporation/CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {ISpace} from '../../boards/ISpace';
import {TileType} from '../../TileType';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class SuperEffective extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.SUPER_EFFECTIVE,
      tags: [Tags.WILDCARD],
      startingMegaCredits: 36,

      metadata: {
        cardNumber: 'R38',
        description: 'You start with 36 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(36);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.oceans(1).any.startEffect.plants(2);
            });
            ce.vSpace();
            ce.effect('When any ocean tile is placed, gain 2 plants. When any greenery tile is placed, gain 2 heat.', (eb) => {
              eb.greenery().any.startEffect.heat(2);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    if (player.game.getPlayers().length === 1) {
      // Get bonus for 2 neutral greeneries
      player.heat += 4;
    }
    return undefined;
  }

  public onTilePlaced(cardOwner: Player, _activePlayer: Player, space: ISpace) {
    if (space.tile?.tileType === TileType.OCEAN) {
      cardOwner.plants += 2;
    }
    if (space.tile?.tileType === TileType.GREENERY) {
      cardOwner.heat += 2;
    }
  }
}
