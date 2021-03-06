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
                  <div style={{ position: 'absolute', left: '49.74px', top: '19.36px' }} className="cls_003"><span className="cls_003">M???U 1: TH??NG TIN
                    TR?????C ??I???U TR???</span></div>
                  <div style={{ position: 'absolute', left: '353.22px', top: '19.36px' }} className="cls_003"><span className="cls_003">C?? s??? ??i???u tr???:
                    ?????????????????????.</span></div>
                  <div style={{ position: 'absolute', left: '73.02px', top: '33.22px' }} className="cls_005"><span className="cls_005">??p d???ng trong ho???t
                    ?????ng aDSM</span></div>
                  <div style={{ position: 'absolute', left: '31.50px', top: '79.54px' }} className="cls_007"><span className="cls_007">A. TH??NG TIN
                    CHUNG</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '97.90px' }} className="cls_007"><span className="cls_007">H??? v?? t??n b???nh
                    nh??n : {displayName}</span><span className="cls_009">:</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '115.78px' }} className="cls_007"><span className="cls_007">M?? s??? b???nh
                    nh??n:</span></div>
                  <div style={{ position: 'absolute', left: '381.05px', top: '115.78px' }} className="cls_007"><span className="cls_007">S???
                    eTB</span><span className="cls_009">:</span></div>
                  <div style={{ position: 'absolute', left: '31.44px', top: '134.44px' }} className="cls_007"><span className="cls_007">Ng??y sinh:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '142.62px', top: '135.40px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '188.27px', top: '135.40px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '154.96px' }} className="cls_007"><span className="cls_007">Gi???i t??nh:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '93.25px', top: '154.96px' }} className="cls_011"><span className="cls_011">??? </span><span className="cls_009">Nam </span><span className="cls_011">??? </span><span className="cls_009">N???</span></div>
                  <div style={{ position: 'absolute', left: '212.20px', top: '154.96px' }} className="cls_007"><span className="cls_007">V??? tr?? t???n
                    th????ng:</span></div>
                  <div style={{ position: 'absolute', left: '315.27px', top: '154.96px' }} className="cls_011"><span className="cls_011">??? </span><span className="cls_009">Ph???i</span></div>
                  <div style={{ position: 'absolute', left: '362.54px', top: '154.96px' }} className="cls_011"><span className="cls_011">??? </span><span className="cls_009">Ngo??i ph???i</span></div>
                  <div style={{ position: 'absolute', left: '439.68px', top: '154.96px' }} className="cls_011"><span className="cls_011">??? </span><span className="cls_009">C??? hai</span></div>
                  <div style={{ position: 'absolute', left: '494.93px', top: '154.96px' }} className="cls_009"><span className="cls_009">??? Kh??ng
                    r??</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '175.66px' }} className="cls_007"><span className="cls_007">Chi???u
                    cao</span><span className="cls_010">: |</span></div>
                  <div style={{ position: 'absolute', left: '113.39px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '134.68px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '155.91px', top: '176.62px' }} className="cls_010"><span className="cls_010">| cm</span>
                  </div>
                  <div style={{ position: 'absolute', left: '211.56px', top: '175.66px' }} className="cls_007"><span className="cls_007">C??n n???ng:
                  </span><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '290.57px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '311.86px', top: '176.62px' }} className="cls_010"><span className="cls_010">|</span></div>
                  <div style={{ position: 'absolute', left: '333.09px', top: '176.62px' }} className="cls_010"><span className="cls_010">| kg</span>
                  </div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '199.54px' }} className="cls_007"><span className="cls_007">Ph??n lo???i b???nh
                    nh??n</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '214.78px' }} className="cls_009"><span className="cls_009">??? M???c m???i</span>
                  </div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '214.78px' }} className="cls_009"><span className="cls_009">??? Th???t b???i ph??c
                    ????? lao tr?????c ????</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '228.40px' }} className="cls_009"><span className="cls_009">??? T??i ph??t</span>
                  </div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '228.40px' }} className="cls_009"><span className="cls_009">??? ??i???u tr??? l???i
                    sau b??? tr???</span></div>
                  <div style={{ position: 'absolute', left: '41.76px', top: '242.26px' }} className="cls_009"><span className="cls_009">??? Chuy???n ?????n (c??
                    s??? c??: ????????????????????????)</span></div>
                  <div style={{ position: 'absolute', left: '304.50px', top: '242.26px' }} className="cls_009"><span className="cls_009">??? Kh??c (c??? th???:
                    ?????????????????????????????????????????????)</span></div>
                  <div style={{ position: 'absolute', left: '31.68px', top: '263.68px' }} className="cls_007"><span className="cls_007">B. T??NH TR???NG L??M
                    S??NG</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '283.66px' }} className="cls_007"><span className="cls_007">?????c ??i???m</span>
                  </div>
                  <div style={{ position: 'absolute', left: '139.68px', top: '283.66px' }} className="cls_007"><span className="cls_007">C??</span></div>
                  <div style={{ position: 'absolute', left: '176.88px', top: '283.66px' }} className="cls_007"><span className="cls_007">Kh??ng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '283.66px' }} className="cls_007"><span className="cls_007">B???nh m???c
                    k??m</span></div>
                  <div style={{ position: 'absolute', left: '355.26px', top: '283.66px' }} className="cls_007"><span className="cls_007">C??</span></div>
                  <div style={{ position: 'absolute', left: '404.70px', top: '283.66px' }} className="cls_007"><span className="cls_007">Kh??ng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '474.60px', top: '283.66px' }} className="cls_007"><span className="cls_007">M?? t???
                  </span><span className="cls_014">(n???u c??)</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '302.20px' }} className="cls_009"><span className="cls_009">Suy ki???t</span>
                  </div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '303.04px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '302.20px' }} className="cls_009"><span className="cls_009">HIV</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '303.04px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '303.04px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '321.76px' }} className="cls_009"><span className="cls_009">Nghi???n
                    r?????u</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '322.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '322.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '321.76px' }} className="cls_009"><span className="cls_009">Thi???u m??u</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '322.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '322.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '341.32px' }} className="cls_009"><span className="cls_009">Nghi???n thu???c
                    l??</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '342.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '342.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '341.32px' }} className="cls_009"><span className="cls_009">????i th??o
                    ???????ng</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '342.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '342.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '360.88px' }} className="cls_009"><span className="cls_009">Nghi???n ma
                    t??y</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '361.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '361.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '360.88px' }} className="cls_009"><span className="cls_009">B???nh th??nh
                    gi??c</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '361.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '361.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '380.44px' }} className="cls_009"><span className="cls_009">Mang thai</span>
                  </div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '381.28px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '381.28px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '380.44px' }} className="cls_009"><span className="cls_009">B???nh th???
                    gi??c</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '381.28px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '381.28px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '400.00px' }} className="cls_009"><span className="cls_009">Cho con b??</span>
                  </div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '400.84px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '400.84px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '400.00px' }} className="cls_009"><span className="cls_009">B???nh gan</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '400.84px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '400.84px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '39.90px', top: '419.56px' }} className="cls_009"><span className="cls_009">Kh??c</span></div>
                  <div style={{ position: 'absolute', left: '141.48px', top: '420.40px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '188.76px', top: '420.40px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '419.56px' }} className="cls_009"><span className="cls_009">B???nh th???n</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '420.40px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '420.40px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '439.60px' }} className="cls_009"><span className="cls_009">B???nh tim
                    m???ch</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '440.44px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '440.44px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '34.26px', top: '454.18px' }} className="cls_015"><span className="cls_015">TI???N S??? D??? ???NG
                  </span><span className="cls_010">(m?? t??? n???u c??)</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '459.76px' }} className="cls_009"><span className="cls_009">B???nh c?? x????ng
                    kh???p</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '460.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '460.60px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '479.32px' }} className="cls_009"><span className="cls_009">R???i lo???n t??m
                    th???n</span></div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '480.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '480.16px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '239.58px', top: '498.88px' }} className="cls_009"><span className="cls_009">Kh??c</span>
                  </div>
                  <div style={{ position: 'absolute', left: '368.94px', top: '499.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '420.60px', top: '499.72px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '535.96px' }} className="cls_007"><span className="cls_007">C. X??T NGHI???M
                    TR?????C ??I???U TR??? LAO </span><span className="cls_014">(c??c x??t nghi???m g???n ????y nh???t)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '559.72px' }} className="cls_015"><span className="cls_015">T??n x??t
                    nghi???m</span></div>
                  <div style={{ position: 'absolute', left: '127.08px', top: '559.72px' }} className="cls_015"><span className="cls_015">K???t qu???</span>
                  </div>
                  <div style={{ position: 'absolute', left: '176.76px', top: '559.72px' }} className="cls_015"><span className="cls_015">GT B??nh</span>
                  </div>
                  <div style={{ position: 'absolute', left: '226.26px', top: '559.72px' }} className="cls_015"><span className="cls_015">Ng??y XN</span>
                  </div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '559.72px' }} className="cls_015"><span className="cls_015">T??n x??t
                    nghi???m</span></div>
                  <div style={{ position: 'absolute', left: '428.64px', top: '559.72px' }} className="cls_015"><span className="cls_015">K???t qu???</span>
                  </div>
                  <div style={{ position: 'absolute', left: '478.14px', top: '559.72px' }} className="cls_015"><span className="cls_015">GT B??nh</span>
                  </div>
                  <div style={{ position: 'absolute', left: '527.64px', top: '559.72px' }} className="cls_015"><span className="cls_015">Ng??y XN</span>
                  </div>
                  <div style={{ position: 'absolute', left: '176.76px', top: '571.18px' }} className="cls_015"><span className="cls_015">th?????ng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '478.14px', top: '571.18px' }} className="cls_015"><span className="cls_015">th?????ng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '589.72px' }} className="cls_010"><span className="cls_010">Hemoglobin
                    (g/dL)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '589.72px' }} className="cls_010"><span className="cls_010">SGOT/AST
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '611.74px' }} className="cls_010"><span className="cls_010">SGPT/ALT
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '610.48px' }} className="cls_010"><span className="cls_010">B???ch c???u
                    (x109/L)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '633.82px' }} className="cls_010"><span className="cls_010">Bilirubin TP
                    (??mol//l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '632.56px' }} className="cls_010"><span className="cls_010">Ti???u c???u
                    (x109/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '655.84px' }} className="cls_010"><span className="cls_010">Creatinin
                    (??mol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '655.84px' }} className="cls_010"><span className="cls_010">Bilirubin TT
                    (??mol//l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '678.04px' }} className="cls_010"><span className="cls_010">Kali
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '677.92px' }} className="cls_010"><span className="cls_010">Amylase
                    (U/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '700.18px' }} className="cls_010"><span className="cls_010">Magi??
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '700.18px' }} className="cls_010"><span className="cls_010">TSH
                    (??U/L)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '722.20px' }} className="cls_010"><span className="cls_010">Calci
                    (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '722.20px' }} className="cls_010"><span className="cls_010">???????ng huy???t l??c
                    ????i (mmol/l)</span></div>
                  <div style={{ position: 'absolute', left: '35.34px', top: '744.34px' }} className="cls_010"><span className="cls_010">Acid uric
                    (??mol//l)</span></div>
                  <div style={{ position: 'absolute', left: '284.70px', top: '744.34px' }} className="cls_010"><span className="cls_010">Kh??c, c??? th???:
                    ?????????????????????..</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '792.94px' }} className="cls_018"><span className="cls_018">C?? th??? s??? d???ng
                    nhi???u M???U 1 n???u b???nh nh??n c?? nhi???u thu???c d??ng k??m ho???c nhi???u bi???n c???</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '805.18px' }} className="cls_018"><span className="cls_018">Version
                    24/11/2017</span></div>
                </div>
                <div style={{ position: 'absolute', left: '50%', marginLeft: '-297px', top: '851px', width: '595px', height: '841px', borderStyle: 'outset', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  </div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '84.94px' }} className="cls_010"><span className="cls_010">Kho???ng QT/QTc
                    (ms)</span></div>
                  <div style={{ position: 'absolute', left: '364.92px', top: '85.36px' }} className="cls_010"><span className="cls_010">Tai tr??i:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '453.78px', top: '85.36px' }} className="cls_010"><span className="cls_010">Tai ph???i:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '87.70px' }} className="cls_010"><span className="cls_010">??o th??nh
                    l???c</span></div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '106.90px' }} className="cls_010"><span className="cls_010">Kho???ng QTcF
                    (ms)</span></div>
                  <div style={{ position: 'absolute', left: '364.92px', top: '107.50px' }} className="cls_010"><span className="cls_010">M???t tr??i:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '453.78px', top: '107.50px' }} className="cls_010"><span className="cls_010">M???t ph???i:</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '109.84px' }} className="cls_010"><span className="cls_010">??o th???
                    l???c</span></div>
                  <div style={{ position: 'absolute', left: '33.36px', top: '129.28px' }} className="cls_010"><span className="cls_010">Nh???p tim</span>
                  </div>
                  <div style={{ position: 'absolute', left: '295.20px', top: '129.28px' }} className="cls_010"><span className="cls_010">Kh??c</span>
                  </div>
                  <div style={{ position: 'absolute', left: '21.30px', top: '163.48px' }} className="cls_007"><span className="cls_007">D. THU???C ??I???U TR???
                    LAO</span></div>
                  <div style={{ position: 'absolute', left: '107.64px', top: '183.34px' }} className="cls_007"><span className="cls_007">T??n thu???c</span>
                  </div>
                  <div style={{ position: 'absolute', left: '244.68px', top: '183.34px' }} className="cls_007"><span className="cls_007">Li???u/ng??y (????n
                    v???)</span></div>
                  <div style={{ position: 'absolute', left: '379.32px', top: '183.34px' }} className="cls_007"><span className="cls_007">Ng??y/tu???n</span>
                  </div>
                  <div style={{ position: 'absolute', left: '482.16px', top: '183.34px' }} className="cls_007"><span className="cls_007">Ng??y b???t
                    ?????u</span></div>
                  <div style={{ position: 'absolute', left: '31.68px', top: '390.04px' }} className="cls_007"><span className="cls_007">E. TI???N S??? D??NG
                    THU???C </span><span className="cls_014">(trong v??ng 30 ng??y g???n ????y) </span><span className="cls_009">v??
                    </span><span className="cls_007">THU???C D??NG K??M</span></div>
                  <div style={{ position: 'absolute', left: '150.30px', top: '412.36px' }} className="cls_007"><span className="cls_007">Thu???c
                  </span><span className="cls_009">(t??n thu???c, li???u d??ng, ???????ng d??ng)</span></div>
                  <div style={{ position: 'absolute', left: '490.20px', top: '412.42px' }} className="cls_007"><span className="cls_007">??ang d??ng</span>
                  </div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '429.94px' }} className="cls_009"><span className="cls_009">1.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '429.82px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '451.42px' }} className="cls_009"><span className="cls_009">2.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '451.36px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '472.90px' }} className="cls_009"><span className="cls_009">3.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '472.78px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '494.26px' }} className="cls_009"><span className="cls_009">4.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '494.14px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '515.74px' }} className="cls_009"><span className="cls_009">5.</span></div>
                  <div style={{ position: 'absolute', left: '513.36px', top: '515.62px' }} className="cls_009"><span className="cls_009">???</span></div>
                  <div style={{ position: 'absolute', left: '21.30px', top: '557.74px' }} className="cls_007"><span className="cls_007">F. C??C BI???N C???
                    LI??N QUAN ?????N S???C KH???E </span><span className="cls_014">(trong v??ng 30 ng??y g???n ????y)</span></div>
                  <div style={{ position: 'absolute', left: '77.22px', top: '580.96px' }} className="cls_007"><span className="cls_007">M?? t??? ?????c ??i???m
                    bi???n c???</span></div>
                  <div style={{ position: 'absolute', left: '352.20px', top: '580.96px' }} className="cls_007"><span className="cls_007">Th??ng tin v???
                    bi???n c???</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '599.98px' }} className="cls_009"><span className="cls_009">1.</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '600.10px' }} className="cls_009"><span className="cls_009">Bi???n c??? c??n t???n
                    t???i: ??? C?? ??? Kh??ng</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '619.60px' }} className="cls_009"><span className="cls_009">Ng??y xu???t
                    hi???n:</span></div>
                  <div style={{ position: 'absolute', left: '347.34px', top: '620.56px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '372.48px', top: '620.56px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '32.76px', top: '639.94px' }} className="cls_023"><span className="cls_023">2.</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '639.82px' }} className="cls_009"><span className="cls_009">Bi???n c??? c??n t???n
                    t???i: ??? C?? ??? Kh??ng</span></div>
                  <div style={{ position: 'absolute', left: '245.70px', top: '659.08px' }} className="cls_009"><span className="cls_009">Ng??y xu???t
                    hi???n:</span></div>
                  <div style={{ position: 'absolute', left: '347.34px', top: '660.04px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '372.48px', top: '660.04px' }} className="cls_010"><span className="cls_010">/</span></div>
                  <div style={{ position: 'absolute', left: '38.64px', top: '712.18px' }} className="cls_025"><span className="cls_025">Ng??y b??o
                    c??o</span></div>
                  <div style={{ position: 'absolute', left: '301.20px', top: '710.56px' }} className="cls_025"><span className="cls_025">Ng?????i b??o
                    c??o</span></div>
                  <div style={{ position: 'absolute', left: '187.08px', top: '721.95px' }} className="cls_009"><span className="cls_009">/</span></div>
                  <div style={{ position: 'absolute', left: '211.91px', top: '721.96px' }} className="cls_010"><span className="cls_010">/ ___</span>
                  </div>
                  <div style={{ position: 'absolute', left: '290.81px', top: '723.10px' }} className="cls_014"><span className="cls_014">(k?? v?? ghi r?? h???
                    t??n)</span></div>
                  <div style={{ position: 'absolute', left: '31.56px', top: '792.94px' }} className="cls_018"><span className="cls_018">C?? th??? s??? d???ng
                    nhi???u M???U 1 n???u b???nh nh??n c?? nhi???u thu???c d??ng k??m ho???c nhi???u bi???n c???</span></div>
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
