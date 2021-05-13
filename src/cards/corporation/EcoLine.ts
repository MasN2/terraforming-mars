import {Card} from '../Card';
import {CorporationCard} from './CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {CardRenderer} from '../render/CardRenderer';

export class EcoLine extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ECOLINE,
      tags: [Tags.PLANT, Tags.PLANT],
      startingMegaCredits: 39,

      metadata: {
        cardNumber: 'R17',
        description: 'You start with 3 plant production, and 39 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(3)).nbsp.megacredits(36);
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play a plant or microbe tag, including these, gain 2 MC or 1 plant.', (eb) => {
              eb.plants(1).played.slash().microbes(1).played.startEffect.megacredits(2).slash().plants(1);
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
      if (player.corporationCard !== undefined && player.corporationCard.name === this.name){
          const lifeTags = card.tags.filter((tag) => tag === Tags.PLANT || tag === Tags.MICROBE).length;
          for (let i = 0; i < lifeTags; i++) {
            player.game.defer(new DeferredAction(
              player,
              () => {
                return new OrOptions(
                  new SelectOption('Gain 2 MC', 'Gain MC', () => {
                    player.addResource(Resources.MEGACREDITS, 2);
                    player.game.log('${0} gained 2 MC', (b) => b.player(player));
                    return undefined;
                  }),
                  new SelectOption('Gain 1 plant', 'Gain plant', () => {
                    player.addResource(Resources.PLANTS, 1);
                    player.game.log('${0} gained 1 PLANT', (b) => b.player(player));
                    return undefined;
                  }),
                );
              },
            ), -1); // Unshift that deferred action
          }
      }
      return undefined;
    }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 3);
    const lifeTags = 2;
      for (let i = 0; i < lifeTags; i++) {
        player.game.defer(new DeferredAction(
          player,
          () => {
            return new OrOptions(
              new SelectOption('Gain 2 MC', 'Gain MC', () => {
                player.addResource(Resources.MEGACREDITS, 2);
                player.game.log('${0} gained 2 MC', (b) => b.player(player));
                return undefined;
              }),
              new SelectOption('Gain 1 plant', 'Gain plant', () => {
                player.addResource(Resources.PLANTS, 1);
                player.game.log('${0} gained 1 PLANT', (b) => b.player(player));
                return undefined;
              }),
            );
          },
        ), -1); // Unshift that deferred action
      }
    return undefined;
  }
}
