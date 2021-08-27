import {SpaceBonus} from '../SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {MiniBoardBuilder} from './MiniBoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {Player} from '../Player';
import {Random} from '../Random';

export class MiniElysiumBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean): ElysiumBoard {
    const builder = new BoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;

    // y=0
    builder.ocean().ocean(TITANIUM).ocean(DRAW_CARD).ocean(STEEL).land(DRAW_CARD);
    // y=1
    builder.land(TITANIUM).land().land().ocean().ocean().land(STEEL, STEEL);
    // y=2
    builder.land(TITANIUM, TITANIUM).land().land(DRAW_CARD).land().ocean(PLANT).ocean().land(DRAW_CARD, DRAW_CARD, DRAW_CARD);
    // y=3
    builder.land(PLANT).land(PLANT).land(PLANT).ocean(PLANT, PLANT).land(PLANT).ocean(PLANT).ocean(PLANT).land(PLANT, STEEL);
    // y=4
    builder.land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT);
    // y=5
    builder.land(STEEL, TITANIUM).land(PLANT, STEEL).land(PLANT).land(PLANT).land(PLANT).land(PLANT, TITANIUM);
    // y=6
    builder.land(STEEL, STEEL).land().land().land(STEEL).land(STEEL, STEEL);
    // y=7
    builder.land(STEEL).land(DRAW_CARD).land(DRAW_CARD).land(STEEL, STEEL);

    if (shuffle) {
      builder.shuffle(rng, SpaceName.HECATES_THOLUS, SpaceName.ELYSIUM_MONS, SpaceName.ARSIA_MONS_ELYSIUM, SpaceName.OLYMPUS_MONS);
    }
    const spaces = builder.build();
    return new MiniElysiumBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): ElysiumBoard {
    return new MiniElysiumBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [
      SpaceName.ARSIA_MONS_ELYSIUM,
      SpaceName.ELYSIUM_MONS,
      SpaceName.HECATES_THOLUS,
      SpaceName.OLYMPUS_MONS,
    ];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
