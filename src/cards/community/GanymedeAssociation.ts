import {CardName} from '../../CardName';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CorporationCard} from '../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {Resources} from '../../Resources';
import {Size} from '../render/Size';

export class GanymedeAssociation extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.GANYMEDE_ASSOCIATION,
      tags: [Tags.JOVIAN, Tags.PLANT],
      startingMegaCredits: 44,

      metadata: {
        description: 'You start with 1 plant production and 44 M€.',
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1)).nbsp.megacredits(44).br;
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.jovian().played.startEffect.megacredits(-1).slash().plants(1).played;
            });
            ce.vSpace();
            ce.effect('When you play a Jovian tag, you pay 1 M€ less for each Plant tag you have, and vice versa.', (eb) => {
              eb.plants(1).played.startEffect.megacredits(-1).slash().jovian().played;
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }

  public getCardDiscount(player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.JOVIAN).length * player.getTagCount(Tags.PLANT, false, true) + card.tags.filter((tag) => tag === Tags.PLANT).length * player.getTagCount(Tags.JOVIAN, false, true);
  }
}
