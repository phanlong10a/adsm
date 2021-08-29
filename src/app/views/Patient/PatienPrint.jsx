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
import { addNew, update, searchByPageDrug, getById, checkCode } from "./PatientService";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";


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
    name:'',
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
    let id = this.props.id;
    if (id != null) {
        getById(id).then(({ data }) => {
            if (data.parent === null) {
                data.parent = {};
            }
            console.log(data)
            this.setState({ ...data })
            this.setState({ didMountComplete: true })
        })
    } else {
        this.setState({ didMountComplete: true })
    }

    var searchObject = {};
    searchObject.pageIndex = 1;
    searchObject.pageSize = 10000;
    getLabTests(searchObject).then(({ data }) => {
        this.setState({ listLabTest: [...data.content] });
    })
    searchByPageDrug(searchObject).then(({ data }) => {
        this.setState({ listDrug: [...data.content] })
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
      displayName
    } = this.state;

    return (


      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth  >
        <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', print: { size: 'auto', margin: '0mm' } }}></iframe>

        <ValidatorForm className="validator-form-scroll-dialog" ref="form" onSubmit={this.handleFormSubmit} style={{minHeight:1682}}>
          <DialogContent id='divcontents' >
            <Grid>

              <div>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n        <!--\n        span.cls_003 {\n            font-family: Arial, serif;\n            font-size: 12.1px;\n            color: rgb(0, 0, 0);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_003 {\n            font-family: Arial, serif;\n            font-size: 12.1px;\n            color: rgb(0, 0, 0);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_005 {\n            font-family: Arial, serif;\n            font-size: 11.6px;\n            color: rgb(0, 0, 0);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        div.cls_005 {\n            font-family: Arial, serif;\n            font-size: 11.6px;\n            color: rgb(0, 0, 0);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        span.cls_007 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_007 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_009 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_009 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_010 {\n            font-family: Arial, serif;\n            font-size: 10.1px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_010 {\n            font-family: Arial, serif;\n            font-size: 10.1px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_011 {\n            font-family: \"Segoe UI Symbol\", serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_011 {\n            font-family: \"Segoe UI Symbol\", serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_014 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        div.cls_014 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        span.cls_015 {\n            font-family: Arial, serif;\n            font-size: 10.1px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_015 {\n            font-family: Arial, serif;\n            font-size: 10.1px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_018 {\n            font-family: Arial, serif;\n            font-size: 9.1px;\n            color: rgb(0, 0, 0);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        div.cls_018 {\n            font-family: Arial, serif;\n            font-size: 9.1px;\n            color: rgb(0, 0, 0);\n            font-weight: normal;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        span.cls_023 {\n            font-family: \"Calibri\", serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        div.cls_023 {\n            font-family: \"Calibri\", serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: normal;\n            font-style: normal;\n            text-decoration: none\n        }\n\n        span.cls_025 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: italic;\n            text-decoration: none\n        }\n\n        div.cls_025 {\n            font-family: Arial, serif;\n            font-size: 11.0px;\n            color: rgb(4, 4, 4);\n            font-weight: bold;\n            font-style: italic;\n            text-decoration: none\n        }\n        -->\n    " }} />
                <div style={{ position: 'absolute', left: '50%', marginLeft: '-297px', top: '0px', width: '595px', height: '841px', borderStyle: 'outset', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  </div>
                  <div style={{ position: 'absolute', left: '49.74px', top: '19.36px' }} className="cls_003"><span className="cls_003">MẪU 1: THÔNG TIN
                    TRƯỚC ĐIỀU TRỊ</span></div>
                  <div style={{ position: 'absolute', left: '353.22px', top: '19.36px' }} className="cls_003"><span className="cls_003">Cơ sở điều trị:
                    ………………….</span></div>
                  <div style={{ position: 'absolute', left: '73.02px', top: '33.22px' }} className="cls_005"><span className="cls_005">Áp dụng trong hoạt
                    động aDSM</span></div>
                  <div style={{ position: 'absolute', left: '31.50px', top: '79.54px' }} className="cls_007"><span className="cls_007">A. THÔNG TIN
                    CHUNG</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '97.90px' }} className="cls_007"><span className="cls_007">Họ và tên bệnh
                    nhân : {displayName}</span><span className="cls_009">:</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '115.78px' }} className="cls_007"><span className="cls_007">Mã số bệnh
                    nhân:</span></div>
                  <div style={{ position: 'absolute', left: '381.05px', top: '115.78px' }} className="cls_007"><span className="cls_007">Số
                    eTB</span><span className="cls_009">:</span></div>
                  <div style={{ position: 'absolute', left: '31.44px', top: '134.44px' }} className="cls_007"><span className="cls_007">Ngày sinh:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '142.62px', top: '135.40px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '188.27px', top: '135.40px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '154.96px' }} className="cls_007"><span className="cls_007">Giới tính:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '93.25px', top: '154.96px' }} className="cls_011"><span className="cls_011">☐ </span><span className="cls_009">Nam </span><span className="cls_011">☐ </span><span className="cls_009">Nữ</span></div>
                  <div style={{ position: 'absolute', left: '212.20px', top: '154.96px' }} className="cls_007"><span className="cls_007">Vị trí tổn
                    thương:</span></div>
                  <div style={{ position: 'absolute', left: '315.27px', top: '154.96px' }} className="cls_011"><span className="cls_011">☐ </span><span className="cls_009">Phổi</span></div>
                  <div style={{ position: 'absolute', left: '362.54px', top: '154.96px' }} className="cls_011"><span className="cls_011">☐ </span><span className="cls_009">Ngoài phổi</span></div>
                  <div style={{ position: 'absolute', left: '439.68px', top: '154.96px' }} className="cls_011"><span className="cls_011">☐ </span><span className="cls_009">Cả hai</span></div>
                  <div style={{ position: 'absolute', left: '494.93px', top: '154.96px' }} className="cls_009"><span className="cls_009">☐ Không
                    rõ</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '175.66px' }} className="cls_007"><span className="cls_007">Chiều
                    cao</span><span className="cls_010">: |</span></div>
                  <div style={{ position: 'absolute', left: '113.39px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '134.68px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '155.91px', top: '176.62px' }} className="cls_010"><span className="cls_010">| cm</span>
                  </div>
                  <div style={{ position: 'absolute', left: '211.56px', top: '175.66px' }} className="cls_007"><span className="cls_007">Cân nặng:
                  </span><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '290.57px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '311.86px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '333.09px', top: '176.62px' }} className="cls_010"><span className="cls_010">| kg</span>
                  </div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '199.54px' }} className="cls_007"><span className="cls_007">Phân loại bệnh
                    nhân</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '214.78px' }} className="cls_009"><span className="cls_009">□ Mắc mới</span>
                  </div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '214.78px' }} className="cls_009"><span className="cls_009">□ Thất bại phác
                    đồ lao trước đó</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '228.40px' }} className="cls_009"><span className="cls_009">□ Tái phát</span>
                  </div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '228.40px' }} className="cls_009"><span className="cls_009">□ Điều trị lại
                    sau bỏ trị</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '242.26px' }} className="cls_009"><span className="cls_009">□ Chuyển đến (cơ
                    sở cũ: ……………………)</span></div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '242.26px' }} className="cls_009"><span className="cls_009">□ Khác (cụ thể:
                    ………………………………………)</span></div>
                  <div style={{ position: 'absolute', left: '31.68px', top: '263.68px' }} className="cls_007"><span className="cls_007">B. TÌNH TRẠNG LÂM
                    SÀNG</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '283.66px' }} className="cls_007"><span className="cls_007">Đặc điểm</span>
                  </div>
                  <div style={{ position: 'absolute', left: '139.68px', top: '283.66px' }} className="cls_007"><span className="cls_007">Có</span></div>
                  <div style={{ position: 'absolute', left: '176.88px', top: '283.66px' }} className="cls_007"><span className="cls_007">Không</span>
                  </div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '283.66px' }} className="cls_007"><span className="cls_007">Bệnh mắc
                    kèm</span></div>
                  <div style={{ position: 'absolute', left: '355.26px', top: '283.66px' }} className="cls_007"><span className="cls_007">Có</span></div>
                  <div style={{ position: 'absolute', left: '404.70px', top: '283.66px' }} className="cls_007"><span className="cls_007">Không</span>
                  </div>
                  <div style={{ position: 'absolute', left: '474.60px', top: '283.66px' }} className="cls_007"><span className="cls_007">Mô tả
                  </span><span className="cls_014">(nếu có)</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '302.20px' }} className="cls_009"><span className="cls_009">Suy kiệt</span>
                  </div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '303.04px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '302.20px' }} className="cls_009"><span className="cls_009">HIV</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '303.04px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '303.04px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '321.76px' }} className="cls_009"><span className="cls_009">Nghiện
                    rượu</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '322.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '322.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '321.76px' }} className="cls_009"><span className="cls_009">Thiếu máu</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '322.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '322.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '341.32px' }} className="cls_009"><span className="cls_009">Nghiện thuốc
                    lá</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '342.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '342.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '341.32px' }} className="cls_009"><span className="cls_009">Đái tháo
                    đường</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '342.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '342.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '360.88px' }} className="cls_009"><span className="cls_009">Nghiện ma
                    túy</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '361.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '361.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '360.88px' }} className="cls_009"><span className="cls_009">Bệnh thính
                    giác</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '361.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '361.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '380.44px' }} className="cls_009"><span className="cls_009">Mang thai</span>
                  </div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '381.28px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '381.28px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '380.44px' }} className="cls_009"><span className="cls_009">Bệnh thị
                    giác</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '381.28px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '381.28px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '400.00px' }} className="cls_009"><span className="cls_009">Cho con bú</span>
                  </div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '400.84px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '400.84px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '400.00px' }} className="cls_009"><span className="cls_009">Bệnh gan</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '400.84px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '400.84px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '419.56px' }} className="cls_009"><span className="cls_009">Khác</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '420.40px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '420.40px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '419.56px' }} className="cls_009"><span className="cls_009">Bệnh thận</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '420.40px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '420.40px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '439.60px' }} className="cls_009"><span className="cls_009">Bệnh tim
                    mạch</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '440.44px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '440.44px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '34.26px', top: '454.18px' }} className="cls_015"><span className="cls_015">TIỀN SỬ DỊ ỨNG
                  </span><span className="cls_010">(mô tả nếu có)</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '459.76px' }} className="cls_009"><span className="cls_009">Bệnh cơ xương
                    khớp</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '460.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '460.60px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '479.32px' }} className="cls_009"><span className="cls_009">Rối loạn tâm
                    thần</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '480.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '480.16px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '498.88px' }} className="cls_009"><span className="cls_009">Khác</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '499.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '499.72px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '535.96px' }} className="cls_007"><span className="cls_007">C. XÉT NGHIỆM
                    TRƯỚC ĐIỀU TRỊ LAO </span><span className="cls_014">(các xét nghiệm gần đây nhất)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '559.72px' }} className="cls_015"><span className="cls_015">Tên xét
                    nghiệm</span></div>
                  <div style={{ position: 'absolute', left: '127.08px', top: '559.72px' }} className="cls_015"><span className="cls_015">Kết quả</span>
                  </div>
                  <div style={{ position: 'absolute', left: '176.76px', top: '559.72px' }} className="cls_015"><span className="cls_015">GT Bình</span>
                  </div>
                  <div style={{ position: 'absolute', left: '226.26px', top: '559.72px' }} className="cls_015"><span className="cls_015">Ngày XN</span>
                  </div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '559.72px' }} className="cls_015"><span className="cls_015">Tên xét
                    nghiệm</span></div>
                  <div style={{ position: 'absolute', left: '428.64px', top: '559.72px' }} className="cls_015"><span className="cls_015">Kết quả</span>
                  </div>
                  <div style={{ position: 'absolute', left: '478.14px', top: '559.72px' }} className="cls_015"><span className="cls_015">GT Bình</span>
                  </div>
                  <div style={{ position: 'absolute', left: '527.64px', top: '559.72px' }} className="cls_015"><span className="cls_015">Ngày XN</span>
                  </div>
                  <div style={{ position: 'absolute', left: '176.76px', top: '571.18px' }} className="cls_015"><span className="cls_015">thường</span>
                  </div>
                  <div style={{ position: 'absolute', left: '478.14px', top: '571.18px' }} className="cls_015"><span className="cls_015">thường</span>
                  </div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '589.72px' }} className="cls_010"><span className="cls_010">Hemoglobin
                    (g/dL)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '589.72px' }} className="cls_010"><span className="cls_010">SGOT/AST
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '611.74px' }} className="cls_010"><span className="cls_010">SGPT/ALT
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '610.48px' }} className="cls_010"><span className="cls_010">Bạch cầu
                    (x109/L)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '633.82px' }} className="cls_010"><span className="cls_010">Bilirubin TP
                    (µmol//l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '632.56px' }} className="cls_010"><span className="cls_010">Tiểu cầu
                    (x109/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '655.84px' }} className="cls_010"><span className="cls_010">Creatinin
                    (µmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '655.84px' }} className="cls_010"><span className="cls_010">Bilirubin TT
                    (µmol//l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '678.04px' }} className="cls_010"><span className="cls_010">Kali
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '677.92px' }} className="cls_010"><span className="cls_010">Amylase
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '700.18px' }} className="cls_010"><span className="cls_010">Magiê
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '700.18px' }} className="cls_010"><span className="cls_010">TSH
                    (µU/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '722.20px' }} className="cls_010"><span className="cls_010">Calci
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '722.20px' }} className="cls_010"><span className="cls_010">Đường huyết lúc
                    đói (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '744.34px' }} className="cls_010"><span className="cls_010">Acid uric
                    (µmol//l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '744.34px' }} className="cls_010"><span className="cls_010">Khác, cụ thể:
                    …………………..</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '792.94px' }} className="cls_018"><span className="cls_018">Có thể sử dụng
                    nhiều MẪU 1 nếu bệnh nhân có nhiều thuốc dùng kèm hoặc nhiều biến cố</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '805.18px' }} className="cls_018"><span className="cls_018">Version
                    24/11/2017</span></div>
                </div>
                <div style={{ position: 'absolute', left: '50%', marginLeft: '-297px', top: '851px', width: '595px', height: '841px', borderStyle: 'outset', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  </div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '84.94px' }} className="cls_010"><span className="cls_010">Khoảng QT/QTc
                    (ms)</span></div>
                  <div style={{ position: 'absolute', left: '364.92px', top: '85.36px' }} className="cls_010"><span className="cls_010">Tai trái:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '453.78px', top: '85.36px' }} className="cls_010"><span className="cls_010">Tai phải:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '87.70px' }} className="cls_010"><span className="cls_010">Đo thính
                    lực</span></div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '106.90px' }} className="cls_010"><span className="cls_010">Khoảng QTcF
                    (ms)</span></div>
                  <div style={{ position: 'absolute', left: '364.92px', top: '107.50px' }} className="cls_010"><span className="cls_010">Mắt trái:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '453.78px', top: '107.50px' }} className="cls_010"><span className="cls_010">Mắt phải:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '109.84px' }} className="cls_010"><span className="cls_010">Đo thị
                    lực</span></div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '129.28px' }} className="cls_010"><span className="cls_010">Nhịp tim</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '129.28px' }} className="cls_010"><span className="cls_010">Khác</span>
                  </div>
                  <div style={{ position: 'absolute', left: '21.30px', top: '163.48px' }} className="cls_007"><span className="cls_007">D. THUỐC ĐIỀU TRỊ
                    LAO</span></div>
                  <div style={{ position: 'absolute', left: '107.64px', top: '183.34px' }} className="cls_007"><span className="cls_007">Tên thuốc</span>
                  </div>
                  <div style={{ position: 'absolute', left: '244.68px', top: '183.34px' }} className="cls_007"><span className="cls_007">Liều/ngày (đơn
                    vị)</span></div>
                  <div style={{ position: 'absolute', left: '379.32px', top: '183.34px' }} className="cls_007"><span className="cls_007">Ngày/tuần</span>
                  </div>
                  <div style={{ position: 'absolute', left: '482.16px', top: '183.34px' }} className="cls_007"><span className="cls_007">Ngày bắt
                    đầu</span></div>
                  <div style={{ position: 'absolute', left: '31.68px', top: '390.04px' }} className="cls_007"><span className="cls_007">E. TIỀN SỬ DÙNG
                    THUỐC </span><span className="cls_014">(trong vòng 30 ngày gần đây) </span><span className="cls_009">và
                    </span><span className="cls_007">THUỐC DÙNG KÈM</span></div>
                  <div style={{ position: 'absolute', left: '150.30px', top: '412.36px' }} className="cls_007"><span className="cls_007">Thuốc
                  </span><span className="cls_009">(tên thuốc, liều dùng, đường dùng)</span></div>
                  <div style={{ position: 'absolute', left: '490.20px', top: '412.42px' }} className="cls_007"><span className="cls_007">Đang dùng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '429.94px' }} className="cls_009"><span className="cls_009">1.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '429.82px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '451.42px' }} className="cls_009"><span className="cls_009">2.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '451.36px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '472.90px' }} className="cls_009"><span className="cls_009">3.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '472.78px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '494.26px' }} className="cls_009"><span className="cls_009">4.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '494.14px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '515.74px' }} className="cls_009"><span className="cls_009">5.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '515.62px' }} className="cls_009"><span className="cls_009">☐</span></div>
                  <div style={{ position: 'absolute', left: '21.30px', top: '557.74px' }} className="cls_007"><span className="cls_007">F. CÁC BIẾN CỐ
                    LIÊN QUAN ĐẾN SỨC KHỎE </span><span className="cls_014">(trong vòng 30 ngày gần đây)</span></div>
                  <div style={{ position: 'absolute', left: '77.22px', top: '580.96px' }} className="cls_007"><span className="cls_007">Mô tả đặc điểm
                    biến cố</span></div>
                  <div style={{ position: 'absolute', left: '352.20px', top: '580.96px' }} className="cls_007"><span className="cls_007">Thông tin về
                    biến cố</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '599.98px' }} className="cls_009"><span className="cls_009">1.</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '600.10px' }} className="cls_009"><span className="cls_009">Biến cố còn tồn
                    tại: ☐ Có ☐ Không</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '619.60px' }} className="cls_009"><span className="cls_009">Ngày xuất
                    hiện:</span></div>
                  <div style={{ position: 'absolute', left: '347.34px', top: '620.56px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '372.48px', top: '620.56px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '639.94px' }} className="cls_023"><span className="cls_023">2.</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '639.82px' }} className="cls_009"><span className="cls_009">Biến cố còn tồn
                    tại: ☐ Có ☐ Không</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '659.08px' }} className="cls_009"><span className="cls_009">Ngày xuất
                    hiện:</span></div>
                  <div style={{ position: 'absolute', left: '347.34px', top: '660.04px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '372.48px', top: '660.04px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '38.64px', top: '712.18px' }} className="cls_025"><span className="cls_025">Ngày báo
                    cáo</span></div>
                  <div style={{ position: 'absolute', left: '301.20px', top: '710.56px' }} className="cls_025"><span className="cls_025">Người báo
                    cáo</span></div>
                  <div style={{ position: 'absolute', left: '187.08px', top: '721.95px' }} className="cls_009"><span className="cls_009">/</span></div>
                  <div style={{ position: 'absolute', left: '211.91px', top: '721.96px' }} className="cls_010"><span className="cls_010">/ ___</span>
                  </div>
                  <div style={{ position: 'absolute', left: '290.81px', top: '723.10px' }} className="cls_014"><span className="cls_014">(ký và ghi rõ họ
                    tên)</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '792.94px' }} className="cls_018"><span className="cls_018">Có thể sử dụng
                    nhiều MẪU 1 nếu bệnh nhân có nhiều thuốc dùng kèm hoặc nhiều biến cố</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '805.18px' }} className="cls_018"><span className="cls_018">Version
                    24/11/2017</span></div>
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
