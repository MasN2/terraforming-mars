import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Turmoil} from '../Turmoil';

export class RedInfluence implements IGlobalEvent {
    public name = GlobalEventName.RED_INFLUENCE;
    public description = 'Lose 1 M€ for each set of 2 TR over 10 (no limit). Increase M€ production 1 step per influence.';
    public revealedDelegate = PartyName.KELVINISTS;
    public currentDelegate = PartyName.REDS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = Math.floor((player.getTerraformRating() - 10)/2);
        if (amount > 0) {
          player.addResource(Resources.MEGACREDITS, amount * -1, {log: true, from: this.name});
        }
        player.addProduction(Resources.MEGACREDITS, turmoil.getPlayerInfluence(player), {log: true, from: this.name});
      });
    }
}
