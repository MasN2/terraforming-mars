import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
import {IActionCard, ICard, IResourceCard} from '../ICard';
import {SelectCard} from '../../inputs/SelectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {LogHelper} from '../../LogHelper';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {AltSecondaryTag} from '../render/CardRenderItem';

export class Celestic extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.CELESTIC,
      tags: [Tags.VENUS, Tags.JOVIAN],
      startingMegaCredits: 41,
      resourceType: ResourceType.FLOATER,
      cardType: CardType.CORPORATION,
      initialActionText: 'Draw 3 cards with a floater icon on it',

      metadata: {
        cardNumber: 'R05',
        description: 'You start with 41 M€. As your first action, reveal cards from the deck until you have revealed 3 cards with a floater icon on it. Take them into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(41).nbsp.cards(3).secondaryTag(AltSecondaryTag.FLOATER);
          b.corpBox('action', (ce) => {
            ce.action('Add two floaters to ANY card. 1 VP per 3 floaters on this card.', (eb) => {
              eb.empty().startAction.floaters(2).asterix();
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.floaters(1, 3),
      },
    });
  }

    public resourceCount = 0;

    private static readonly floaterCards: Set<CardName> = new Set([
      CardName.AEROSPORT_TOURNAMENT,
      CardName.AIR_SCRAPPING_EXPEDITION,
      CardName.AIR_RAID,
      CardName.AIRLINERS,
      CardName.ATMOSCOOP,
      CardName.FLOATER_LEASING,
      CardName.FLOATER_PROTOTYPES,
      CardName.FLOATER_TECHNOLOGY,
      CardName.HYDROGEN_TO_VENUS,
      CardName.NITROGEN_FROM_TITAN,
      CardName.STRATOSPHERIC_BIRDS,
    ]);

    public initialAction(player: Player) {
      player.drawCard(3, {
        include: (card) => Celestic.floaterCards.has(card.name) || card.resourceType === ResourceType.FLOATER,
      });
      return undefined;
    }

    public play() {
      return undefined;
    }

    public canAct(): boolean {
      return true;
    }

    public getVictoryPoints(): number {
      return Math.floor(this.resourceCount / 3);
    }

    public action(player: Player) {
      const floaterCards = player.getResourceCards(ResourceType.FLOATER);
      if (floaterCards.length === 1) {
        player.addResourceTo(this, 2);
        LogHelper.logAddResource(player, floaterCards[0]);
        return undefined;
      }

      return new SelectCard(
        'Select card to add 2 floaters',
        'Add floater',
        floaterCards,
        (foundCards: Array<ICard>) => {
          player.addResourceTo(foundCards[0], {log: true});
          player.addResourceTo(foundCards[0], {log: true});
          return undefined;
        },
      );
    }
}
