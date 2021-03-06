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
          <span className="">{t('Phi???u ??i???u chuy???n')}</span>
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
    <p>C?? th??? s??? d???ng nhi???u M???U 2 n???u b???nh nh??n g???p nhi???u lo???i bi???n c??? kh??c nhau </p>
    <p>Version: 09.2020</p>
  </div>
  <div style={{width: '100%', border: '1px solid black', height: 1000}}>
    <div style={{width: '100%', height: '21%', borderBottom: '1px solid black', display: 'flex'}}>
      <div style={{width: '70%', height: '100%', borderRight: '1px solid black', position: 'relative'}}>
        <div style={{position: 'absolute', top: 10, left: 10}}>
          <h5 style={{padding: 0, margin: 0}}>
            M???U 2
          </h5>
        </div>
        <div style={{width: '100%', textAlign: 'center', paddingTop: 10}}>
          <h5 style={{padding: 0, margin: 0}}>
            B??O C??O BI???N C??? B???T L???I TRONG ??I???U TR??? MDR-TB
          </h5>
          <p style={{padding: 0, margin: 0, fontStyle: 'italic', fontWeight: 'bold'}}>
            ??p d???ng trong ho???t ?????ng aDSM
          </p>
        </div>
        <div style={{paddingLeft: 10}}>
          <h5 style={{padding: 0, margin: 0, textDecoration: 'underline', color: '#0000EE', fontSize: 15}}>
            C??c tr?????ng h???p C???N B??O C??O:
          </h5>
          <ul style={{margin: 0, padding: 0, paddingLeft: 10}}>
            <li style={{margin: 0, padding: 0}}>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>B???nh nh??n g???p b???t k???
                tri???u ch???ng l??m s??ng b???t th?????ng (thay ?????i so v???i ban ?????u)
                v??/ho???c gi?? tr??? x??t nghi???m n???m ngo??i gi???i h???n b??nh th?????ng
                thu???c M???T trong c??c bi???n c??? sau: (1) K??o d??i kho???ng QT; (2) ?????c t??nh tr??n th???n; (3)
                M???t th??nh l???c; (4) Thay ?????i th??? gi??c; (5) B???nh l?? th???n
                kinh ngo???i bi??n; (6) B???t th?????ng v??? huy???t h???c (gi???m b???ch c???u, gi???m ti???u c???u, thi???u
                m??u, b???t s???n h???ng c???u, b???t th?????ng ????ng m??u v?? b???ch c???u ??i toan)</p>
            </li>
            <li>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>
                HO???C b???t k??? bi???n c??? thu???c lo???i nghi??m tr???ng (SAE) l?? bi???n c??? g??y ra M???T trong c??c
                h???u qu??? sau: (1) T??? vong; (2) ??e d???a t??nh m???ng;
                (3) Nh???p vi???n ho???c k??o d??i th???i gian n???m vi???n; (4) T??n t???t v??nh vi???n/n???ng n??? ho???c
                (5) D??? t???t thai nhi;
              </p>
            </li>
            <li>
              <p style={{margin: 0, padding: 0, color: '#0000EE', fontSize: 14}}>
                HO???C b???t k??? bi???n c??? n??o d???n ?????n Thay ?????i ph??c ????? ??i???u tr??? lao (ng???ng thu???c, ?????i
                thu???c, gi???m li???u)
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div style={{width: '30%'}}>
        <div style={{height: '50%', borderBottom: '1px solid black', display: 'flex', alignItems: 'center'}}>
          <p style={{paddingLeft: 10}}>
            N??i b??o c??o: .....................
          </p>
        </div>
        <div style={{height: '50%'}}>
          <p style={{paddingLeft: 10}}>
            M?? s??? b??o c??o (do Trung t??m DI &amp; ADR Qu???c gia
            qu???n l??):
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
          A. TH??NG TIN V??? B???NH NH??N
        </h4>
      </div>
      <div style={{display: 'flex', height: '83%'}}>
        <div style={{width: '60%', borderRight: '1px solid black', height: '70%'}}>
          <p style={{padding: 10, margin: 0, fontSize: 20}}>
            H??? v?? t??n b???nh nh??n: ??????????????????????????????.. M?? s??? BN: ??????????????????. S??? eTB: ??????????????????
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
