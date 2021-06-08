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
      initialActionText: 'Draw a Jovian card',

      metadata: {
        cardNumber: '',
        description: 'You start with 1 titanium production, 3 megacredit production, and 34 M€. As your first action, draw a Jovian card.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.titanium(1).megacredits(3)).megacredits(34).cards(1).secondaryTag(Tags.JOVIAN);
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
