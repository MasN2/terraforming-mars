import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class NitrogenDelivery extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT,

      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.tr(3).plants(4);
        }),
        description: 'Increase your TR 3 steps. Gain 4 plants.',
      },
    });
  }
  public play(player: Player) {
    player.increaseTerraformRatingSteps(3);
    player.plants += 4;
    return undefined;
  }
}
