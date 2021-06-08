import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {BusinessNetworkAutomate} from './BusinessNetworkAutomate';
import {InventorsGuildAutomate} from './InventorsGuildAutomate';
import {RegolithEatersAutomate} from './RegolithEatersAutomate';
import {GHGProducingBacteriaAutomate} from './GHGProducingBacteriaAutomate';
import {TardigradesAutomate} from './TardigradesAutomate';
import {FishAutomate} from './FishAutomate';
import {SmallAnimalsAutomate} from './SmallAnimalsAutomate';
import {BirdsAutomate} from './BirdsAutomate';
// import {NitriteReducingBacteriaAutomate} from './NitriteReducingBacteriaAutomate';
import {LivestockAutomate} from './LivestockAutomate';
import {RestrictedAreaAutomate} from './RestrictedAreaAutomate';
import {AICentralAutomate} from './AICentralAutomate';
import {PenguinsAutomate} from './PenguinsAutomate';

export const AUTOMATE_CARD_MANIFEST = new CardManifest({
  module: GameModule.Automate,

  projectCards: [
    {cardName: CardName.BUSINESS_NETWORK_AUTOMATE, Factory: BusinessNetworkAutomate},
    {cardName: CardName.INVENTORS_GUILD_AUTOMATE, Factory: InventorsGuildAutomate},
    {cardName: CardName.REGOLITH_EATERS_AUTOMATE, Factory: RegolithEatersAutomate},
    {cardName: CardName.GHG_PRODUCING_BACTERIA_AUTOMATE, Factory: GHGProducingBacteriaAutomate},
    {cardName: CardName.TARDIGRADES_AUTOMATE, Factory: TardigradesAutomate},
    {cardName: CardName.FISH_AUTOMATE, Factory: FishAutomate},
    {cardName: CardName.SMALL_ANIMALS_AUTOMATE, Factory: SmallAnimalsAutomate},
    {cardName: CardName.BIRDS_AUTOMATE, Factory: BirdsAutomate},
    // {cardName: CardName.NITRITE_REDUCING_BACTERIA_AUTOMATE, Factory: NitriteReducingBacteriaAutomate},
    {cardName: CardName.LIVESTOCK_AUTOMATE, Factory: LivestockAutomate},
    {cardName: CardName.RESTRICTED_AREA_AUTOMATE, Factory: RestrictedAreaAutomate},
    {cardName: CardName.AI_CENTRAL_AUTOMATE, Factory: AICentralAutomate},
    {cardName: CardName.PENGUINS_AUTOMATE, Factory: PenguinsAutomate},
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
    CardName.NITRITE_REDUCING_BACTERIA,
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
    CardName.SUBZERO_SALT_FISH,
    CardName.ASTEROID_DEFLECTION_SYSTEM,
    CardName.SUB_CRUST_MEASUREMENTS,
    CardName.PROJECT_INSPECTION,
    CardName.VIRON,
  ],
});
