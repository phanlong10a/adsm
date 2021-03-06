import React, { Component, useRef } from "react";
import {
  Dialog,
  Button,
  Grid, Checkbox,
  IconButton,
  Icon,
  DialogActions
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import ConstPatient from "../Patient/Const";
import { getById as getPatientById } from "../Patient/PatientService";
import { searchByPage as getDrugs } from "../Drugs/DrugsService";
import { update, addNew, getById } from "./PatientIncidentService";
import moment from 'moment'


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}



function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return <div>
    <IconButton onClick={() => props.onSelect(item, 1)}>
      <Icon color="error">delete</Icon>
    </IconButton>
  </div>;
}
export default class AssetTransferPrint extends Component {
  state = {
    type: 2,
    rowsPerPage: 1,
    page: 0,
    totalElements: 0,
    departmentId: '',
    name: '',
    asset: {},
    isView: false
  };

  handleFormSubmit = () => {

    // install();
    let content = document.getElementById("divcontents");
    let pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();

    pri.document.write(content.innerHTML);

    pri.document.close();
    pri.focus();
    pri.print();
  };

  componentDidMount() {
    let { t, location } = this.props;
    console.log(this.props.id);
    if (location && location.state && location.state.readOnly) {
      this.setState({ readOnly: location.state.readOnly })
    }
    let { parentId, id } = this.props;


    if (id != null) {
      getById(id).then(({ data }) => {
        this.setState({ ...data }, () => {
          getPatientById(parentId).then(({ data }) => {
            this.setState({ patient: data })
            this.setState({ didMountComplete: true })
          })
        });
      })
    } else {
      getPatientById(parentId).then(({ data }) => {
        this.setState({ patient: data })
        this.setState({ didMountComplete: true })
      })
    }


    var searchObject = {};
    searchObject.pageIndex = 1;
    searchObject.pageSize = 10000;
    getDrugs(searchObject).then(({ data }) => {
      this.setState({ listDrugs: [...data.content] })
    })
    getLabTests(searchObject).then(({ data }) => {
      this.setState({ listLabTest: [...data.content] });
    })
  }


  render() {
    let { open, handleClose, handleOKEditClose, t, i18n, item } = this.props;
    let now = new Date();
    let {
      rowsPerPage,
      page,
      assetVouchers,
      name,
      displayName, patient,
    } = this.state;

    console.log(item)

    return (


      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth  >
        <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', print: { size: 'auto', margin: '0mm' } }}></iframe>

        <ValidatorForm className="validator-form-scroll-dialog" ref="form" onSubmit={this.handleFormSubmit} style={{ minHeight: 1682 }}>
          <DialogContent id='divcontents' >
            <Grid>

              <div>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n<!--\nspan.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_004{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_021{font-family:Arial,serif;font-size:11.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_021{font-family:Arial,serif;font-size:11.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_013{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_025{font-family:Arial,serif;font-size:10.1px;color:rgb(63,63,170);font-weight:bold;font-style:normal;text-decoration: underline}\ndiv.cls_025{font-family:Arial,serif;font-size:10.1px;color:rgb(63,63,170);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(63,63,170);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(63,63,170);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:8.6px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Arial,serif;font-size:8.6px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_015{font-family:Arial,serif;font-size:10.1px;color:rgb(255,255,255);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_015{font-family:Arial,serif;font-size:10.1px;color:rgb(255,255,255);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_017{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_017{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_018{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_018{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_026{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: underline}\ndiv.cls_026{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_022{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_022{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_023{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_023{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_024{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_024{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\n-->\n" }} />
                <div style={{ position: 'absolute', left: '50%', marginLeft: '-420px', top: '0px', width: '841px', height: '100vh', borderStyle: 'outset', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  </div>
                  <div style={{ position: 'absolute', left: '37.24px', top: '13.21px' }} className="cls_002"><span className="cls_002">C?? th??? s??? d???ng nhi???u M???U 2 n???u b???nh nh??n g???p nhi???u lo???i bi???n c??? kh??c nhau</span></div>
                  <div style={{ position: 'absolute', left: '732.21px', top: '13.21px' }} className="cls_002"><span className="cls_002">Version: 09.2020</span></div>
                  <div style={{ position: 'absolute', left: '183.41px', top: '40.48px' }} className="cls_004"><span className="cls_004">B??O C??O BI???N C??? B???T L???I TRONG ??I???U TR??? MDR-TB</span></div>
                  <div style={{ position: 'absolute', left: '49.68px', top: '41.79px' }} className="cls_021"><span className="cls_021">M???U 2</span></div>
                  <div style={{ position: 'absolute', left: '254.67px', top: '54.42px' }} className="cls_005"><span className="cls_005">??p d???ng trong ho???t ?????ng aDSM</span></div>
                  <div style={{ position: 'absolute', left: '638.64px', top: '62.07px' }} className="cls_012"><span className="cls_012">N??i b??o c??o:</span><span className="cls_013">?????????????????????????????????????????????</span></div>
                  <div style={{ position: 'absolute', left: '47.16px', top: '66.63px' }} className="cls_025"><span className="cls_025">C??c tr?????ng h???p C???N B??O C??O:</span></div>
                  <div style={{ position: 'absolute', left: '43.73px', top: '81.36px' }} className="cls_008"><span className="cls_008">??? B???nh nh??n g???p b???t k??? tri???u ch???ng l??m s??ng b???t th?????ng (thay ?????i so v???i ban ?????u) v??/ho???c gi?? tr??? x??t nghi???m n???m ngo??i gi???i h???n b??nh th?????ng</span></div>
                  <div style={{ position: 'absolute', left: '52.73px', top: '94.20px' }} className="cls_008"><span className="cls_008">thu???c M???T trong c??c bi???n c??? sau:</span><span className="cls_009"> (1) K??o d??i kho???ng QT; (2) ?????c t??nh tr??n th???n; (3) M???t th??nh l???c; (4) Thay ?????i th??? gi??c; (5) B???nh l?? th???n</span></div>
                  <div style={{ position: 'absolute', left: '52.73px', top: '106.03px' }} className="cls_009"><span className="cls_009">kinh ngo???i bi??n; (6) B???t th?????ng v??? huy???t h???c </span><span className="cls_010">(gi???m b???ch c???u, gi???m ti???u c???u, thi???u m??u, b???t s???n h???ng c???u, b???t th?????ng ????ng m??u v?? b???ch c???u ??i toan)</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '106.17px' }} className="cls_012"><span className="cls_012">M?? s??? b??o c??o </span><span className="cls_014">(do Trung t??m DI &amp; ADR Qu???c gia</span></div>
                  <div style={{ position: 'absolute', left: '43.74px', top: '119.56px' }} className="cls_011"><span className="cls_011">???</span><span className="cls_008"> HO???C b???t k??? bi???n c??? thu???c lo???i nghi??m tr???ng (SAE) l?? bi???n c??? g??y ra M???T trong c??c h???u qu??? sau: </span><span className="cls_009">(1) T??? vong; (2) ??e d???a t??nh m???ng;</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '122.08px' }} className="cls_014"><span className="cls_014">qu???n l??):</span></div>
                  <div style={{ position: 'absolute', left: '51.39px', top: '131.91px' }} className="cls_009"><span className="cls_009">(3) Nh???p vi???n ho???c k??o d??i th???i gian n???m vi???n; (4) T??n t???t v??nh vi???n/n???ng n??? ho???c (5) D??? t???t thai nhi;</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '137.97px' }} className="cls_013"><span className="cls_013">????????????????????????????????????????????????????????????..</span></div>
                  <div style={{ position: 'absolute', left: '43.74px', top: '144.86px' }} className="cls_011"><span className="cls_011">???</span><span className="cls_008"> HO???C b???t k??? bi???n c??? n??o d???n ?????n </span><span className="cls_009">Thay ?????i ph??c ????? ??i???u tr??? lao </span><span className="cls_010">(ng???ng thu???c, ?????i thu???c, gi???m li???u)</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '157.12px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>A. TH??NG TIN V??? B???NH NH??N</span></div>
                  <div style={{ position: 'absolute', left: '492.54px', top: '171.16px' }} className="cls_017"><span className="cls_017">Ng??y sinh:{`${item.patient.birthDate ? moment(item.patient.birthDate).format("DD/MM/YYYY") : ''}`}</span></div>
                  <div style={{ position: 'absolute', left: '638.64px', top: '171.16px' }} className="cls_017"><span className="cls_017">Gi???i t??nh:</span></div>
                  <div style={{ position: 'absolute', left: '726.42px', top: '171.16px' }} className="cls_017"><span className="cls_017">C??n n???ng: {item.patient.weight}</span></div>
                  <div style={{ position: 'absolute', left: '808.49px', top: '171.16px' }} className="cls_017"><span className="cls_017">kg</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '176.38px' }} className="cls_016"><span className="cls_016">H??? v?? t??n b???nh nh??n: {patient?.displayName}</span></div>
                  <div style={{ position: 'absolute', left: '258.65px', top: '176.38px' }} className="cls_017"><span className="cls_017">M?? s??? BN: {item.patient.patientCode ? item.patient.patientCode : '??????????????????'}.       S??? eTB:{item.patient.eTBCode ? item.patient.eTBCode : <span>.........</span>}</span></div>
                  <div style={{ position: 'absolute', left: '492.54px', top: '183.52px' }} className="cls_017"><span className="cls_017">Ho???c tu???i: </span></div>
                  <div style={{ position: 'absolute', left: '651.18px', top: '183.52px' }} className="cls_017"><span className="cls_017">{item.patient.gender === 'F' ? '' : 'Nam'}</span></div>
                  <div style={{ position: 'absolute', left: '692.70px', top: '183.52px' }} className="cls_017"><span className="cls_017">{item.patient.gender === 'F' ? 'N???' : ''}</span></div>
                  <div style={{ position: 'absolute', left: '726.42px', top: '183.52px' }} className="cls_017"><span className="cls_017">Chi???u cao:{item.patient.height}</span></div>
                  <div style={{ position: 'absolute', left: '805.98px', top: '183.52px' }} className="cls_017"><span className="cls_017">cm</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '194.32px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>B. TH??NG TIN V??? BI???N C??? B???T L???I</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '206.32px' }} className="cls_018"><span className="cls_018">M?? t??? ?????c ??i???m bi???n c???</span><span className="cls_019"> (bao g???m c??c x??t nghi???m c?? li??n quan, n???u c??)</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '246.32px' }} className="cls_017"><span className="cls_017">{item.description}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '212.30px' }} className="cls_020"><span className="cls_020">Ng??y xu???t hi???n bi???n c???</span><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '483.65px', top: '212.30px' }} className="cls_017"><span className="cls_017">{`${moment(item.appearDate).format("DD/MM/YYYY")}`}</span></div>
                  <div style={{ position: 'absolute', left: '578.70px', top: '212.30px' }} className="cls_020"><span className="cls_020">Ng??y h???i ph???c bi???n c??? (n???u c??)</span><span className="cls_017"> ???</span></div>
                  <div style={{ position: 'absolute', left: '733.72px', top: '212.30px' }} className="cls_017"><span className="cls_017">{item.recoveryDay ? moment(item.recoveryDay).format("DD/MM/YYYY") : ''}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '228.70px' }} className="cls_020"><span className="cls_020">M???C ????? NGHI??M TR???NG C???A BI???N C???</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '239.56px' }} className="cls_017"><span className="cls_017">{item.severityDead ? '???' : '???'} T??? vong</span></div>
                  <div style={{ position: 'absolute', left: '577.62px', top: '239.56px' }} className="cls_017"><span className="cls_017">{item.severityLifeThreatening ? '???' : '???'} ??e d???a t??nh m???ng</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '251.50px' }} className="cls_017"><span className="cls_017">{item.severityHospitalizationOrExtensionOfHospitalStay ? '???' : '???'} Nh???p vi???n/k??o d??i th???i gian n???m vi???n</span></div>
                  <div style={{ position: 'absolute', left: '577.62px', top: '251.50px' }} className="cls_017"><span className="cls_017">{item.severityPermanentOrSeverelyBurdensome ? '???' : '???'} T??n t???t v??nh vi???n/n???ng n???</span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '263.38px' }} className="cls_017"><span className="cls_017">{item.severityChangeTBTreatmentRegimen ? '???' : '???'} Thay ?????i ph??c ????? ??i???u tr??? lao</span></div>
                  <div style={{ position: 'absolute', left: '577.61px', top: '263.38px' }} className="cls_017"><span className="cls_017">{item.severityFetalMalformation ? '???' : '???'} D??? t???t thai nhi</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '276.94px' }} className="cls_017"><span className="cls_017">{item.severityOther ? '???' : '???'} Kh??c </span><span className="cls_019">(C??? th???:</span><span className="cls_017"> {item.severityInstrument ? item.severityInstrument : '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'})</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '292.30px' }} className="cls_020"><span className="cls_020">M???C ????? N???NG C???A BI???N C???</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv1' ? '???' : '???'} ????? 1</span></div>
                  <div style={{ position: 'absolute', left: '503.70px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv2' ? '???' : '???'} ????? 2</span></div>
                  <div style={{ position: 'absolute', left: '625.74px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv3' ? '???' : '???'} ????? 3</span></div>
                  <div style={{ position: 'absolute', left: '747.72px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv4' ? '???' : '???'} ????? 4</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '322.60px' }} className="cls_020"><span className="cls_020">C??CH X??? TR?? BI???N C???</span></div>
                  <div style={{ position: 'absolute', left: '364.15px', top: '334.54px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingStoppingDrug ? '???' : '???'} T???m ng???ng thu???c</span></div>
                  <div style={{ position: 'absolute', left: '508.26px', top: '334.54px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingStopDrug ? '???' : '???'} Ng???ng thu???c</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '349.42px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingReduceDose ? '???' : '???'} Gi???m li???u</span></div>
                  <div style={{ position: 'absolute', left: '507.71px', top: '349.42px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingOther ? '???' : '???'} ?????i thu???c lao</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '364.36px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingSymptomaticTreatment ? '???' : '???'} ??i???u tr??? tri???u ch???ng</span></div>
                  <div style={{ position: 'absolute', left: '508.73px', top: '364.36px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingOther ? '???' : '???'} X??? tr?? kh??c</span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '382.27px' }} className="cls_019"><span className="cls_019">Ghi chi ti???t c??ch x??? tr??: </span><span className="cls_017">{item.incidentHandlingDetails}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '400.12px' }} className="cls_017"><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '46.38px', top: '439.18px' }} className="cls_019"><span className="cls_019">T??n x??t nghi???m</span></div>
                  <div style={{ position: 'absolute', left: '125.10px', top: '439.18px' }} className="cls_019"><span className="cls_019">????n v???</span></div>
                  <div style={{ position: 'absolute', left: '166.98px', top: '439.18px' }} className="cls_019"><span className="cls_019">GT b??nh th?????ng</span></div>
                  <div style={{ position: 'absolute', left: '245.52px', top: '439.18px' }} className="cls_019"><span className="cls_019">K???t qu??? XN</span></div>
                  <div style={{ position: 'absolute', left: '311.40px', top: '439.18px' }} className="cls_019"><span className="cls_019">Ng??y XN</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '442.06px' }} className="cls_020"><span className="cls_020">K???T QU??? SAU X??? TR?? BI???N C???</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '460.00px' }} className="cls_017"><span className="cls_017">{item.result === 'result3' ? '???' : '???'} H???i ph???c kh??ng c?? di ch???ng</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '460.00px' }} className="cls_017"><span className="cls_017">{item.result === 'result4' ? '???' : '???'} H???i ph???c c?? di ch???ng, c??? th???:</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '471.94px' }} className="cls_017"><span className="cls_017">{item.recoveryHaveSequelaeDetails}</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '474.94px' }} className="cls_017"><span className="cls_017">{item.result === 'result2' ? '???' : '???'} ??ang h???i ph???c</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '486.82px' }} className="cls_017"><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '489.82px' }} className="cls_017"><span className="cls_017">{item.result === 'result1' ? '???' : '???'} Ch??a h???i ph???c</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '501.76px' }} className="cls_017"><span className="cls_017">{item.dayOfDeath ? '???' : '???'} T??? vong (Ng??y t??? vong:{item.dayOfDeath ? moment(item.dayOfDeath).format("DD/MM/YYYY") : ''})</span></div>
                  <div style={{ position: 'absolute', left: '364.11px', top: '504.76px' }} className="cls_017"><span className="cls_017">{item.result === 'UNKNOWN' ? '???' : '???'} Kh??ng r??</span></div>
                  <div style={{ position: 'relative', left: '46.38px', top: '455.18px' }}>
                    {item.patientIncidentLabtests?.map((item, index) => (
                      <div style={{display:'flex'}}>
                        <div style={{ width: '71px' }} className="cls_019"><span className="cls_019">{item.labTest.name}</span></div>
                        <div style={{ width: '43px' }} className="cls_019"><span className="cls_019">{item.labName}</span></div>
                        <div style={{ width: '76px' }} className="cls_019"><span className="cls_019">{item.normalResult}</span></div>
                        <div style={{ width: '66px' }} className="cls_019"><span className="cls_019">{item.labTest.result}</span></div>
                        <div style={{ width: '66px' }} className="cls_019"><span className="cls_019">{moment(item.labTest.testDate).format("DD/MM/YYYY")}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position: 'absolute', left: '50%', marginLeft: '-420px', top: '100vh', width: '841px', height: '595px', borderStyle: 'outset', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  </div>
                  <div style={{ position: 'absolute', left: '37.24px', top: '13.21px' }} className="cls_002"><span className="cls_002">C?? th??? s??? d???ng nhi???u M???U 2 n???u b???nh nh??n g???p nhi???u lo???i bi???n c??? kh??c nhau</span></div>
                  <div style={{ position: 'absolute', left: '732.21px', top: '13.21px' }} className="cls_002"><span className="cls_002">Version: 09.2020</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '49.12px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>C. TH??NG TIN V??? THU???C NGHI NG??? G??Y BI???N C???</span><span className="cls_018"> C???</span></div>
                  <div style={{ position: 'absolute', left: '608.70px', top: '49.72px' }} className="cls_016"><span className="cls_016">????nh d???u</span><span className="cls_020"> (X) = C??, (O) = Kh??ng</span></div>
                  <div style={{ position: 'absolute', left: '439.44px', top: '62.68px' }} className="cls_020"><span className="cls_020">Ng??y ??i???u tr???</span></div>
                  <div style={{ position: 'absolute', left: '555.24px', top: '64.18px' }} className="cls_020"><span className="cls_020">C??</span></div>
                  <div style={{ position: 'absolute', left: '605.68px', top: '64.18px' }} className="cls_020"><span className="cls_020">Ph???n ???ng c??</span></div>
                  <div style={{ position: 'absolute', left: '205.42px', top: '69.34px' }} className="cls_020"><span className="cls_020">D???ng b??o</span></div>
                  <div style={{ position: 'absolute', left: '683.42px', top: '69.35px' }} className="cls_020"><span className="cls_020">C?? t??i s???</span></div>
                  <div style={{ position: 'absolute', left: '746.41px', top: '69.35px' }} className="cls_020"><span className="cls_020">Ph???n ???ng c?? l???p</span></div>
                  <div style={{ position: 'absolute', left: '78.36px', top: '74.56px' }} className="cls_020"><span className="cls_020">Thu???c </span><span className="cls_026">nghi ng???</span><span className="cls_020"> (t??n g???c</span></div>
                  <div style={{ position: 'absolute', left: '260.68px', top: '74.56px' }} className="cls_020"><span className="cls_020">Li???u d??ng</span></div>
                  <div style={{ position: 'absolute', left: '320.43px', top: '74.56px' }} className="cls_020"><span className="cls_020">S??? l???n</span></div>
                  <div style={{ position: 'absolute', left: '368.25px', top: '74.56px' }} className="cls_020"><span className="cls_020">???????ng</span></div>
                  <div style={{ position: 'absolute', left: '421.26px', top: '73.06px' }} className="cls_020"><span className="cls_020">(ghi </span><span className="cls_016">ng??y/th??ng/n??m</span><span className="cls_020">)</span></div>
                  <div style={{ position: 'absolute', left: '535.20px', top: '74.56px' }} className="cls_020"><span className="cls_020">ng???ng/gi???m</span></div>
                  <div style={{ position: 'absolute', left: '607.18px', top: '74.56px' }} className="cls_020"><span className="cls_020">c???i thi???n khi</span></div>
                  <div style={{ position: 'absolute', left: '46.86px', top: '79.72px' }} className="cls_020"><span className="cls_020">TT</span></div>
                  <div style={{ position: 'absolute', left: '206.44px', top: '79.71px' }} className="cls_020"><span className="cls_020">ch???, h??m</span></div>
                  <div style={{ position: 'absolute', left: '678.44px', top: '79.72px' }} className="cls_020"><span className="cls_020">d???ng thu???c</span></div>
                  <div style={{ position: 'absolute', left: '743.10px', top: '79.72px' }} className="cls_020"><span className="cls_020">l???i khi t??i s??? d???ng</span></div>
                  <div style={{ position: 'absolute', left: '78.36px', top: '84.88px' }} className="cls_020"><span className="cls_020">v??/ho???c t??n th????ng m???i)</span></div>
                  <div style={{ position: 'absolute', left: '265.48px', top: '84.88px' }} className="cls_020"><span className="cls_020">(????n v???)</span></div>
                  <div style={{ position: 'absolute', left: '322.95px', top: '84.88px' }} className="cls_020"><span className="cls_020">d??ng</span></div>
                  <div style={{ position: 'absolute', left: '372.45px', top: '84.88px' }} className="cls_020"><span className="cls_020">d??ng</span></div>
                  <div style={{ position: 'absolute', left: '539.93px', top: '84.88px' }} className="cls_020"><span className="cls_020">li???u thu???c</span></div>
                  <div style={{ position: 'absolute', left: '607.17px', top: '84.88px' }} className="cls_020"><span className="cls_020">ng???ng/gi???m</span></div>
                  <div style={{ position: 'absolute', left: '212.74px', top: '90.04px' }} className="cls_020"><span className="cls_020">l?????ng</span></div>
                  <div style={{ position: 'absolute', left: '420.96px', top: '91.54px' }} className="cls_020"><span className="cls_020">B???t ?????u</span></div>
                  <div style={{ position: 'absolute', left: '477.96px', top: '91.54px' }} className="cls_020"><span className="cls_020">K???t th??c</span></div>
                  <div style={{ position: 'absolute', left: '680.71px', top: '90.05px' }} className="cls_020"><span className="cls_020">nghi ng????</span></div>
                  <div style={{ position: 'absolute', left: '745.98px', top: '90.05px' }} className="cls_020"><span className="cls_020">thu???c nghi ng????</span></div>
                  <div style={{ position: 'absolute', left: '539.03px', top: '95.20px' }} className="cls_020"><span className="cls_020">nghi ng????</span></div>
                  <div style={{ position: 'absolute', left: '609.20px', top: '95.20px' }} className="cls_020"><span className="cls_020">li???u thu???c?</span></div>
                  {item.listSuspectIncidentDrugDto?.map((item, index) => (
                    <>
                      <div style={{ position: 'absolute', left: '78.36px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.drug.name ? item.drug.name : ''}</span></div>
                      <div style={{ position: 'absolute', left: '212.74px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.content}</span></div>
                      <div style={{ position: 'absolute', left: '265.48px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.dose}</span></div>
                      <div style={{ position: 'absolute', left: '320.43px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.numberOfUse}</span></div>
                      <div style={{ position: 'absolute', left: '368.25px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.drugRoute}</span></div>
                      <div style={{ position: 'absolute', left: '420.96px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{`${moment(item.startDate).format("DD/MM/YYYY")}`}</span></div>
                      <div style={{ position: 'absolute', left: '477.96px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{`${moment(item.endDate).format("DD/MM/YYYY")}`}</span></div>
                      <div style={{ position: 'absolute', left: '539.93px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.hasReduce === true ? "C??" : "Kh??ng"}</span></div>
                      <div style={{ position: 'absolute', left: '607.17px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.hasImprove === true ? "C??" : "Kh??ng"}</span></div>
                      <div style={{ position: 'absolute', left: '680.71px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.repeatDrugReaction === true ? "C??" : "Kh??ng"}</span></div>
                      <div style={{ position: 'absolute', left: '745.98px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.reTakeSuspecDrug === true ? "C??" : "Kh??ng"}</span></div>
                    </>
                  ))}
                  {item.listCombinationDrugDto?.map((item, index) => (
                    <>
                      <div style={{ position: 'absolute', left: '47.04px', top: `${299.74 + ((index + 1) * 16)}px` }} className="cls_024"><span className="cls_024">{`${item.drug.name ? item.drug.name : ''}(${item.drug.drugContent ? item.drug.drugContent : ''})`}</span></div>
                      <div style={{ position: 'absolute', left: '147.84px', top: `${299.74 + ((index + 1) * 16)}px` }} className="cls_024"><span className="cls_024">{`${item.drugRoute ? item.drugRoute : ''}, ${item.dose ? item.dose : ''}`}</span></div>
                      <div style={{ position: 'absolute', left: '277.50px', top: `${299.74 + ((index + 1) * 16)}px` }} className="cls_024"><span className="cls_024">{`${item.startDate ? moment(item.startDate).format("DD/MM/YYYY") : ''}`}</span></div>
                      <div style={{ position: 'absolute', left: '370.68px', top: `${299.74 + ((index + 1) * 16)}px` }} className="cls_024"><span className="cls_024">{`${item.endDate ? moment(item.endDate).format("DD/MM/YYYY") : ''}`}</span></div>
                    </>
                  ))}

                  <div style={{ position: 'absolute', left: '44.64px', top: `${108.82}px` }} className="cls_017"><span className="cls_017">1</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '124.84px' }} className="cls_017"><span className="cls_017">2</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '140.86px' }} className="cls_017"><span className="cls_017">3</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '156.94px' }} className="cls_017"><span className="cls_017">4</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '172.96px' }} className="cls_017"><span className="cls_017">5</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '188.98px' }} className="cls_017"><span className="cls_017">6</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '205.00px' }} className="cls_017"><span className="cls_017">7</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '221.02px' }} className="cls_017"><span className="cls_017">8</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '237.04px' }} className="cls_017"><span className="cls_017">9</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '253.06px' }} className="cls_017"><span className="cls_017">10</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '281.68px' }} className="cls_018"><span className="cls_018">C??c thu???c d??ng ?????ng th???i</span><span className="cls_022"> (</span><span className="cls_023">Tr?????c khi x???y ra bi???n c???</span><span className="cls_022">)</span></div>
                  <div style={{ position: 'absolute', left: '280.74px', top: '293.86px' }} className="cls_024"><span className="cls_024">Ng??y ??i???u tr??? (ng??y/th??ng/n??m)</span></div>
                  <div style={{ position: 'absolute', left: '673.20px', top: '293.86px' }} className="cls_024"><span className="cls_024">Ng??y ??i???u tr??? (ng??y/th??ng/n??m)</span></div>
                  <div style={{ position: 'absolute', left: '47.04px', top: '299.74px' }} className="cls_024"><span className="cls_024">T??n thu???c (h??m l?????ng)</span></div>
                  <div style={{ position: 'absolute', left: '147.84px', top: '299.74px' }} className="cls_024"><span className="cls_024">Li???u d??ng, ???????ng d??ng</span></div>
                  <div style={{ position: 'absolute', left: '439.44px', top: '299.74px' }} className="cls_024"><span className="cls_024">T??n thu???c (h??m l?????ng)</span></div>
                  <div style={{ position: 'absolute', left: '539.34px', top: '299.74px' }} className="cls_024"><span className="cls_024">Li???u d??ng, ???????ng d??ng</span></div>
                  <div style={{ position: 'absolute', left: '277.50px', top: '304.60px' }} className="cls_024"><span className="cls_024">B???t ?????u</span></div>
                  <div style={{ position: 'absolute', left: '370.68px', top: '304.60px' }} className="cls_024"><span className="cls_024">K???t th??c</span></div>
                  <div style={{ position: 'absolute', left: '669.66px', top: '304.60px' }} className="cls_024"><span className="cls_024">B???t ?????u</span></div>
                  <div style={{ position: 'absolute', left: '763.80px', top: '304.60px' }} className="cls_024"><span className="cls_024">K???t th??c</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '404.32px' }} className="cls_018"><span className="cls_018">B??nh lu???n, ????nh gi?? c???a c??n b??? y t???</span><span className="cls_022"> (</span><span className="cls_023">Th??ng tin b??? sung c?? li??n quan ?????n bi???n c????</span><span className="cls_022"> </span><span className="cls_023">Anh/ch??? ngh?? ?????n bi???n c??? x???y ra do thu???c n??o? C?? s??? c?? ti???n h??nh gi???i m???n c???m ho???c s???</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '415.84px' }} className="cls_023"><span className="cls_023">d???ng l???i thu???c nghi ng??? v???i li???u th???p h??n kh??ng? Sau x??? tr?? bi???n c???, b???nh nh??n ???????c ??i???u tr??? b???ng ph??c ????? lao n??o? v.v..)</span><span className="cls_022">:</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '479.68px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>D. TH??NG TIN V??? NG?????I B??O C??O</span></div>
                  <div style={{ position: 'absolute', left: '58.56px', top: '497.74px' }} className="cls_017"><span className="cls_017">H??? v?? t??n:{item.reportBy}</span></div>
                  <div style={{ position: 'absolute', left: '436.56px', top: '497.74px' }} className="cls_017"><span className="cls_017">Ngh??? nghi???p/Ch???c v???:{item.reporterTitle}</span></div>
                  <div style={{ position: 'absolute', left: '58.54px', top: '519.22px' }} className="cls_017"><span className="cls_017">??i???n tho???i li??n l???c:{item.reporterPhoneNumber}</span></div>
                  <div style={{ position: 'absolute', left: '438.58px', top: '519.22px' }} className="cls_017"><span className="cls_017">Email:{item.reporterEmail}</span></div>
                  <div style={{ position: 'absolute', left: '59.34px', top: '547.96px' }} className="cls_017"><span className="cls_017">Ch??? k??</span></div>
                  <div style={{ position: 'absolute', left: '226.08px', top: '547.12px' }} className="cls_013"><span className="cls_013">20</span><span className="cls_022">.</span><span className="cls_017"> D???ng b??o c??o: {item.reportType}</span></div>
                  <div style={{ position: 'absolute', left: '391.67px', top: '548.14px' }} className="cls_017"><span className="cls_017">(l???n th???: ???.....)</span></div>
                  <div style={{ position: 'absolute', left: '502.24px', top: '548.14px' }} className="cls_017"><span className="cls_017">)</span></div>
                  <div style={{ position: 'absolute', left: '533.80px', top: '547.96px' }} className="cls_017"><span className="cls_017">Ng??y b??o c??o:{moment(item.reportDate).format("DD/MM/YYYY")}</span></div>
                </div>
              </div>





            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
              <Button
                variant="contained"
                color="secondary"
                className="mr-12"
                onClick={() => this.props.handleClose()}
              >
                {t('Hu???')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-16"
                type="submit"
              >
                {t('In')}
              </Button>
            </div>
          </DialogActions>

        </ValidatorForm>

      </Dialog>
    );
  }
}


// export default AssetTransferPrint;
