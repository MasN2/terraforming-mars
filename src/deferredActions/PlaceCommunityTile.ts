import {Player} from '../Player';
import {SelectSpace} from '../inputs/SelectSpace';
import {ISpace} from '../boards/ISpace';
import {DeferredAction, Priority} from './DeferredAction';

export class PlaceCommunityTile implements DeferredAction {
  public priority = Priority.DEFAULT;
  constructor(
        public player: Player,
        public title: string = 'Select space for community tile',
  ) {}

  public execute() {
    const availableSpaces = this.player.game.board.getNonReservedLandSpaces(this.player);
    if (availableSpaces.length === 0) {
      return undefined;
    }

    return new SelectSpace(
      this.title,
      availableSpaces,
      (space: ISpace) => {
        foundSpace.player = player;
        player.game.log('${0} placed a Community (player marker)', (b) => b.player(player));
        return undefined;
      },
    );
  }
}
