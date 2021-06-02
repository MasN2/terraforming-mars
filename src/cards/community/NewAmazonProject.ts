import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {Board} from '../../boards/Board';
import {PlaceGreeneryTile} from '../../deferredActions/PlaceGreeneryTile';
import {ISpace} from '../../boards/ISpace';
import {IActionCard, IResourceCard} from '../ICard';
import {SelectSpace} from '../../inputs/SelectSpace';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class NewAmazonProject extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.NEW_AMAZON_PROJECT,
      tags: [Tags.PLANT, Tags.PLANT],
      startingMegaCredits: 35,
      initialActionText: 'Place two greenery tiles and raise the oxygen 2 steps',
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 35 M€. As your first action, place two greenery tiles and raise the oxygen 2 steps.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(35).nbsp.greenery().greenery();
          b.corpBox('action', (ce) => {
            ce.action('Pay 12 MC to place a greenery tile on ANY SPACE ADJACENT TO AT LEAST TWO OTHER GREENERY TILES.', (eb) => {
              eb.megacredits(12).startAction.greenery().asterix();
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.cities(-1, 1),
      },
    });
  }

  public initialAction(player: Player) {
    player.game.defer(new PlaceGreeneryTile(player, 'Select space for first greenery'));
    player.game.defer(new PlaceGreeneryTile(player, 'Select space for second greenery'));
    return undefined;
  }

  public getVictoryPoints(player: Player) {
    return -1 * player.game.board.spaces.filter((space) => Board.isCitySpace(space) && space.player !== undefined && space.player === player).length;
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.canAfford(12);
  }

  private getAvailableSpaces(player: Player): Array<ISpace> {
    return player.game.board.getAvailableSpacesOnLand(player)
      .filter((space) => player.game.board.getAdjacentSpaces(space).filter((adjacentSpace) => Board.isGreenerySpace(adjacentSpace)).length >= 2);
  }

  public action(player: Player) {
    player.megaCredits -= 12;
    return new SelectSpace('Select space next to at least 2 other greenery tiles', this.getAvailableSpaces(player), (foundSpace: ISpace) => {
      return player.game.addGreenery(player, foundSpace.id);
    });
  }
}
