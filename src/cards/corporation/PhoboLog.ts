import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './CorporationCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class PhoboLog extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.PHOBOLOG,
      tags: [Tags.SPACE, Tags.SPACE],
	  initialActionText: 'Draw 2 space cards',
      startingMegaCredits: 30,

      metadata: {
        cardNumber: 'R09',
        description: 'You start with 8 titanium and 30 M€. As your first action, draw 2 space cards.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(30).nbsp.titanium(8).digit.cards(2).secondaryTag(Tags.SPACE);
          b.corpBox('effect', (ce) => {
            ce.effect('Your titanium resources are each worth 1 M€ extra.', (eb) => {
              eb.titanium(1).startEffect.plus(Size.SMALL).megacredits(1);
            });
          });
        }),
      },
    });
  }
  public initialAction(player: Player) {
    player.drawCard(2, {tag: Tags.SPACE});
    return undefined;
  }
  public play(player: Player) {
    player.titanium = 8;
    player.increaseTitaniumValue();
    return undefined;
  }
}
