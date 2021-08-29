import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const url = "patient-incident/";

const PatientIncidentTable = EgretLoadable({
    loader: () =>
        import ("./PatientIncidentTable")
});
const ViewPatientIncidentTable = withTranslation()(PatientIncidentTable);

//const ViewComponentListTab = withTranslation()(List);
const Create = EgretLoadable({
    loader: () =>
        import ("./Create")
});
const ViewComponentCreate = withTranslation()(Create);
const PatientIncidentRoutes = [
    {
        path: ConstantList.ROOT_PATH + url + "list",
        exact: true,
        component: ViewPatientIncidentTable
    },
    // {
    //     path: ConstantList.ROOT_PATH + url + "list/(tabIndex)?/:tabIndex?/(pageIndex)?/:pageIndex?/(pageSize)?/:pageSize?",
    //     exact: true,
    //     component: ViewComponentPatientTable
    // },
    {
        path: ConstantList.ROOT_PATH + url + "create",
        exact: true,
        component: ViewComponentCreate
    },
    // {
    //     path: ConstantList.ROOT_PATH + url + "create/(idPatient)?/:idPatient?/(page)?/:page?/(pageSize)?/:pageSize?",
    //     exact: true,
    //     component: ViewComponentCreate
    // },
    {
        path: ConstantList.ROOT_PATH + url + "create/(idPatient)?/:idPatient?/(id)?/:id?",
        exact: true,
        component: ViewComponentCreate
    }
];


export default PatientIncidentRoutes;