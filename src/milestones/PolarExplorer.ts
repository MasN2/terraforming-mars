import {IMilestone} from './IMilestone';
import {Player} from '../Player';

export class PolarExplorer implements IMilestone {
    public name: string = 'Polar Explorer';
    public description: string = 'Requires that you have 3 tiles on the two bottom rows'
    public getScore(player: Player): number {
      return player.game.board.spaces
        .filter((space) => space.player !== undefined &&
        space.player === player &&
        space.tile !== undefined &&
        space.y >= 6 && space.y <= 7).length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}

