import React from 'react';
import { toast } from 'react-toastify';
import ConstantList from "../../appConfig";
import 'react-toastify/dist/ReactToastify.css';
import PatientIncidentForm from './PatientIncidentForm';
import 'styles/globitsStyles.css';
// import { addNew, update, searchByPageDrug,getById } from "./PatientService";
// import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import Const from "./Const";
import ConstPatient from "../Patient/Const";
import { getById as getPatientById } from "../Patient/PatientService";
import { searchByPage as getDrugs } from "../Drugs/DrugsService";
import { update, addNew, getById } from "./PatientIncidentService";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3
    //etc you get the idea
});

class Create extends React.Component {
    state = {
        history: null,
        didMountComplete: false,
        readOnly: false
    }
    componentDidMount() {
        let { t, location } = this.props;
        console.log(this.props);
        if (location && location.state && location.state.readOnly) {
            this.setState({readOnly: location.state.readOnly})
        }
        let {idPatient, id} = this.props.match.params;

        if (idPatient != null) {
            if(id != null){
                getById(id).then(({ data }) => {
                    this.setState({ ...data }, ()=>{
                        getPatientById(idPatient).then(({ data }) => {
                            this.setState({ patient: data })
                            this.setState({ didMountComplete: true })
                        })
                    });
                })
            }else{
                getPatientById(idPatient).then(({ data }) => {
                    this.setState({ patient: data })
                    this.setState({ didMountComplete: true })
                })
            }
        } else {
            this.setState({ didMountComplete: true })
        }

        var searchObject = {};
        searchObject.pageIndex = 1;
        searchObject.pageSize = 10000;
        getDrugs(searchObject).then(({data}) => {
            this.setState({listDrugs: [...data.content]})
        })
        getLabTests(searchObject).then(({ data }) => {
            this.setState({ listLabTest: [...data.content] });
        })
    }
    
    handleClose = (history, pageIndex, pageSize) => {
        let { idPatient } = this.props.match.params;
        history.goBack();
    }

    handleFormSubmit = (values) => {
        let { t, history } = this.props;
        let {
            pageIndex,
            pageSize,
        } = this.state;
        let obj = {};
        let id = this.props.match.params.id;
        let idPatient = this.props.match.params.idPatient;
        if (id) {
            obj.id = id
        }

        console.log(values);
        obj.patient =this.state.patient;
        obj.doctorNote = values.doctorNote;
        obj.reportBy = values.reportBy;
        obj.reportDate = values.reportDate;
        obj.reporterPhoneNumber = values.reporterPhoneNumber;
        obj.reporterEmail = values.reporterEmail;
        obj.reporterTitle = values.reporterTitle;
        obj.reportType = values.reportType;
        obj.reportSeq = values.reportSeq;
        obj.listSuspectIncidentDrugDto = values.listSuspectIncidentDrugDto;
        obj.listCombinationDrugDto = values.listCombinationDrugDto;
        obj.description = values.description;
        obj.appearDate = values.appearDate;
        obj.recoveryDay = values.recoveryDay;
        obj.severityDead = values.severityDead;
        obj.severityLifeThreatening = values.severityLifeThreatening;
        obj.severityHospitalizationOrExtensionOfHospitalStay = values.severityHospitalizationOrExtensionOfHospitalStay;
        obj.severityPermanentOrSeverelyBurdensome = values.severityPermanentOrSeverelyBurdensome;
        obj.severityChangeTBTreatmentRegimen = values.severityChangeTBTreatmentRegimen;
        obj.severityFetalMalformation = values.severityFetalMalformation;
        obj.severityOther = values.severityOther;
        obj.severityInstrument = values.severityInstrument;
        obj.incidentHandlingStoppingDrug = values.incidentHandlingStoppingDrug;
        obj.incidentHandlingStopDrug = values.incidentHandlingStopDrug
        obj.incidentHandlingReduceDose = values.incidentHandlingReduceDose;
        obj.incidentHandlingChangeTBMedicine = values.incidentHandlingChangeTBMedicine;
        obj.incidentHandlingSymptomaticTreatment = values.incidentHandlingSymptomaticTreatment;
        obj.incidentHandlingOther = values.incidentHandlingOther;
        obj.incidentHandlingDetails = values.incidentHandlingDetails;
        obj.result = values.result;
        obj.recoveryHaveSequelaeDetails = values.recoveryHaveSequelaeDetails;
        obj.dayOfDeath = values.dod;
        obj.seriousLevel = values.seriousLevel;
        obj.stillInExistence = values.stillInExistence;

        obj.patientIncidentLabtests = values.patientIncidentLabtests;
        if (values.patientIncidentLabtests && values.patientIncidentLabtests.length > 0) {
            let list = values.patientIncidentLabtests.map((element, index) => {
                let p = element;
                p.orderNumber = index;
                return p;
            })
            obj.patientIncidentLabtests = list;
        }

        if (id) {
            update(obj).then(() => {
                toast.success("Cập nhật");
                history.push(
                    // ConstantList.ROOT_PATH + ConstPatient.url + "create/" + idPatient
                    ConstantList.ROOT_PATH + ConstPatient.urlPI + "list"
                    // ConstantList.ROOT_PATH + "patient/create/" + id
                );
            })
        } else {
            addNew(obj).then(() => {
                toast.success("Thêm mới");
                history.push(
                    ConstantList.ROOT_PATH + ConstPatient.urlPI + "list" 
                );
                
            })
        }
    };
    render() {
        console.log(this.state);
        let { t } = this.props;
        let {
            patient,
            displayName,
            patientCode,
            eTBCode,
            birthDate,
            gender,
            height,
			listSuspectIncidentDrugDto,
			description,
            appearDate, recoveryDay, severityDead, severityLifeThreatening,
            severityHospitalizationOrExtensionOfHospitalStay, severityPermanentOrSeverelyBurdensome,
            severityChangeTBTreatmentRegimen, severityFetalMalformation,
            severityOther, severityInstrument, incidentHandlingStoppingDrug,
            incidentHandlingStopDrug, incidentHandlingReduceDose,
            incidentHandlingChangeTBMedicine, incidentHandlingSymptomaticTreatment,
            incidentHandlingOther, incidentHandlingDetails, result,
            recoveryHaveSequelaeDetails, dayOfDeath, seriousLevel,
            patientIncidentLabtests,
            listCombinationDrugDto,
            doctorNote,
            reportBy,
            reporterPhoneNumber,
            reportDate,
            reporterEmail,
            reportType,
            reportSeq,
            reporterTitle,
            stillInExistence,
        } = this.state;

        return (
            <div className="">
                {this.state.didMountComplete && <PatientIncidentForm
                    initialValues={
                        {
                            patient: patient ? patient : {},
                            displayName: displayName ? displayName : null,
                            patientCode: patientCode ? patientCode : null,
                            eTBCode: eTBCode ? eTBCode : null,
                            birthDate: birthDate ? birthDate : null,
                            gender: gender ? gender : null,
                            height: height ? height : null,
                            healthOrg: patient.healthOrg ? patient.healthOrg : null,
							listSuspectIncidentDrugDto: listSuspectIncidentDrugDto ? listSuspectIncidentDrugDto : [],
							description: description ? description : null,
                            appearDate: appearDate ? appearDate:null,
                            recoveryDay: recoveryDay? recoveryDay : null,
                            severityDead: severityDead? severityDead: null,
                            severityLifeThreatening: severityLifeThreatening ? severityLifeThreatening: null,
                            severityHospitalizationOrExtensionOfHospitalStay: severityHospitalizationOrExtensionOfHospitalStay ? severityHospitalizationOrExtensionOfHospitalStay : null,
                            severityPermanentOrSeverelyBurdensome: severityPermanentOrSeverelyBurdensome ? severityPermanentOrSeverelyBurdensome : null,
                            severityChangeTBTreatmentRegimen: severityChangeTBTreatmentRegimen ? severityChangeTBTreatmentRegimen : null,
                            severityFetalMalformation: severityFetalMalformation? severityFetalMalformation : null,
                            severityOther: severityOther ? severityOther : null,
                            severityInstrument: severityInstrument? severityInstrument: null,
                            seriousLevel: seriousLevel? seriousLevel: null,
                            incidentHandlingStoppingDrug: incidentHandlingStoppingDrug ? incidentHandlingStoppingDrug: null,
                            incidentHandlingStopDrug: incidentHandlingStopDrug ? incidentHandlingStopDrug: null,
                            incidentHandlingReduceDose: incidentHandlingReduceDose? incidentHandlingReduceDose: null,
                            incidentHandlingChangeTBMedicine: incidentHandlingChangeTBMedicine? incidentHandlingChangeTBMedicine: null,
                            incidentHandlingSymptomaticTreatment: incidentHandlingSymptomaticTreatment? incidentHandlingSymptomaticTreatment: null,
                            incidentHandlingOther: incidentHandlingOther? incidentHandlingOther: null,
                            incidentHandlingDetails: incidentHandlingDetails? incidentHandlingDetails: null,
                            result: result? result: null,
                            recoveryHaveSequelaeDetails: recoveryHaveSequelaeDetails? recoveryHaveSequelaeDetails: null,
                            dayOfDeath: dayOfDeath? dayOfDeath: null,
                            dod: dayOfDeath ? dayOfDeath : null,
                            patientIncidentLabtests: patientIncidentLabtests ? patientIncidentLabtests : [],
                            listCombinationDrugDto: listCombinationDrugDto ? listCombinationDrugDto : [],
                            doctorNote: doctorNote ? doctorNote : null,
                            reportBy: reportBy ? reportBy : null,
                            reporterPhoneNumber: reporterPhoneNumber ? reporterPhoneNumber : null,
                            reportDate: reportDate ? reportDate : null,
                            reporterEmail: reporterEmail ? reporterEmail : null,
                            reportType: reportType ? reportType : null,
                            reportSeq: reportSeq ? reportSeq : null,
                            reporterTitle: reporterTitle ? reporterTitle : null,
                            stillInExistence: stillInExistence ? stillInExistence : null
                        }
                    }
                    handleClose={this.handleClose}
                    handleSubmit={this.handleFormSubmit}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    history={this.props.history}
                    id={this.props.match.params.id}
                    listDrugs={this.state.listDrugs}
                    listLabTest={this.state.listLabTest}
                    patient={this.state.patient}
                    readOnly={this.state.readOnly}
                />}
            </div>

        );
    }

}

export default Create;