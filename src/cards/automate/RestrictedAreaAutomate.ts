import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {TileType} from '../../TileType';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {CardName} from '../../CardName';
import {IAdjacencyBonus} from '../../ares/IAdjacencyBonus';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';

export class RestrictedAreaAutomate extends Card implements IProjectCard {
  constructor(
    name: CardName = CardName.RESTRICTED_AREA_AUTOMATE,
    adjacencyBonus: IAdjacencyBonus | undefined = undefined,
    metadata: CardMetadata = {
      cardNumber: '199',
      renderData: CardRenderer.builder((b) => {
        b.production((pb) => pb.minus().megacredits(2).br.cards(1)).cards(1);
        b.tile(TileType.RESTRICTED_AREA, true);
      }),
      description: 'Decrease your megacredit production by 2. Draw a card now and each production phase. Place this tile.',
    }) {
    super({
      cardType: CardType.ACTIVE,
      name,
      tags: [Tags.SCIENCE],
      cost: 11,
      adjacencyBonus,

      metadata,
    });
  }
  public canPlay(player: Player): boolean {
    return player.game.board.getAvailableSpacesOnLand(player).length > 0 && player.getProduction(Resources.MEGACREDITS) >= -3;
  }
  public play(player: Player) {
    player.drawCard();
    return new SelectSpace('Select space for tile', player.game.board.getAvailableSpacesOnLand(player), (foundSpace: ISpace) => {
      player.game.addTile(player, foundSpace.spaceType, foundSpace, {tileType: TileType.RESTRICTED_AREA});
      foundSpace.adjacency = this.adjacencyBonus;
      return undefined;
    });
  }
  public onProductionPhase(player: Player) {
    player.drawCard();
    return undefined;
  }
}
