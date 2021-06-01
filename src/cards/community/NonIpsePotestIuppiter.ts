import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from '../corporation/CorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';

export class NonIpsePotestIuppiter extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.NON_IPSE_POTEST_IUPITTER,
      tags: [Tags.JOVIAN, Tags.SCIENCE],
      startingMegaCredits: 48,
      initialActionText: 'Draw 2 Jovian cards',

      metadata: {
        cardNumber: '',
        description: 'You start with 48 M€. As your first action, draw 2 Jovian cards.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(48).nbsp.cards(2).secondaryTag(Tags.JOVIAN);
          b.corpBox('effect', (ce) => {
            ce.effect('Each time any Jovian tag is put into play, including this, draw a card with a MAX requirement.', (eb) => {
              eb.jovian().played.any.startEffect.cards(1).text('max req');
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(2, {tag: Tags.JOVIAN});
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    this._onCardPlayed(player, card);
  }

  public onCorpCardPlayed(player: Player, card: CorporationCard) {
    return this._onCardPlayed(player, card);
  }

  private _onCardPlayed(player: Player, card: IProjectCard | CorporationCard) {
    for (const tag of card.tags) {
      if (tag === Tags.JOVIAN) {
        const non_ipse = player.game.getCardPlayer(this.name);
        this.play(non_ipse);
      }
    }
  }

  public isMaxReq(card: IProjectCard) {
    const maxReq: Array<IProjectCard> = [
      CardName.COLONIZER_TRAINING_CAMP,
      CardName.SEARCH_FOR_LIFE,
      CardName.DOMED_CRATER,
      CardName.ARCTIC_ALGAE,
      CardName.CUPOLA_CITY,
      CardName.ARCHAEBACTERIA,
      CardName.NATURAL_PRESERVE,
      CardName.ELECTRO_CATAPULT,
      CardName.DUST_SEALS,
      CardName.EXTREME_COLD_FUNGUS,
      CardName.DESIGNED_MICROORGANISMS,
      CardName.ROTATOR_IMPACTS,
      CardName.SPIN_INDUCING_ASTEROID,
      CardName.MARTIAN_SURVEY,
      CardName.PSYCHROPHILES,
      CardName.PIONEER_SETTLEMENT,];
    return maxReq.includes(card.name);
  }

  public play(player: Player) {
    Array.prototype.push.apply(player.cardsInHand, player.game.dealer.drawProjectCardsByCondition(player.game, 1, this.isMaxReq));
    return undefined;
  }
}
