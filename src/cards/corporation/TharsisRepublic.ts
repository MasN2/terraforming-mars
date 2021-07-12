import {Card} from '../Card';
import {CorporationCard} from './CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {SelectSpace} from '../../inputs/SelectSpace';
import {SpaceType} from '../../SpaceType';
import {ISpace} from '../../boards/ISpace';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {Priority} from '../../deferredActions/DeferredAction';
import {GainProduction} from '../../deferredActions/GainProduction';
import {Board} from '../../boards/Board';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Size} from '../render/Size';

export class TharsisRepublic extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.THARSIS_REPUBLIC,
      tags: [Tags.CITY, Tags.BUILDING],
      initialActionText: 'Place a city tile',
      startingMegaCredits: 46,

      metadata: {
        cardNumber: 'R31',
        description: 'You start with 46 M€. As your first action in the game, place a city tile.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(46).nbsp.city();
          b.corpBox('effect', (ce) => {
            ce.effect('When any city tile is placed ON MARS, increase your M€ production 1 step. 1 VP per two city tiles you have.', (eb) => {
              eb.city(Size.MEDIUM).any.asterix().startEffect.production((pb) => pb.megacredits(1));
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.cities(1, 2),
      },
    });
  }

  public getVictoryPoints(player: Player) {
    return Math.floor(player.game.board.spaces.filter((space) => Board.isCitySpace(space) && space.player !== undefined && space.player === player).length / 2);
  }

  public initialAction(player: Player) {
    return new SelectSpace('Select space on mars for city tile', player.game.board.getAvailableSpacesForCity(player), (space: ISpace) => {
      player.game.addCityTile(player, space.id);
      player.game.log('${0} placed a City tile', (b) => b.player(player));
      return undefined;
    });
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (Board.isCitySpace(space)) {
      if (space.spaceType !== SpaceType.COLONY) {
        cardOwner.game.defer(
          new GainProduction(cardOwner, Resources.MEGACREDITS),
          cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
        );
      }
    }
    return;
  }

  public play(player: Player) {
    if (player.game.getPlayers().length === 1) {
      // Get bonus for 2 neutral cities
      player.addProduction(Resources.MEGACREDITS, 2);
    }
    return undefined;
  }
}
