import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
// import {AgricolaInc} from './AgricolaInc';
// import {Incite} from './Incite';
// import {Playwrights} from './Playwrights';
// import {ProjectWorkshop} from './ProjectWorkshop';
import {VenusFirst} from './VenusFirst';
import {AerospaceMission} from './AerospaceMission';
// import {Midas} from './Midas';
// import {CuriosityII} from './CuriosityII';
import {Quantum} from './Quantum';
import {WarpHub} from './WarpHub';
import {NewAmazonProject} from './NewAmazonProject';
import {FuelGreen} from './FuelGreen';
import {TritiumInvestments} from './TritiumInvestments';
import {UnitedNationsMissionOne} from './UnitedNationsMissionOne';
import {BigOxide} from './BigOxide';
import {SuperEffective} from './SuperEffective';
import {NonIpsePotestIuppiter} from './NonIpsePotestIuppiter';
import {OuterPlanetAlliance} from './OuterPlanetAlliance';
import {MarsAnalysts} from './MarsAnalysts';

export const COMMUNITY_CARD_MANIFEST = new CardManifest({
  module: GameModule.Community,
  projectCards: [],
  corporationCards: [
    // {cardName: CardName.AGRICOLA_INC, Factory: AgricolaInc},
    // {cardName: CardName.PROJECT_WORKSHOP, Factory: ProjectWorkshop},
    // {cardName: CardName.INCITE, Factory: Incite, compatibility: GameModule.Turmoil},
    // {cardName: CardName.PLAYWRIGHTS, Factory: Playwrights},
    // {cardName: CardName.CURIOSITY_II, Factory: CuriosityII},
    // {cardName: CardName.MIDAS, Factory: Midas},
    {cardName: CardName.QUANTUM, Factory: Quantum},
    {cardName: CardName.WARP_HUB, Factory: WarpHub},
    {cardName: CardName.NEW_AMAZON_PROJECT, Factory: NewAmazonProject},
    {cardName: CardName.FUEL_GREEN, Factory: FuelGreen},
    {cardName: CardName.TRITIUM_INVESTMENTS, Factory: TritiumInvestments},
    {cardName: CardName.UNITED_NATIONS_MISSION_ONE, Factory: UnitedNationsMissionOne},
    {cardName: CardName.BIG_OXIDE, Factory: BigOxide, compatibility: GameModule.Venus},
    {cardName: CardName.SUPER_EFFECTIVE, Factory: SuperEffective},
    {cardName: CardName.NON_IPSE_POTEST_IUPPITER, Factory: NonIpsePotestIuppiter},
    {cardName: CardName.OUTER_PLANET_ALLIANCE, Factory: OuterPlanetAlliance},
    {cardName: CardName.MARS_ANALYSTS, Factory: MarsAnalysts, compatibility: GameModule.Turmoil},
  ],
  preludeCards: [
    {
      cardName: CardName.VENUS_FIRST,
      Factory: VenusFirst,
      compatibility: GameModule.Venus,
    },
    {
      cardName: CardName.AEROSPACE_MISSION,
      Factory: AerospaceMission,
      compatibility: GameModule.Colonies,
    },
  ],
});
