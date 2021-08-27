import {SpaceBonus} from '../SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {Player} from '../Player';
import {ISpace} from './ISpace';
import {MiniBoardBuilder} from './MiniBoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../Random';

export class MiniBoard extends Board {
  public static newInstance(shuffle: boolean, rng: Random, includeVenus: boolean): MiniBoard {
    const builder = new MiniBoardBuilder(includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const TWO_PLANTS = [PLANT, PLANT];

    // y=0
    builder.land(STEEL, STEEL).ocean(STEEL, STEEL).ocean(DRAW_CARD).ocean().ocean(DRAW_CARD, DRAW_CARD);
    // y=1
    builder.land(DRAW_CARD).land(STEEL).land().land().land().land(STEEL);
    // y=2
    builder.land(PLANT, TITANIUM).land(PLANT).land(PLANT).land(PLANT).land(...TWO_PLANTS).land(PLANT).ocean(...TWO_PLANTS);
    // y=3
    builder.land(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS).ocean(...TWO_PLANTS)
      .ocean(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS);
    // y=4
    builder.land(PLANT).land(...TWO_PLANTS).land(PLANT).land(PLANT).ocean(PLANT).ocean(PLANT).ocean(PLANT);
    // y=5
    builder.land().land().land().land().land().land(PLANT);
    // y=6
    builder.land(STEEL, STEEL).land().land(DRAW_CARD).land(DRAW_CARD).land(TITANIUM);
    // y=7
    builder.land(STEEL).land(STEEL, STEEL).land().ocean(TITANIUM, TITANIUM);

    if (shuffle) {
      builder.shuffle(rng, SpaceName.NOCTIS_CITY, SpaceName.THARSIS_THOLUS, SpaceName.ASCRAEUS_MONS, SpaceName.ARSIA_MONS, SpaceName.PAVONIS_MONS);
    }
    const spaces = builder.build();
    return new MiniBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): MiniBoard {
    return new MiniBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public getNonReservedLandSpaces(): Array<ISpace> {
    return super.getNonReservedLandSpaces().filter((space) => space.id !== SpaceName.NOCTIS_CITY);
  }

  public getAvailableSpacesOnLand(player: Player): Array<ISpace> {
    return super.getAvailableSpacesOnLand(player).filter((space) => space.id !== SpaceName.NOCTIS_CITY);
  }

  public canPlaceTile(space: ISpace): boolean {
    return super.canPlaceTile(space) && space.id !== SpaceName.NOCTIS_CITY;
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [
      SpaceName.ASCRAEUS_MONS,
      SpaceName.ARSIA_MONS,
      SpaceName.PAVONIS_MONS,
      SpaceName.THARSIS_THOLUS,
    ];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [SpaceName.NOCTIS_CITY];
  }
}
