import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './CorporationCard';
import {Phase} from '../../Phase';
import {ISpace} from '../../boards/ISpace';
import {SpaceBonus} from '../../SpaceBonus';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {GainProduction} from '../../deferredActions/GainProduction';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../Units';
import {BoardType} from '../../boards/BoardType';

export class MiningGuild extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MINING_GUILD,
      tags: [Tags.BUILDING, Tags.BUILDING],
	  initialActionText: 'Place a special tile',
      startingMegaCredits: 36,

      metadata: {
        cardNumber: 'R24',
        description: 'You start with 36 M€. As your first action in the game, place this tile on a location with a STEEL bonus.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(36).nbsp.tile(TileType.MINING_RIGHTS, true).asterix();
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you get any steel as a placement bonus on the map, increase your steel production 1 step.', (eb) => {
              eb.steel(1).asterix();
              eb.startEffect.production((pb) => pb.steel(1));
            });
          });
		  b.corpBox('effect', (ce) => {
            ce.effect('Same for titanium.', (eb) => {
              eb.titanium(1).asterix();
              eb.startEffect.production((pb) => pb.titanium(1));
            });
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace, boardType: BoardType) {
    // TODO(kberg): Clarify that this is nerfed for The Moon.
    // Nerfing on The Moon.
    if (boardType !== BoardType.MARS) {
      return;
    }
    if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase.SOLAR) {
      return;
    }
    if (space.bonus.some((bonus) => bonus === SpaceBonus.STEEL || bonus === SpaceBonus.TITANIUM)) {
      cardOwner.game.defer(new GainProduction(cardOwner, Resources.STEEL));
    }
  }
  
  public initialAction(player: Player) {
    return new SelectSpace('Select space for special tile', player.game.board.getAvailableSpacesOnLand(player).filter((space) => space.bonus.includes(SpaceBonus.STEEL), (space: ISpace) => {
      player.game.addTile(player, foundSpace.spaceType, foundSpace, {tileType: TileType.MINING_RIGHTS});
      foundSpace.adjacency = this.adjacencyBonus;
      return undefined;
    });
  }

  public play(player: Player) {
    return undefined;
  }
}
