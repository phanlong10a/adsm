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
import './pdfPreview.css'

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

  componentWillMount() {
    let { open, handleClose, item } = this.props;
    this.setState({
      ...this.props.item
    }, function () {
    }
    );
  }
  componentDidMount() {
  }

  render() {
    let { open, handleClose, handleOKEditClose, t, item } = this.props;
    let now = new Date();
    let {
      rowsPerPage,
      page,
      assetVouchers,
    } = this.state;
    console.log(item)
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth  >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="">{t('Phiếu điều chuyển')}</span>
          {/* <IconButton onClick={handleClose} style={{ position: "absolute", top: 0, right:0 }}>
            <Icon className="text-black">clear</Icon>
          </IconButton> */}
        </DialogTitle>
        <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', print: { size: 'auto', margin: '0mm' } }}></iframe>
        <ValidatorForm className="validator-form-scroll-dialog" ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent id='divcontents'>
            <Grid>
            <div style={{padding: '20px 20px'}}>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
    <p>Có thể sử dụng nhiều MẪU 2 nếu bệnh nhân gặp nhiều loại biến cố khác nhau </p>
    <p>Version: 09.2020</p>
  </div>
  <div style={{width: '100%', border: '1px solid black', height: 1000}}>
    <div style={{width: '100%', height: '21%', borderBottom: '1px solid black', display: 'flex'}}>
      <div style={{width: '70%', height: '100%', borderRight: '1px solid black', position: 'relative'}}>
        <div style={{position: 'absolute', top: 10, left: 10}}>
          <h5 style={{padding: 0, margin: 0}}>
            MẪU 2
          </h5>
        </div>
        <div style={{width: '100%', textAlign: 'center', paddingTop: 10}}>
          <h5 style={{padding: 0, margin: 0}}>
            BÁO CÁO BIẾN CỐ BẤT LỢI TRONG ĐIỀU TRỊ MDR-TB
          </h5>
          <p style={{padding: 0, margin: 0, fontStyle: 'italic', fontWeight: 'bold'}}>
            Áp dụng trong hoạt động aDSM
          </p>
        </div>
        <div style={{paddingLeft: 10}}>
          <h5 style={{padding: 0, margin: 0, textDecoration: 'underline', color: '#0000EE', fontSize: 15}}>
            Các trường hợp CẦN BÁO CÁO:
          </h5>
          <ul style={{margin: 0, padding: 0, paddingLeft: 10}}>
            <li style={{margin: 0, padding: 0}}>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>Bệnh nhân gặp bất kỳ
                triệu chứng lâm sàng bất thường (thay đổi so với ban đầu)
                và/hoặc giá trị xét nghiệm nằm ngoài giới hạn bình thường
                thuộc MỘT trong các biến cố sau: (1) Kéo dài khoảng QT; (2) Độc tính trên thận; (3)
                Mất thính lực; (4) Thay đổi thị giác; (5) Bệnh lý thần
                kinh ngoại biên; (6) Bất thường về huyết học (giảm bạch cầu, giảm tiểu cầu, thiếu
                máu, bất sản hồng cầu, bất thường đông máu và bạch cầu ái toan)</p>
            </li>
            <li>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>
                HOẶC bất kỳ biến cố thuộc loại nghiêm trọng (SAE) là biến cố gây ra MỘT trong các
                hậu quả sau: (1) Tử vong; (2) Đe dọa tính mạng;
                (3) Nhập viện hoặc kéo dài thời gian nằm viện; (4) Tàn tật vĩnh viễn/nặng nề hoặc
                (5) Dị tật thai nhi;
              </p>
            </li>
            <li>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>
                HOẶC bất kỳ biến cố nào dẫn đến Thay đổi phác đồ điều trị lao (ngừng thuốc, đổi
                thuốc, giảm liều)
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div style={{width: '30%'}}>
        <div style={{height: '50%', borderBottom: '1px solid black', display: 'flex', alignItems: 'center'}}>
          <p style={{paddingLeft: 10}}>
            Nơi báo cáo: .....................
          </p>
        </div>
        <div style={{height: '50%'}}>
          <p style={{paddingLeft: 10}}>
            Mã số báo cáo (do Trung tâm DI &amp; ADR Quốc gia
            quản lý):
          </p>
          <p style={{paddingLeft: 10}}>
            .....................
          </p>
        </div>
      </div>
    </div>
    <div style={{width: '100%', height: '7%', borderBottom: '1px solid black'}}>
      <div style={{width: '100%', height: '30%', background: 'black'}}>
        <h4 style={{padding: 0, margin: 0, color: 'white', paddingLeft: 10}}>
          A. THÔNG TIN VỀ BỆNH NHÂN
        </h4>
      </div>
      <div style={{display: 'flex', height: '83%'}}>
        <div style={{width: '60%', borderRight: '1px solid black', height: '70%'}}>
          <p style={{padding: 10, margin: 0, fontSize: 20}}>
            Họ và tên bệnh nhân: ………………………….. Mã số BN: ………………. Số eTB: ………………
          </p>
        </div>
      </div>
    </div>
    <div>
    </div>
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
                {t('general.cancel')}
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
