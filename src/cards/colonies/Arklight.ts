import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardType} from '../CardType';
import {CardName} from '../../CardName';
import {IResourceCard} from '../ICard';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class Arklight extends Card implements CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.ARKLIGHT,
      tags: [Tags.ANIMAL, Tags.ANIMAL],
      startingMegaCredits: 46,
      resourceType: ResourceType.ANIMAL,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: 'R04',
        description: 'You start with 46 M€. 1 VP per 2 animals on this card.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(46);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an animal or plant tag, including these, gain 1 MC production and add 1 animal to this card.', (eb) => {
              eb.animals(1).played.slash().plants(1).played.startEffect.production((pb) => pb.megacredits(1)).animals(1);
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 2),
      },
    });
  }

    public resourceCount = 0;

    public play(player: Player) {
      player.addProduction(Resources.MEGACREDITS, 2);
      player.addResourceTo(this, 2);
      return undefined;
    }

    public onCardPlayed(player: Player, card: IProjectCard): void {
      if (player.isCorporation(CardName.ARKLIGHT)) {
        const qty = card.tags.filter((cardTag) => cardTag === Tags.ANIMAL || cardTag === Tags.PLANT).length;
        player.addProduction(Resources.MEGACREDITS, qty);
        player.addResourceTo(this, qty);
      }
    }

    public getVictoryPoints(): number {
      return Math.floor(this.resourceCount / 2);
    }
}
