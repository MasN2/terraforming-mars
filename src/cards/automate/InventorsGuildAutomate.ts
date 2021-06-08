import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class InventorsGuildAutomate extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.INVENTORS_GUILD_AUTOMATE,
      tags: [Tags.SCIENCE],
      cost: 7,

      metadata: {
        cardNumber: '006',
        renderData: CardRenderer.builder((b) => {
          b.text('+1 research power', Size.SMALL, true).br;
          b.text('Look at the top card and either buy it or discard it', Size.SMALL, true);
        }),
      },
    });
  }

  public play(player: Player) {
    return player.drawCardKeepSome(1, {paying: true});
  }
}
