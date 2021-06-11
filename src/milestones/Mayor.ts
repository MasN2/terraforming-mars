import {IMilestone} from './IMilestone';
import {Player} from '../Player';

export class Mayor implements IMilestone {
    public name: string = 'Grounded';
    public description: string = 'Having at least 4 total owned city tiles and points from city tiles'
    public getScore(player: Player): number {
      return player.getVictoryPoints().city + player.getCitiesCount();
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 4;
    }
}
