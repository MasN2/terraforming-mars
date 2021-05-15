import {Player} from '../../Player';
import {Card} from '../Card';
import {CorporationCard} from '../corporation/CorporationCard';
import {Resources} from '../../Resources';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {IActionCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {PlaceCommunityTile} from '../../deferredActions/PlaceCommunityTile';
import {CardRenderer} from '../render/CardRenderer';

export class ArcadianCommunities extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ARCADIAN_COMMUNITIES,
      startingMegaCredits: 38,
      initialActionText: 'Place a community (player marker) on a non-reserved area',

      metadata: {
        cardNumber: 'R44',
        description: 'You start with 1 steel production and 38 MC. As your first action, place 4 communities.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1)).nbsp.megacredits(38).br;
          b.community().community().community().community();
          b.corpBox('action', (ce) => {
            ce.action('Place a community adjacent to one of your tiles or communities. When you place a tile there, gain 5 MC.', (eb) => {
              eb.empty().startAction.community().asterix().nbsp.community().colon().megacredits(5);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.game.defer(new PlaceCommunityTile(player, 'Select space for first community'));
    player.game.defer(new PlaceCommunityTile(player, 'Select space for second community'));
    player.game.defer(new PlaceCommunityTile(player, 'Select space for third community'));
    player.game.defer(new PlaceCommunityTile(player, 'Select space for fourth community'));
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.game.board.getAvailableSpacesForMarker(player).length > 0;
  }

  public action(player: Player) {
    return new SelectSpace(
      'Select space for claim',
      player.game.board.getAvailableSpacesForMarker(player),
      (foundSpace: ISpace) => {
        foundSpace.player = player;
        return undefined;
      },
    );
  }

  public play(player: Player) {
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }
}
