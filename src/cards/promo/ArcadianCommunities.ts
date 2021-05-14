import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CorporationCard} from '../corporation/CorporationCard';
import {Resources} from '../../Resources';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {IActionCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class ArcadianCommunities extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ARCADIAN_COMMUNITIES,
      tags: [Tags.BUILDING],
      startingMegaCredits: 36,
      initialActionText: 'Place a community (player marker) on a non-reserved area',

      metadata: {
        cardNumber: 'R44',
        description: 'You start with 2 steel production and 36 MC. AS YOUR FIRST ACTION, PLACE A COMMUNITY [PLAYER MARKER] ON FOUR NON-RESERVED AREAS.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.steel(2)).nbsp.megacredits(36).br;
          b.community().community().community()..community();
          b.corpBox('action', (ce) => {
            ce.text('ACTION: PLACE A COMMUNITY (PLAYER MARKER) ON A NON-RESERVED AREA ADJACENT TO ONE OF YOUR TILES OR MARKED AREAS', Size.TINY, true);
            ce.vSpace(Size.MEDIUM);
            ce.text('EFFECT: MARKED AREAS ARE RESERVED FOR YOU. WHEN YOU PLACE A TILE THERE, GAIN 4 M€', Size.TINY, true);
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    for (let i = 0; i < 4; i++) {
      player.game.defer(new SelectSpace(
        'Select space for claim',
        player.game.board.getAvailableSpacesOnLand(player),
        (foundSpace: ISpace) => {
          foundSpace.player = player;
          player.game.log('${0} placed a Community (player marker)', (b) => b.player(player));
          return undefined;
        },
      ));
    }
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
    player.addProduction(Resources.STEEL, 2);
    return undefined;
  }
}
