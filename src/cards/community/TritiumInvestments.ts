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

export class TritiumInvestments extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.TRITIUM_INVESTMENTS,
      tags: [Tags.EARTH, Tags.EARTH],
      startingMegaCredits: 31,
      resourceType: ResourceType.CAMP,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: '',
        description: 'You start with 31 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(31);
          b.corpBox('action', (ce) => {
            ce.action('Increase your MC production by 1 per camp here, THEN add a camp here.', (eb) => {
              eb.empty().startAction.production((pb) => pb.plants(1).slash().camps()).camps();
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addProduction(Resources.MEGACREDITS, this.resourceCount, {log: true})
    player.addResourceTo(this);
    return undefined;
  }
}
