import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../CardName';
import {PlaceCityTile} from '../../deferredActions/PlaceCityTile';
import {PlaceGreeneryTile} from '../../deferredActions/PlaceGreeneryTile';
import {CardRenderer} from '../render/CardRenderer';

export class EarlySettlement extends PreludeCard {
  constructor() {
    super({
      name: CardName.EARLY_SETTLEMENT,
      tags: [Tags.PLANT, Tags.CITY],

      metadata: {
        cardNumber: 'P09',
        renderData: CardRenderer.builder((b) => {
          b.city().greenery();
        }),
        description: 'Place a city tile, then place a greenery tile.',
      },
    });
  }
  public play(player: Player) {
    player.game.defer(new PlaceCityTile(player));
    player.game.defer(new PlaceGreeneryTile(player));
    return undefined;
  }
}

