import {CorporationCard} from '../corporation/CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {ISpace} from '../../boards/ISpace';
import {TileType} from '../../TileType';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {Priority} from '../../deferredActions/DeferredAction';
import {GainProduction} from '../../deferredActions/GainProduction';
import {CardType} from '../CardType';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class LakefrontResorts extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.LAKEFRONT_RESORTS,
      tags: [Tags.BUILDING],
      startingMegaCredits: 46,
      initialActionText: 'Place an Ocean',

      metadata: {
        cardNumber: 'R38',
        description: 'You start with 46 M€. As your first action, place an ocean.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(46).oceans(1);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.MEDIUM);
            ce.effect('When any ocean tile is placed, increase your M€ production 1 step.', (eb) => {
              eb.oceans(1).any.startEffect.production((pb) => pb.megacredits(1));
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.game.defer(new PlaceOceanTile(player));
    return undefined;
  }

  public play(player: Player) {
    if (player.game.getPlayers().length === 1) {
      // Get bonus for 1 starting ocean
      player.addProduction(Resources.MEGACREDITS, 1);
    }
    return undefined;
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (space.tile?.tileType === TileType.OCEAN) {
      cardOwner.game.defer(
        new GainProduction(cardOwner, Resources.MEGACREDITS),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }
}
