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
      startingMegaCredits: 41,
      initialActionText: 'Draw 1 Jovian card and 1 Earth card',

      metadata: {
        cardNumber: '',
        description: 'You start with 1 titanium production and 41 M€. As your first action, draw a Jovian and Earth card.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.titanium(1)).megacredits(41).cards(1).secondaryTag(Tags.JOVIAN).cards(1).secondaryTag(Tags.EARTH);
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, draw a card with a Jovian tag or Earth tag (at random).', (eb) => {
              eb.startEffect.production((pb) => pb.cards(1).secondaryTag(Tags.JOVIAN).or().cards(1).secondaryTag(Tags.EARTH));
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(1, {tag: Tags.JOVIAN});
    player.drawCard(1, {tag: Tags.EARTH});
    return undefined;
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    return undefined;
  }

  public onProductionPhase(player: Player) {
    player.drawCard(1, {tag_list: [Tags.JOVIAN, Tags.EARTH]});
    return undefined;
  }
}
