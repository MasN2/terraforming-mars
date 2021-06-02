import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {ResourceType} from '../../ResourceType';
import {ICard, IActionCard, IResourceCard} from '../ICard';
import {AndOptions} from '../../inputs/AndOptions';
import {SelectAmount} from '../../inputs/SelectAmount';
import {SelectCard} from '../../inputs/SelectCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {LogHelper} from '../../LogHelper';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {PlayerInput} from '../../PlayerInput';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class StormCraftIncorporated extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.STORMCRAFT_INCORPORATED,
      tags: [Tags.JOVIAN],
      startingMegaCredits: 44,
      resourceType: ResourceType.FLOATER,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: 'R29',
        description: 'You start with 44 M€. 1 VP per Jovian tag you have.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(44);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Add a floater to ANY card.', (eb) => {
              eb.empty().startAction.floaters(1).asterix();
            });
            ce.vSpace();
            ce.effect('Floaters on this card may be used as 3 heat each.', (eb) => {
              eb.startEffect.floaters(1).equals().heat(3);
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.jovians(1, 1),
      },
    });
  }

  public resourceCount = 0;

  public getVictoryPoints(player: Player) {
    return player.getTagCount(Tags.JOVIAN, false, false);
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const floaterCards = player.getResourceCards(ResourceType.FLOATER);
    if (floaterCards.length === 1) {
      player.addResourceTo(this, {log: true});
      return undefined;
    }

    return new SelectCard(
      'Select card to add 1 floater',
      'Add floater',
      floaterCards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], 1);
        LogHelper.logAddResource(player, foundCards[0]);
        return undefined;
      },
    );
  }

  public spendHeat(player: Player, targetAmount: number,
    cb: () => (undefined | PlayerInput) = () => undefined): AndOptions {
    let heatAmount: number;
    let floaterAmount: number;

    return new AndOptions(
      () => {
        if (heatAmount + (floaterAmount * 3) < targetAmount) {
          throw new Error(`Need to pay ${targetAmount} heat`);
        }
        if (heatAmount > 0 && heatAmount - 1 + (floaterAmount * 3) >= targetAmount) {
          throw new Error(`You cannot overspend heat`);
        }
        if (floaterAmount > 0 && heatAmount + ((floaterAmount - 1) * 3) >= targetAmount) {
          throw new Error(`You cannot overspend floaters`);
        }
        player.removeResourceFrom(player.corporationCard as ICard, floaterAmount);
        player.heat -= heatAmount;
        return cb();
      },
      new SelectAmount('Select amount of heat to spend', 'Spend heat', (amount: number) => {
        heatAmount = amount;
        return undefined;
      }, 0, Math.min(player.heat, targetAmount)),
      new SelectAmount('Select amount of floaters on corporation to spend', 'Spend floaters', (amount: number) => {
        floaterAmount = amount;
        return undefined;
      }, 0, Math.min(player.getResourcesOnCorporation(), Math.ceil(targetAmount / 3))),
    );
  }
}
