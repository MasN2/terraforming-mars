import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../Resources';

export class OuterPlanetAlliance extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.OUTER_PLANET_ALLIANCE,
      tags: [Tags.JOVIAN, Tags.EARTH],
      startingMegaCredits: 34,

      metadata: {
        cardNumber: '',
        description: 'You start with 1 titanium production, 1 megacredit production and 34 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.production((pb) => pb.titanium(1).megacredits(1)).nbsp.megacredits(34);
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, draw a card a Jovian tag or Earth tag (at random).', (eb) => {
              eb.startEffect.production((pb) => pb.cards(1).secondaryTag(Tags.JOVIAN).or().cards(1).secondaryTag(Tags.EARTH));
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    player.addProduction(Resources.MEGACREDITS, 1);
    return undefined;
  }

  public onProductionPhase(player: Player) {
    player.drawCard(1, {tag_list: [Tags.JOVIAN, Tags.EARTH]});
    return undefined;
  }
}
