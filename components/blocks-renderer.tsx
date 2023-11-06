import type {
  DepartmentPeople,
  DepartmentPeopleComponents,
  Page,
  PageComponents,
} from "../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Info, News, Preview, Services, Sources } from "./blocks/Home";
import { Controllers, Sections as NewsSections } from "./blocks/News";
import { Sections as AnnouncementsSections } from "./blocks/Announcements";
import { Sections as VacanciesSections } from "./blocks/Vacancies";
import { FC } from "react";
import { ParsedUrlQuery } from "querystring";
import { NewspapersCarousel, NewspapersInfo } from "./blocks/Newspapers";
import client from "@/tina/__generated__/client";
import { SingleProject } from "../components/blocks/ProjectsRMSI/SingleProject/SingleProject";
import { Leadership } from "../components/blocks/Leadership/Leadership";
import { EducationInstitutions } from "../components/blocks/ProjectsRMSI/EducationInstitutions/EducationInstitutions";
import { Officially } from "../components/blocks/Officially/Officially";
import { HeadOrders } from "../components/blocks/HeadOrders/HeadOrders";
import { Documents } from "../components/blocks/Documents/Documents";
import { CurrentPrograms } from "../components/blocks/CurrentPrograms/CurrentPrograms";
import { PowerPurification } from "../components/blocks/PowerPurification/PowerPurification";
import { ServiceQualitySurvey } from "../components/blocks/ServiceQualitySurvey/ServiceQualitySurvey";
import { GenderEquality } from "../components/blocks/GenderEquality/GenderEquality";
import { GenderEqualityItem } from "../components/blocks/GenderEqualityItem/GenderEqualityItem";
import { MonitoringEnsuringAccess } from "../components/blocks/MonitoringEnsuringAccess/MonitoringEnsuringAccess";
import { SocialProtection } from "../components/blocks/SocialProtection/SocialProtection";
import { DepartmentSocialProtection } from "../components/blocks/DepartmentSocialProtection/DepartmentSocialProtection";
import { PrimaryLegalAid } from "../components/blocks/PrimaryLegalAid/PrimaryLegalAid";
import { DepartmentSocialProtectionSub } from "../components/blocks/DepartmentSocialProtectionSub/DepartmentSocialProtectionSub";
import { SocialServicesCenter } from "../components/blocks/SocialServicesCenter/SocialServicesCenter";
import { ClinicTitle } from "../components/blocks/ClinicTitle/ClinicTitle";
import { ClinicContact } from "../components/blocks/ClinicContact/ClinicContact";
import { ClinicService } from "../components/blocks/ClinicService/ClinicService";
import { AdministrativeServicesEmployees } from "../components/blocks/AdministrativeServicesEmployees/AdministrativeServicesEmployees";
import { AdministrativeServicesFavors } from "../components/blocks/AdministrativeServicesFavors/AdministrativeServicesFavors";
import { AdministrativeServicesLinks } from "../components/blocks/AdministrativeServicesLinks/AdministrativeServicesLinks";
import { SilradaDepartmentDesc } from "../components/blocks/SilradaDepartmentDesc/SilradaDepartmentDesc";
import { SilradaDepartmentFunctions } from "../components/blocks/SilradaDepartmentFunctions/SilradaDepartmentFunctions";
import { CouncilSecretaryDesc } from "../components/blocks/CouncilSecretaryDesc/CouncilSecretaryDesc";
import { EnterprisesDesc } from "../components/blocks/EnterprisesDesc/EnterprisesDesc";
import { DeputyCorpsTable } from "../components/blocks/DeputyCorpsTable/DeputyCorpsTable";
import { GuardiansBoardDesc } from "../components/blocks/GuardiansBoardDesc/GuardiansBoardDesc";
import { DeputyHeadTablet } from "../components/blocks/DeputyHeadTablet/DeputyHeadTablet";
import { DepartmentsTablet } from "../components/blocks/DepartmentsTablet/DepartmentsTablet";
import { EnterprisesTablet } from "../components/blocks/EnterprisesTablet/EnterprisesTablet";
import { GuardiansBoardTasks } from "../components/blocks/GuardiansBoardTasks/GuardiansBoardTasks";
import { CommunityHeadDesc } from "../components/blocks/CommunityHeadDesc/CommunityHeadDesc";
import { CommunityHeadCards } from "../components/blocks/CommunityHeadCards/CommunityHeadCards";
import { CommunityHeadDeputies } from "../components/blocks/CommunityHeadDeputies/CommunityHeadDeputies";
import { CommunityHeadDepartments } from "../components/blocks/CommunityHeadDepartments/CommunityHeadDepartments";
import { CommunityHeadEnterprises } from "../components/blocks/CommunityHeadEnterprises/CommunityHeadEnterprises";
import { StarostinskDistricts } from "../components/blocks/StarostinskDistricts/StarostinskDistricts";
import { Investment } from "../components/blocks/Investment/Investment";
import { StrategyDesc } from "../components/blocks/StrategyDesc/StrategyDesc";
import { StrategyLink } from "../components/blocks/StrategyLink/StrategyLink";
import { AboutDesc } from "../components/blocks/AboutDesc/AboutDesc";
import { AboutInstitutions } from "../components/blocks/AboutIntitutions/AboutInstitutions";
import { AboutTowns } from "../components/blocks/AboutTowns/AboutTowns";
export const Components = (
  props: Omit<Page, "id"> | Omit<DepartmentPeople, "id">
) => {
  return (
    <>
      {props.components
        ? props.components.map(function (component, i) {
            if (component)
              return (
                <div
                  key={i}
                  data-tina-field={tinaField(component)}
                  style={{ overflow: "hidden" }}
                >
                  <Component {...component} />
                </div>
              );
          })
        : null}
    </>
  );
};

const Component = (component: PageComponents | DepartmentPeopleComponents) => {
  switch (component.__typename) {
    case "PageComponentsPreview" || "DepartmentPeopleComponentsPreview":
      return <Preview data={component} />;
    case "PageComponentsServices" || "DepartmentPeopleComponentsServices":
      return <Services data={component} />;
    case "PageComponentsNews" || "DepartmentPeopleComponentsServices":
      return <News data={component} />;
    case "PageComponentsInfoPages" || "DepartmentPeopleComponentsInfoPages":
      return <Info data={component} />;
    case "PageComponentsSources" || "DepartmentPeopleComponentsSources":
      return <Sources data={component} />;
    case "PageComponentsControllers" || "DepartmentPeopleComponentsControllers":
      return <Controllers data={component} />;
    case "PageComponentsNewsSections" ||
      "DepartmentPeopleComponentsNewsSections":
      return <NewsSections data={component} />;
    case "PageComponentsAnnouncementsSections" ||
      "DepartmentPeopleComponentsAnnouncementsSections":
      return <AnnouncementsSections data={component} />;
    case "PageComponentsVacanciesSections" ||
      "DepartmentPeopleComponentsVacanciesSections":
      return <VacanciesSections data={component} />;
    case "PageComponentsNewspapersCarousel" ||
      "DepartmentPeopleComponentsNewspapersCarousel":
      return <NewspapersCarousel data={component} />;
    case "PageComponentsNewspapersInfo" ||
      "DepartmentPeopleComponentsNewspapersInfo":
      return <NewspapersInfo data={component} />;
    case "PageComponentsRMSI":
      return <SingleProject data={component} />;
    case "PageComponentsLeadership":
      return <Leadership data={component} />;
    case "PageComponentsEducationInstitutions":
      return <EducationInstitutions data={component} />;
    case "PageComponentsOfficially":
      return <Officially data={component} />;
    case "PageComponentsHeadOrders":
      return <HeadOrders data={component} />;
    case "PageComponentsDocuments":
      return <Documents data={component} />;
    case "PageComponentsCurrentPrograms":
      return <CurrentPrograms data={component} />;
    case "PageComponentsPowerPurification":
      return <PowerPurification data={component} />;
    case "PageComponentsServiceQualitySurvey":
      return <ServiceQualitySurvey data={component} />;
    case "PageComponentsGenderEquality":
      return <GenderEquality data={component} />;
    case "PageComponentsGenderEqualityItem":
      return <GenderEqualityItem data={component} />;
    case "PageComponentsMonitoringEnsuringAccess":
      return <MonitoringEnsuringAccess data={component} />;
    case "PageComponentsSocialProtection":
      return <SocialProtection data={component} />;
    case "PageComponentsDepartmentSocialProtection":
      return <DepartmentSocialProtection data={component} />;
    case "PageComponentsDepartmentSocialProtectionSub":
      return <DepartmentSocialProtectionSub data={component} />;
    case "PageComponentsPrimaryLegalAid":
      return <PrimaryLegalAid data={component} />;
    case "PageComponentsSocialServicesCenter":
      return <SocialServicesCenter data={component} />;
    case "PageComponentsClinicTitle":
      return <ClinicTitle data={component} />;
    case "PageComponentsClinicContact":
      return <ClinicContact data={component} />;
    case "PageComponentsClinicService":
      return <ClinicService data={component} />;
    case "PageComponentsAdministrativeServicesEmployees":
      return <AdministrativeServicesEmployees data={component} />;
    case "PageComponentsAdministrativeServicesFavors":
      return <AdministrativeServicesFavors data={component} />;
    case "PageComponentsAdministrativeServicesLinks":
      return <AdministrativeServicesLinks data={component} />;
    case "PageComponentsSilradaDepartmentDesc":
      return <SilradaDepartmentDesc data={component} />;
    case "PageComponentsSilradaDepartmentFunctions":
      return <SilradaDepartmentFunctions data={component} />;
    case "PageComponentsCouncilSecretaryDesc":
      return <CouncilSecretaryDesc data={component} />;
    case "PageComponentsEnterprisesDesc":
      return <EnterprisesDesc data={component} />;
    case "PageComponentsDeputyCorpsTable":
      return <DeputyCorpsTable data={component} />;
    case "PageComponentsGuardiansBoardDesc":
      return <GuardiansBoardDesc data={component} />;
    case "PageComponentsDeputyHeadTablet":
      return <DeputyHeadTablet data={component} />;
    case "PageComponentsDepartmentsTablet":
      return <DepartmentsTablet data={component} />;
    case "PageComponentsEnterprisesTablet":
      return <EnterprisesTablet data={component} />;
    case "PageComponentsGuardiansBoardTasks":
      return <GuardiansBoardTasks data={component} />;
    case "PageComponentsCommunityHeadDesc":
      return <CommunityHeadDesc data={component} />;
    case "PageComponentsCommunityHeadCards":
      return <CommunityHeadCards data={component} />;
    case "PageComponentsCommunityHeadDeputies":
      return <CommunityHeadDeputies data={component} />;
    case "PageComponentsCommunityHeadDepartments":
      return <CommunityHeadDepartments data={component} />;
    case "PageComponentsCommunityHeadEnterprises":
      return <CommunityHeadEnterprises data={component} />;
    case "PageComponentsStarostinskDistricts":
      return <StarostinskDistricts data={component} />;
    case "PageComponentsInvestment":
      return <Investment data={component} />;
    case "PageComponentsStrategyDesc":
      return <StrategyDesc data={component} />;
    case "PageComponentsStrategyLink":
      return <StrategyLink data={component} />;
    case "PageComponentsAboutDesc":
      return <AboutDesc data={component} />;
    case "PageComponentsAboutInstitutions":
      return <AboutInstitutions data={component} />;
    case "PageComponentsAboutTowns":
      return <AboutTowns data={component} />;
    default:
      return null;
  }
};
