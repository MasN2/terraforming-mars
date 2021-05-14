import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {Card} from '../Card';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class PointLuna extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.POINT_LUNA,
      tags: [Tags.SPACE, Tags.EARTH],
      startingMegaCredits: 48,

      metadata: {
        cardNumber: 'R10',
        description: 'You start with 1 titanium production and 48 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.titanium(1)).nbsp.megacredits(48);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an Earth tag, including this, draw a card, then discard a card.', (eb) => {
              eb.earth().played.startEffect.plus().cards(1).minus().cards(1);
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: Player, card: IProjectCard) {
    const tagCount = card.tags.filter((tag) => tag === Tags.EARTH).length;
    if (player.isCorporation(this.name) && card.tags.includes(Tags.EARTH)) {
      player.drawCard(tagCount);
      player.game.defer(new DiscardCards(player, tagCount, 'Point Luna effect: Select card(s) to discard'));
    }
  }
  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    player.drawCard();
    player.game.defer(new DiscardCards(player, 1, 'Point Luna effect: Select a card to discard'));
    return undefined;
  }
}
