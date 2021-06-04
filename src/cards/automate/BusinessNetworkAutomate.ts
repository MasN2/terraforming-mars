import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class BusinessNetworkAutomate extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.BUSINESS_NETWORK_AUTOMATE,
      tags: [Tags.EARTH],
      cost: 2,

      metadata: {
        cardNumber: '110',
        description: 'Decrease your M€ production 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.text('When played: Look at the top card and either buy it or discard it. Research +1', Size.SMALL, true).br;
          b.production((pb) => pb.megacredits(-1));
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.MEGACREDITS) >= -4;
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, -1);
    player.drawCardKeepSome(1, {paying: true});
    return undefined;
  }
}
