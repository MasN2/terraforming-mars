import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class OuterPlanetAlliance extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.OUTER_PLANET_ALLIANCE,
      tags: [Tags.JOVIAN, Tags.EARTH],

      metadata: {
        cardNumber: '',
        description: 'You start with 36 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(36);
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, draw a card with a Jovian tag, and a card with an Earth tag.', (eb) => {
              eb.production((pb) => pb.cards(1).secondaryTag(Tags.JOVIAN).cards(1).secondaryTag(Tags.EARTH));
            });
          });
        }),
      },
    });
  }

    public play() {
      return undefined;
    }

    public onProductionPhase(player: Player) {
      player.drawCard(1, {tag: Tags.JOVIAN});
      player.drawCard(1, {tag: Tags.EARTH});
      return undefined;
    }
}
