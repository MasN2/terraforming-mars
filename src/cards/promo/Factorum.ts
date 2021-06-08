import {Card} from '../Card';
import {CorporationCard} from '../corporation/CorporationCard';
import {Player} from '../../Player';
import {Tags} from '../Tags';
import {IActionCard} from '../ICard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {LogHelper} from '../../LogHelper';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class Factorum extends Card implements IActionCard, CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.FACTORUM,
      tags: [Tags.ENERGY, Tags.BUILDING],
      startingMegaCredits: 38,

      metadata: {
        cardNumber: 'R22',
        description: 'You start with 38 M€. Increase your steel production 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(38).nbsp.production((pb) => pb.steel(1));
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Increase your energy production 1 step IF YOU HAVE NO ENERGY RESOURCES, or spend 1 energy to draw a building card.', (eb) => {
              eb.empty().arrow().production((pb) => pb.energy(1));
              eb.or().energy(1).startAction.cards(1).secondaryTag(Tags.BUILDING);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    if (player.energy === 0) {
      player.addProduction(Resources.ENERGY, 1);
      LogHelper.logGainProduction(player, Resources.ENERGY);
      return undefined;
    }
    player.energy -= 1;
    player.drawCard(1, {tag: Tags.BUILDING});
    return undefined;
  }
}
