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
                  <div style={{ position: 'absolute', left: '37.24px', top: '13.21px' }} className="cls_002"><span className="cls_002">Có thể sử dụng nhiều MẪU 2 nếu bệnh nhân gặp nhiều loại biến cố khác nhau</span></div>
                  <div style={{ position: 'absolute', left: '732.21px', top: '13.21px' }} className="cls_002"><span className="cls_002">Version: 09.2020</span></div>
                  <div style={{ position: 'absolute', left: '183.41px', top: '40.48px' }} className="cls_004"><span className="cls_004">BÁO CÁO BIẾN CỐ BẤT LỢI TRONG ĐIỀU TRỊ MDR-TB</span></div>
                  <div style={{ position: 'absolute', left: '49.68px', top: '41.79px' }} className="cls_021"><span className="cls_021">MẪU 2</span></div>
                  <div style={{ position: 'absolute', left: '254.67px', top: '54.42px' }} className="cls_005"><span className="cls_005">Áp dụng trong hoạt động aDSM</span></div>
                  <div style={{ position: 'absolute', left: '638.64px', top: '62.07px' }} className="cls_012"><span className="cls_012">Nơi báo cáo:</span><span className="cls_013">………………………………………</span></div>
                  <div style={{ position: 'absolute', left: '47.16px', top: '66.63px' }} className="cls_025"><span className="cls_025">Các trường hợp CẦN BÁO CÁO:</span></div>
                  <div style={{ position: 'absolute', left: '43.73px', top: '81.36px' }} className="cls_008"><span className="cls_008">• Bệnh nhân gặp bất kỳ triệu chứng lâm sàng bất thường (thay đổi so với ban đầu) và/hoặc giá trị xét nghiệm nằm ngoài giới hạn bình thường</span></div>
                  <div style={{ position: 'absolute', left: '52.73px', top: '94.20px' }} className="cls_008"><span className="cls_008">thuộc MỘT trong các biến cố sau:</span><span className="cls_009"> (1) Kéo dài khoảng QT; (2) Độc tính trên thận; (3) Mất thính lực; (4) Thay đổi thị giác; (5) Bệnh lý thần</span></div>
                  <div style={{ position: 'absolute', left: '52.73px', top: '106.03px' }} className="cls_009"><span className="cls_009">kinh ngoại biên; (6) Bất thường về huyết học </span><span className="cls_010">(giảm bạch cầu, giảm tiểu cầu, thiếu máu, bất sản hồng cầu, bất thường đông máu và bạch cầu ái toan)</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '106.17px' }} className="cls_012"><span className="cls_012">Mã số báo cáo </span><span className="cls_014">(do Trung tâm DI &amp; ADR Quốc gia</span></div>
                  <div style={{ position: 'absolute', left: '43.74px', top: '119.56px' }} className="cls_011"><span className="cls_011">•</span><span className="cls_008"> HOẶC bất kỳ biến cố thuộc loại nghiêm trọng (SAE) là biến cố gây ra MỘT trong các hậu quả sau: </span><span className="cls_009">(1) Tử vong; (2) Đe dọa tính mạng;</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '122.08px' }} className="cls_014"><span className="cls_014">quản lý):</span></div>
                  <div style={{ position: 'absolute', left: '51.39px', top: '131.91px' }} className="cls_009"><span className="cls_009">(3) Nhập viện hoặc kéo dài thời gian nằm viện; (4) Tàn tật vĩnh viễn/nặng nề hoặc (5) Dị tật thai nhi;</span></div>
                  <div style={{ position: 'absolute', left: '638.94px', top: '137.97px' }} className="cls_013"><span className="cls_013">……………………………………………………..</span></div>
                  <div style={{ position: 'absolute', left: '43.74px', top: '144.86px' }} className="cls_011"><span className="cls_011">•</span><span className="cls_008"> HOẶC bất kỳ biến cố nào dẫn đến </span><span className="cls_009">Thay đổi phác đồ điều trị lao </span><span className="cls_010">(ngừng thuốc, đổi thuốc, giảm liều)</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '157.12px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>A. THÔNG TIN VỀ BỆNH NHÂN</span></div>
                  <div style={{ position: 'absolute', left: '492.54px', top: '171.16px' }} className="cls_017"><span className="cls_017">Ngày sinh:{`${item.patient.birthDate ? moment(item.patient.birthDate).format("DD/MM/YYYY") : ''}`}</span></div>
                  <div style={{ position: 'absolute', left: '638.64px', top: '171.16px' }} className="cls_017"><span className="cls_017">Giới tính:</span></div>
                  <div style={{ position: 'absolute', left: '726.42px', top: '171.16px' }} className="cls_017"><span className="cls_017">Cân nặng: {item.patient.weight}</span></div>
                  <div style={{ position: 'absolute', left: '808.49px', top: '171.16px' }} className="cls_017"><span className="cls_017">kg</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '176.38px' }} className="cls_016"><span className="cls_016">Họ và tên bệnh nhân: {patient?.displayName}</span></div>
                  <div style={{ position: 'absolute', left: '258.65px', top: '176.38px' }} className="cls_017"><span className="cls_017">Mã số BN: {item.patient.patientCode ? item.patient.patientCode : '………………'}.       Số eTB:{item.patient.eTBCode ? item.patient.eTBCode : <span>.........</span>}</span></div>
                  <div style={{ position: 'absolute', left: '492.54px', top: '183.52px' }} className="cls_017"><span className="cls_017">Hoặc tuổi: </span></div>
                  <div style={{ position: 'absolute', left: '651.18px', top: '183.52px' }} className="cls_017"><span className="cls_017">{item.patient.gender === 'F' ? '' : 'Nam'}</span></div>
                  <div style={{ position: 'absolute', left: '692.70px', top: '183.52px' }} className="cls_017"><span className="cls_017">{item.patient.gender === 'F' ? 'Nữ' : ''}</span></div>
                  <div style={{ position: 'absolute', left: '726.42px', top: '183.52px' }} className="cls_017"><span className="cls_017">Chiều cao:{item.patient.height}</span></div>
                  <div style={{ position: 'absolute', left: '805.98px', top: '183.52px' }} className="cls_017"><span className="cls_017">cm</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '194.32px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>B. THÔNG TIN VỀ BIẾN CỐ BẤT LỢI</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '206.32px' }} className="cls_018"><span className="cls_018">Mô tả đặc điểm biến cố</span><span className="cls_019"> (bao gồm các xét nghiệm có liên quan, nếu có)</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '246.32px' }} className="cls_017"><span className="cls_017">{item.description}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '212.30px' }} className="cls_020"><span className="cls_020">Ngày xuất hiện biến cố</span><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '483.65px', top: '212.30px' }} className="cls_017"><span className="cls_017">{`${moment(item.appearDate).format("DD/MM/YYYY")}`}</span></div>
                  <div style={{ position: 'absolute', left: '578.70px', top: '212.30px' }} className="cls_020"><span className="cls_020">Ngày hồi phục biến cố (nếu có)</span><span className="cls_017"> …</span></div>
                  <div style={{ position: 'absolute', left: '733.72px', top: '212.30px' }} className="cls_017"><span className="cls_017">{item.recoveryDay ? moment(item.recoveryDay).format("DD/MM/YYYY") : ''}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '228.70px' }} className="cls_020"><span className="cls_020">MỨC ĐỘ NGHIÊM TRỌNG CỦA BIẾN CỐ</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '239.56px' }} className="cls_017"><span className="cls_017">{item.severityDead ? '✓' : ''} Tử vong</span></div>
                  <div style={{ position: 'absolute', left: '577.62px', top: '239.56px' }} className="cls_017"><span className="cls_017">{item.severityLifeThreatening ? '✓' : ''} Đe dọa tính mạng</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '251.50px' }} className="cls_017"><span className="cls_017">{item.severityHospitalizationOrExtensionOfHospitalStay ? '✓' : ''} Nhập viện/kéo dài thời gian nằm viện</span></div>
                  <div style={{ position: 'absolute', left: '577.62px', top: '251.50px' }} className="cls_017"><span className="cls_017">{item.severityPermanentOrSeverelyBurdensome ? '✓' : ''} Tàn tật vĩnh viễn/nặng nề</span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '263.38px' }} className="cls_017"><span className="cls_017">{item.severityChangeTBTreatmentRegimen ? '✓' : ''} Thay đổi phác đồ điều trị lao</span></div>
                  <div style={{ position: 'absolute', left: '577.61px', top: '263.38px' }} className="cls_017"><span className="cls_017">{item.severityFetalMalformation ? '✓' : ''} Dị tật thai nhi</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '276.94px' }} className="cls_017"><span className="cls_017">{item.severityOther ? '✓' : ''} Khác </span><span className="cls_019">(Cụ thể:</span><span className="cls_017"> {item.severityInstrument ? item.severityInstrument : '………………………………………………………………………………………………………………'})</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '292.30px' }} className="cls_020"><span className="cls_020">MỨC ĐỘ NẶNG CỦA BIẾN CỐ</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv1' ? '✓' : ''} Độ 1</span></div>
                  <div style={{ position: 'absolute', left: '503.70px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv2' ? '✓' : ''} Độ 2</span></div>
                  <div style={{ position: 'absolute', left: '625.74px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv3' ? '✓' : ''} Độ 3</span></div>
                  <div style={{ position: 'absolute', left: '747.72px', top: '307.24px' }} className="cls_017"><span className="cls_017">{item.seriousLevel === 'lv4' ? '✓' : ''} Độ 4</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '322.60px' }} className="cls_020"><span className="cls_020">CÁCH XỬ TRÍ BIẾN CỐ</span></div>
                  <div style={{ position: 'absolute', left: '364.15px', top: '334.54px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingStoppingDrug ? '✓' : ''} Tạm ngừng thuốc</span></div>
                  <div style={{ position: 'absolute', left: '508.26px', top: '334.54px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingStopDrug ? '✓' : ''} Ngừng thuốc</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '349.42px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingReduceDose ? '✓' : ''} Giảm liều</span></div>
                  <div style={{ position: 'absolute', left: '507.71px', top: '349.42px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingOther ? '✓' : ''} Đổi thuốc lao</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '364.36px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingSymptomaticTreatment ? '✓' : ''} Điều trị triệu chứng</span></div>
                  <div style={{ position: 'absolute', left: '508.73px', top: '364.36px' }} className="cls_017"><span className="cls_017">{item.incidentHandlingOther ? '✓' : ''} Xử trí khác</span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '382.27px' }} className="cls_019"><span className="cls_019">Ghi chi tiết cách xử trí: </span><span className="cls_017">{item.incidentHandlingDetails}</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '400.12px' }} className="cls_017"><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '46.38px', top: '439.18px' }} className="cls_019"><span className="cls_019">Tên xét nghiệm</span></div>
                  <div style={{ position: 'absolute', left: '125.10px', top: '439.18px' }} className="cls_019"><span className="cls_019">Đơn vị</span></div>
                  <div style={{ position: 'absolute', left: '166.98px', top: '439.18px' }} className="cls_019"><span className="cls_019">GT bình thường</span></div>
                  <div style={{ position: 'absolute', left: '245.52px', top: '439.18px' }} className="cls_019"><span className="cls_019">Kết quả XN</span></div>
                  <div style={{ position: 'absolute', left: '311.40px', top: '439.18px' }} className="cls_019"><span className="cls_019">Ngày XN</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '442.06px' }} className="cls_020"><span className="cls_020">KẾT QUẢ SAU XỬ TRÍ BIẾN CỐ</span></div>
                  <div style={{ position: 'absolute', left: '364.14px', top: '460.00px' }} className="cls_017"><span className="cls_017">{item.result === 'result3' ? '✓' : ''} Hồi phục không có di chứng</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '460.00px' }} className="cls_017"><span className="cls_017">{item.result === 'result4' ? '✓' : ''} Hồi phục có di chứng, cụ thể:</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '471.94px' }} className="cls_017"><span className="cls_017">{item.recoveryHaveSequelaeDetails}</span></div>
                  <div style={{ position: 'absolute', left: '364.13px', top: '474.94px' }} className="cls_017"><span className="cls_017">{item.result === 'result2' ? '✓' : ''} Đang hồi phục</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '486.82px' }} className="cls_017"><span className="cls_017"></span></div>
                  <div style={{ position: 'absolute', left: '364.12px', top: '489.82px' }} className="cls_017"><span className="cls_017">{item.result === 'result1' ? '✓' : ''} Chưa hồi phục</span></div>
                  <div style={{ position: 'absolute', left: '577.58px', top: '501.76px' }} className="cls_017"><span className="cls_017">{item.dayOfDeath ? '✓' : ''} Tử vong (Ngày tử vong:{item.dayOfDeath ? moment(item.dayOfDeath).format("DD/MM/YYYY") : ''})</span></div>
                  <div style={{ position: 'absolute', left: '364.11px', top: '504.76px' }} className="cls_017"><span className="cls_017">{item.result === 'UNKNOWN' ? '✓' : ''} Không rõ</span></div>
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
                  <div style={{ position: 'absolute', left: '37.24px', top: '13.21px' }} className="cls_002"><span className="cls_002">Có thể sử dụng nhiều MẪU 2 nếu bệnh nhân gặp nhiều loại biến cố khác nhau</span></div>
                  <div style={{ position: 'absolute', left: '732.21px', top: '13.21px' }} className="cls_002"><span className="cls_002">Version: 09.2020</span></div>
                  <div style={{ position: 'absolute', left: '44.64px', top: '49.12px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>C. THÔNG TIN VỀ THUỐC NGHI NGỜ GÂY BIẾN CỐ</span><span className="cls_018"> CỐ</span></div>
                  <div style={{ position: 'absolute', left: '608.70px', top: '49.72px' }} className="cls_016"><span className="cls_016">Đánh dấu</span><span className="cls_020"> (X) = Có, (O) = Không</span></div>
                  <div style={{ position: 'absolute', left: '439.44px', top: '62.68px' }} className="cls_020"><span className="cls_020">Ngày điều trị</span></div>
                  <div style={{ position: 'absolute', left: '555.24px', top: '64.18px' }} className="cls_020"><span className="cls_020">Có</span></div>
                  <div style={{ position: 'absolute', left: '605.68px', top: '64.18px' }} className="cls_020"><span className="cls_020">Phản ứng có</span></div>
                  <div style={{ position: 'absolute', left: '205.42px', top: '69.34px' }} className="cls_020"><span className="cls_020">Dạng bào</span></div>
                  <div style={{ position: 'absolute', left: '683.42px', top: '69.35px' }} className="cls_020"><span className="cls_020">Có tái sử</span></div>
                  <div style={{ position: 'absolute', left: '746.41px', top: '69.35px' }} className="cls_020"><span className="cls_020">Phản ứng có lặp</span></div>
                  <div style={{ position: 'absolute', left: '78.36px', top: '74.56px' }} className="cls_020"><span className="cls_020">Thuốc </span><span className="cls_026">nghi ngờ</span><span className="cls_020"> (tên gốc</span></div>
                  <div style={{ position: 'absolute', left: '260.68px', top: '74.56px' }} className="cls_020"><span className="cls_020">Liều dùng</span></div>
                  <div style={{ position: 'absolute', left: '320.43px', top: '74.56px' }} className="cls_020"><span className="cls_020">Số lần</span></div>
                  <div style={{ position: 'absolute', left: '368.25px', top: '74.56px' }} className="cls_020"><span className="cls_020">Đường</span></div>
                  <div style={{ position: 'absolute', left: '421.26px', top: '73.06px' }} className="cls_020"><span className="cls_020">(ghi </span><span className="cls_016">ngày/tháng/năm</span><span className="cls_020">)</span></div>
                  <div style={{ position: 'absolute', left: '535.20px', top: '74.56px' }} className="cls_020"><span className="cls_020">ngừng/giảm</span></div>
                  <div style={{ position: 'absolute', left: '607.18px', top: '74.56px' }} className="cls_020"><span className="cls_020">cải thiện khi</span></div>
                  <div style={{ position: 'absolute', left: '46.86px', top: '79.72px' }} className="cls_020"><span className="cls_020">TT</span></div>
                  <div style={{ position: 'absolute', left: '206.44px', top: '79.71px' }} className="cls_020"><span className="cls_020">chế, hàm</span></div>
                  <div style={{ position: 'absolute', left: '678.44px', top: '79.72px' }} className="cls_020"><span className="cls_020">dụng thuốc</span></div>
                  <div style={{ position: 'absolute', left: '743.10px', top: '79.72px' }} className="cls_020"><span className="cls_020">lại khi tái sử dụng</span></div>
                  <div style={{ position: 'absolute', left: '78.36px', top: '84.88px' }} className="cls_020"><span className="cls_020">và/hoặc tên thương mại)</span></div>
                  <div style={{ position: 'absolute', left: '265.48px', top: '84.88px' }} className="cls_020"><span className="cls_020">(đơn vị)</span></div>
                  <div style={{ position: 'absolute', left: '322.95px', top: '84.88px' }} className="cls_020"><span className="cls_020">dùng</span></div>
                  <div style={{ position: 'absolute', left: '372.45px', top: '84.88px' }} className="cls_020"><span className="cls_020">dùng</span></div>
                  <div style={{ position: 'absolute', left: '539.93px', top: '84.88px' }} className="cls_020"><span className="cls_020">liều thuốc</span></div>
                  <div style={{ position: 'absolute', left: '607.17px', top: '84.88px' }} className="cls_020"><span className="cls_020">ngừng/giảm</span></div>
                  <div style={{ position: 'absolute', left: '212.74px', top: '90.04px' }} className="cls_020"><span className="cls_020">lượng</span></div>
                  <div style={{ position: 'absolute', left: '420.96px', top: '91.54px' }} className="cls_020"><span className="cls_020">Bắt đầu</span></div>
                  <div style={{ position: 'absolute', left: '477.96px', top: '91.54px' }} className="cls_020"><span className="cls_020">Kết thúc</span></div>
                  <div style={{ position: 'absolute', left: '680.71px', top: '90.05px' }} className="cls_020"><span className="cls_020">nghi ngờ?</span></div>
                  <div style={{ position: 'absolute', left: '745.98px', top: '90.05px' }} className="cls_020"><span className="cls_020">thuốc nghi ngờ?</span></div>
                  <div style={{ position: 'absolute', left: '539.03px', top: '95.20px' }} className="cls_020"><span className="cls_020">nghi ngờ?</span></div>
                  <div style={{ position: 'absolute', left: '609.20px', top: '95.20px' }} className="cls_020"><span className="cls_020">liều thuốc?</span></div>
                  {item.listSuspectIncidentDrugDto?.map((item, index) => (
                    <>
                      <div style={{ position: 'absolute', left: '78.36px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.drug.name ? item.drug.name : ''}</span></div>
                      <div style={{ position: 'absolute', left: '212.74px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.content}</span></div>
                      <div style={{ position: 'absolute', left: '265.48px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.dose}</span></div>
                      <div style={{ position: 'absolute', left: '320.43px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.numberOfUse}</span></div>
                      <div style={{ position: 'absolute', left: '368.25px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.drugRoute}</span></div>
                      <div style={{ position: 'absolute', left: '420.96px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{`${moment(item.startDate).format("DD/MM/YYYY")}`}</span></div>
                      <div style={{ position: 'absolute', left: '477.96px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{`${moment(item.endDate).format("DD/MM/YYYY")}`}</span></div>
                      <div style={{ position: 'absolute', left: '539.93px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.hasReduce === true ? "Có" : "Không"}</span></div>
                      <div style={{ position: 'absolute', left: '607.17px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.hasImprove === true ? "Có" : "Không"}</span></div>
                      <div style={{ position: 'absolute', left: '680.71px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.repeatDrugReaction === true ? "Có" : "Không"}</span></div>
                      <div style={{ position: 'absolute', left: '745.98px', top: `${108.82 + ((index) * 16)}px` }} className="cls_020"><span className="cls_020">{item.reTakeSuspecDrug === true ? "Có" : "Không"}</span></div>
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
                  <div style={{ position: 'absolute', left: '46.02px', top: '281.68px' }} className="cls_018"><span className="cls_018">Các thuốc dùng đồng thời</span><span className="cls_022"> (</span><span className="cls_023">Trước khi xảy ra biến cố</span><span className="cls_022">)</span></div>
                  <div style={{ position: 'absolute', left: '280.74px', top: '293.86px' }} className="cls_024"><span className="cls_024">Ngày điều trị (ngày/tháng/năm)</span></div>
                  <div style={{ position: 'absolute', left: '673.20px', top: '293.86px' }} className="cls_024"><span className="cls_024">Ngày điều trị (ngày/tháng/năm)</span></div>
                  <div style={{ position: 'absolute', left: '47.04px', top: '299.74px' }} className="cls_024"><span className="cls_024">Tên thuốc (hàm lượng)</span></div>
                  <div style={{ position: 'absolute', left: '147.84px', top: '299.74px' }} className="cls_024"><span className="cls_024">Liều dùng, đường dùng</span></div>
                  <div style={{ position: 'absolute', left: '439.44px', top: '299.74px' }} className="cls_024"><span className="cls_024">Tên thuốc (hàm lượng)</span></div>
                  <div style={{ position: 'absolute', left: '539.34px', top: '299.74px' }} className="cls_024"><span className="cls_024">Liều dùng, đường dùng</span></div>
                  <div style={{ position: 'absolute', left: '277.50px', top: '304.60px' }} className="cls_024"><span className="cls_024">Bắt đầu</span></div>
                  <div style={{ position: 'absolute', left: '370.68px', top: '304.60px' }} className="cls_024"><span className="cls_024">Kết thúc</span></div>
                  <div style={{ position: 'absolute', left: '669.66px', top: '304.60px' }} className="cls_024"><span className="cls_024">Bắt đầu</span></div>
                  <div style={{ position: 'absolute', left: '763.80px', top: '304.60px' }} className="cls_024"><span className="cls_024">Kết thúc</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '404.32px' }} className="cls_018"><span className="cls_018">Bình luận, đánh giá của cán bộ y tế</span><span className="cls_022"> (</span><span className="cls_023">Thông tin bổ sung có liên quan đến biến cố?</span><span className="cls_022"> </span><span className="cls_023">Anh/chị nghĩ đến biến cố xảy ra do thuốc nào? Cơ sở có tiền hành giải mẫn cảm hoặc sử</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '415.84px' }} className="cls_023"><span className="cls_023">dụng lại thuốc nghi ngờ với liều thấp hơn không? Sau xử trí biến cố, bệnh nhân được điều trị bằng phác đồ lao nào? v.v..)</span><span className="cls_022">:</span></div>
                  <div style={{ position: 'absolute', left: '46.02px', top: '479.68px' }} className="cls_015"><span className="cls_015" style={{ color: 'black' }}>D. THÔNG TIN VỀ NGƯỜI BÁO CÁO</span></div>
                  <div style={{ position: 'absolute', left: '58.56px', top: '497.74px' }} className="cls_017"><span className="cls_017">Họ và tên:{item.reportBy}</span></div>
                  <div style={{ position: 'absolute', left: '436.56px', top: '497.74px' }} className="cls_017"><span className="cls_017">Nghề nghiệp/Chức vụ:{item.reporterTitle}</span></div>
                  <div style={{ position: 'absolute', left: '58.54px', top: '519.22px' }} className="cls_017"><span className="cls_017">Điện thoại liên lạc:{item.reporterPhoneNumber}</span></div>
                  <div style={{ position: 'absolute', left: '438.58px', top: '519.22px' }} className="cls_017"><span className="cls_017">Email:{item.reporterEmail}</span></div>
                  <div style={{ position: 'absolute', left: '59.34px', top: '547.96px' }} className="cls_017"><span className="cls_017">Chữ ký</span></div>
                  <div style={{ position: 'absolute', left: '226.08px', top: '547.12px' }} className="cls_013"><span className="cls_013">20</span><span className="cls_022">.</span><span className="cls_017"> Dạng báo cáo: {item.reportType}</span></div>
                  <div style={{ position: 'absolute', left: '391.67px', top: '548.14px' }} className="cls_017"><span className="cls_017">(lần thứ: ….....)</span></div>
                  <div style={{ position: 'absolute', left: '502.24px', top: '548.14px' }} className="cls_017"><span className="cls_017">)</span></div>
                  <div style={{ position: 'absolute', left: '533.80px', top: '547.96px' }} className="cls_017"><span className="cls_017">Ngày báo cáo:{moment(item.reportDate).format("DD/MM/YYYY")}</span></div>
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
                {t('Huỷ')}
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
