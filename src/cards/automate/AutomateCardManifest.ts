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
    CardName.GHG_PRODUCING_BACTERIA,
    CardName.TARDIGRADES,
    CardName.FISH,
    CardName.SMALL_ANIMALS,
    CardName.BIRDS,
    CardName.NITRATE_REDUCING_BACTERIA,
    CardName.LIVESTOCK,
    CardName.RESTRICTED_AREA,
    CardName.AI_CENTRAL,
    CardName.PENGUINS,
    CardName.DEUTERIUM_EXPORT,
    CardName.EXTRACTOR_BALLOONS,
    CardName.LOCAL_SHADING,
    CardName.STRATOSPHERIC_BIRDS,
    CardName.SULPHUR_EATING_BACTERIA,
    CardName.PSYCHROPHILES,
    CardName.ATMO_COLLECTORS,
    CardName.JOVIAN_LANTERNS,
    CardName.RED_SPOT_OBSERVATORY,
    CardName.SUB_ZERO_SALT_FISH,
    CardName.ASTEROID_DEFLECTION_SYSTEM,
    CardName.SUB_CRUST_MEASUREMENTS,
    CardName.PROJECT_INSPECTION,
    CardName.VIRON,
  ],
});
