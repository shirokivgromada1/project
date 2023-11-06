import { TinaField } from "@/tina/types";
import { announcementsSectionsComponentSchema } from "./../../../components/blocks/Announcements/Sections/Sections.schema";
import { infoPagesComponentSchema } from "./../../../components/blocks/Home/Info/Info.schema";
import { newsComponentSchema } from "./../../../components/blocks/Home/News/News.schema";
import { previewComponentSchema } from "./../../../components/blocks/Home/Preview/Preview.schema";
import { servicesComponentSchema } from "./../../../components/blocks/Home/Services/Service.schema";
import { sourcesComponentSchema } from "./../../../components/blocks/Home/Sources/Sources.schema";
import { newsSectionsComponentSchema } from "./../../../components/blocks/News/Sections/Section.schema";
import { controllersComponentSchema } from "./../../../components/util/Controllers/Controllers.schema";
import { vacanciesSectionsComponentSchema } from "./../../../components/blocks/Vacancies/Sections/Sections.schema";
import { newspapersCarouselComponentSchema } from "./../../../components/blocks/Newspapers/Carousel/Carousel.schema";
import { newspapersInfoComponentSchema } from "./../../../components/blocks/Newspapers/Info/Info.schema";
import { projectsRMSIComponentSchema } from "./../../../components/blocks/ProjectsRMSI/SingleProject/SingleProject.schema";
import { leadershipComponentSchema } from "./../../../components/blocks/Leadership/Leadership.schema";
import { educationInstitutionsComponentSchema } from "./../../../components/blocks/ProjectsRMSI/EducationInstitutions/EducationInstitutions.schema";
import { officiallyComponentSchema } from "./../../../components/blocks/Officially/Officially.schema";
import { headOrdersSchema } from "./../../../components/blocks/HeadOrders/HeadOrders.schema";
import { documentsComponentSchema } from "./../../../components/blocks/Documents/Documents.schema";
import { currentProgramsComponentSchema } from "./../../../components/blocks/CurrentPrograms/CurrentPrograms.schema";
import { powerPurificationComponentSchema } from "./../../../components/blocks/PowerPurification/PowerPurification.schema";
import { serviceQualitySurveySchema } from "./../../../components/blocks/ServiceQualitySurvey/ServiceQualitySurvey.schema";
import { genderEqualityComponentSchema } from "./../../../components/blocks/GenderEquality/GenderEquality.schema";
import { genderEqualityItemComponentSchema } from "./../../../components/blocks/GenderEqualityItem/GenderEqualityItem.schema";
import { monitoringEnsuringAccessSchema } from "./../../../components/blocks/MonitoringEnsuringAccess/MonitoringEnsuringAccess.schema";
import { socialProtectionSchema } from "./../../../components/blocks/SocialProtection/SocialProtection.schema";
import { departmentSocialProtectionSchema } from "./../../../components/blocks/DepartmentSocialProtection/DepartmentSocialProtection.schema";
import { primaryLegalAidSchema } from "./../../../components/blocks/PrimaryLegalAid/PrimaryLegalAid.schema";
import { departmentSocialProtectionSubSchema } from "./../../../components/blocks/DepartmentSocialProtectionSub/DepartmentSocialProtectionSub.schema";
import { socialServicesCenterSchema } from "./../../../components/blocks/SocialServicesCenter/SocialServicesCenter.schema";
import { clinicTitleSchema } from "./../../../components/blocks/ClinicTitle/ClinicTitle.schema";
import { clinicContactSchema } from "./../../../components/blocks/ClinicContact/ClinicContact.schema";
import { clinicServiceSchema } from "./../../../components/blocks/ClinicService/ClinicService.schema";
import { administrativeServicesEmployeesSchema } from "./../../../components/blocks/AdministrativeServicesEmployees/AdministrativeServicesEmployees.schema";
import { administrativeServicesFavorsSchema } from "./../../../components/blocks/AdministrativeServicesFavors/AdministrativeServicesFavors.schema";
import { administrativeServicesLinksSchema } from "./../../../components/blocks/AdministrativeServicesLinks/AdministrativeServicesLinks.schema";
import { silradaDepartmentDescComponentSchema } from "./../../../components/blocks/SilradaDepartmentDesc/SilradaDepartmentDesc.schema";
import { silradaDepartmentFunctionsComponentSchema } from "./../../../components/blocks/SilradaDepartmentFunctions/SilradaDepartmentFunctions.schema";
import { councilSecretaryDescComponentSchema } from "./../../../components/blocks/CouncilSecretaryDesc/CouncilSecretaryDesc.schema";
import { enterprisesDescComponentSchema } from "./../../../components/blocks/EnterprisesDesc/EnterprisesDesc.schema";
import { deputyCorpsTableComponentSchema } from "./../../../components/blocks/DeputyCorpsTable/DeputyCorpsTable.schema";
import { guardiansBoardDescComponentSchema } from "./../../../components/blocks/GuardiansBoardDesc/GuardiansBoardDesc.schema";
import { deputyHeadTabletComponentSchema } from "./../../../components/blocks/DeputyHeadTablet/DeputyHeadTablet.schema";
import { departmentsTabletComponentSchema } from "./../../../components/blocks/DepartmentsTablet/DepartmentsTablet.schema";
import { enterprisesTabletComponentSchema } from "./../../../components/blocks/EnterprisesTablet/EnterprisesTablet.schema";
import { guardiansBoardTasksComponentSchema } from "./../../../components/blocks/GuardiansBoardTasks/GuardiansBoardTasks.schema";
import { communityHeadDescComponentSchema } from "./../../../components/blocks/CommunityHeadDesc/CommunityHeadDesc.schema";
import { communityHeadCardsComponentSchema } from "./../../../components/blocks/CommunityHeadCards/CommunityHeadCards.schema";
import { communityHeadDeputiesComponentSchema } from "./../../../components/blocks/CommunityHeadDeputies/CommunityHeadDeputies.schema";
import { communityHeadDepartmentsComponentSchema } from "./../../../components/blocks/CommunityHeadDepartments/CommunityHeadDepartments.schema";
import { communityHeadEnterprisesComponentSchema } from "./../../../components/blocks/CommunityHeadEnterprises/CommunityHeadEnterprises.schema";
import { starostinskDistrictsComponentSchema } from "./../../../components/blocks/StarostinskDistricts/StarostinskDistricts.schema";
import { investmentComponentSchema } from "./../../../components/blocks/Investment/Investment.schema";
import { strategyDescComponentSchema } from "./../../../components/blocks/StrategyDesc/StrategyDesc.schema";
import { strategyLinkComponentSchema } from "./../../../components/blocks/StrategyLink/StrategyLink.schema";
import { aboutDescComponentSchema } from "./../../../components/blocks/AboutDesc/AboutDesc.schema";
import { aboutInstitutionsComponentSchema } from "./../../../components/blocks/AboutIntitutions/AboutInstitutions.schema";
import { aboutTownsComponentSchema } from "./../../../components/blocks/AboutTowns/AboutTowns.schema";

export const sectionsTemplate: TinaField = {
  type: "object",
  list: true,
  name: "components",
  label: "Sections",
  ui: {
    visualSelector: true,
  },
  templates: [
    previewComponentSchema,
    servicesComponentSchema,
    newsComponentSchema,
    infoPagesComponentSchema,
    sourcesComponentSchema,
    controllersComponentSchema,
    newsSectionsComponentSchema,
    announcementsSectionsComponentSchema,
    vacanciesSectionsComponentSchema,
    newspapersCarouselComponentSchema,
    newspapersInfoComponentSchema,
    projectsRMSIComponentSchema,
    leadershipComponentSchema,
    educationInstitutionsComponentSchema,
    officiallyComponentSchema,
    headOrdersSchema,
    documentsComponentSchema,
    currentProgramsComponentSchema,
    powerPurificationComponentSchema,
    serviceQualitySurveySchema,
    genderEqualityComponentSchema,
    genderEqualityItemComponentSchema,
    monitoringEnsuringAccessSchema,
    socialProtectionSchema,
    departmentSocialProtectionSchema,
    departmentSocialProtectionSubSchema,
    primaryLegalAidSchema,
    socialServicesCenterSchema,
    clinicTitleSchema,
    clinicContactSchema,
    clinicServiceSchema,
    administrativeServicesEmployeesSchema,
    administrativeServicesFavorsSchema,
    administrativeServicesLinksSchema,
    silradaDepartmentDescComponentSchema,
    silradaDepartmentFunctionsComponentSchema,
    councilSecretaryDescComponentSchema,
    enterprisesDescComponentSchema,
    deputyCorpsTableComponentSchema,
    guardiansBoardDescComponentSchema,
    deputyHeadTabletComponentSchema,
    departmentsTabletComponentSchema,
    enterprisesTabletComponentSchema,
    guardiansBoardTasksComponentSchema,
    communityHeadDescComponentSchema,
    communityHeadCardsComponentSchema,
    communityHeadDeputiesComponentSchema,
    communityHeadDepartmentsComponentSchema,
    communityHeadEnterprisesComponentSchema,
    starostinskDistrictsComponentSchema,
    investmentComponentSchema,
    strategyDescComponentSchema,
    strategyLinkComponentSchema,
    aboutDescComponentSchema,
    aboutInstitutionsComponentSchema,
    aboutTownsComponentSchema,
  ],
};
