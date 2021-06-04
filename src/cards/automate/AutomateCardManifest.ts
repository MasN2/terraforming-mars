import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {BusinessNetworkAutomate} from './BusinessNetworkAutomate';
import {InventorsGuildAutomate} from './InventorsGuildAutomate';

export const AUTOMATE_CARD_MANIFEST = new CardManifest({
  module: GameModule.Automate,

  projectCards: [
    {cardName: CardName.BUSINESS_NETWORK_AUTOMATE, Factory: BusinessNetworkAutomate},
    {cardName: CardName.INVENTORS_GUILD_AUTOMATE, Factory: InventorsGuildAutomate},
  ],

  cardsToRemove: [
    CardName.BUSINESS_NETWORK,
    CardName.INVENTORS_GUILD,
  ],
});
