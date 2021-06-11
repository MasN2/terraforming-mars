import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Resources} from '../Resources';

export class Specialist implements IMilestone {
    public name: string = 'Firestarter';
    public description: string = 'Requires that you have 7 heat production'
    public getScore(player: Player): number {
      return player.getProduction(Resources.HEAT);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) > 6;
    }
}
