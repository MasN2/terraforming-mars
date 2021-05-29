import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../CardName';
import {BuildColony} from '../../deferredActions/BuildColony';
import {CardRenderer} from '../render/CardRenderer';

export class AerospaceMission extends PreludeCard {
  constructor() {
    super({
      name: CardName.AEROSPACE_MISSION,
      tags: [Tags.SPACE, Tags.JOVIAN],

      metadata: {
        cardNumber: 'Y01',
        renderData: CardRenderer.builder((b) => {
          b.colonies(1).br;
        }),
        description: 'Place a colony.',
      },
    });
  }

  public play(player: Player) {
    player.game.defer(new BuildColony(player, false, 'Select where to build the colony'));
    return undefined;
  }
}
