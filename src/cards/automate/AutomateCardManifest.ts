import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {BusinessNetworkAutomate} from './BusinessNetworkAutomate';
import {InventorsGuildAutomate} from './InventorsGuildAutomate';
import {RegolithEatersAutomate} from './RegolithEatersAutomate';

export const AUTOMATE_CARD_MANIFEST = new CardManifest({
  module: GameModule.Automate,

  projectCards: [
    {cardName: CardName.BUSINESS_NETWORK_AUTOMATE, Factory: BusinessNetworkAutomate},
    {cardName: CardName.INVENTORS_GUILD_AUTOMATE, Factory: InventorsGuildAutomate},
    {cardName: CardName.REGOLITH_EATERS_AUTOMATE, Factory: RegolithEatersAutomate},
  ],

  cardsToRemove: [
    CardName.BUSINESS_NETWORK,
    CardName.INVENTORS_GUILD,
    CardName.REGOLITH_EATERS_AUTOMATE,
  ],
});
