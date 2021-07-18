import {CorporationCard} from '../corporation/CorporationCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {ISpace} from '../../boards/ISpace';
import {TileType} from '../../TileType';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class CommonCause extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.COMMON_CAUSE,
      tags: [Tags.SCIENCE, Tags.PLANT],
      startingMegaCredits: 45,

      metadata: {
        cardNumber: 'R38',
        description: 'You start with 45 M€ and 2 plant production.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(45).production((pb) => pb.plants(2));
          b.corpBox('effect', (ce) => {
            ce.effect('When any player places a greenery, they draw a card. 1 VP per 2 cards in any players hand.', (eb) => {
              eb.greenery().any.startEffect.cards(1).any;
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.cards(1, 2, true),
      },
    });
  }

  public getVictoryPoints(player: Player) {
    let cardsCount: number = 0;
    player.game.getPlayers().forEach((player) => {
      cardsCount += player.cardsInHand.length;
    });
    return Math.floor(cardsCount / 2);
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }

  public onTilePlaced(_cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (space.tile?.tileType === TileType.GREENERY) {
      activePlayer.drawCard();
    }
  }
}
