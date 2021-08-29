import React from 'react';
import {
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { getById, searchByPage, deleteItem } from "./PatientService";
import { searchByPage as searchHealthOrg } from "../HealthOrg/HealthOrgService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globitsStyles.css';
import SearchInput from '../Component/SearchInput/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import NiceTable from '../Component/Table/NiceTable';
import NiceActionButton from '../Component/Table/NiceActionButton';
import PatienPrint from './PatienPrint';
import ConstantList from "../../appConfig";
import Const from "./Const";
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete'
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3
  //etc you get the idea
});

class PatientTable extends React.Component {
  state = {
    text: '',
    rowsPerPage: 10,
    page: 1,
    totalPages: 0,
    healthOrg: null,
    itemList: [],
    listHealthOrg: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenConfirmationDeleteListDialog: false
  }

  updatePageData = (item) => {
    var searchObject = {};
    if (item != null) {
      this.setState({ page: 1, text: item.text }, () => { this.search() })
    } else {
      this.search()
    }
  };
  search = () => {
    let searchObject = {}
    searchObject.text = this.state.text;
    searchObject.pageIndex = this.state.page;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.idHealthOrg = this.state.idHealthOrg;
    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
        totalPages: data.totalPages
      })
    });
  }

  getAllHealthOrg = () => {
    let searchObjectOrg = { pageIndex: 0, pageSize: 10000000 }
    searchHealthOrg(searchObjectOrg).then(({ data }) => {
      this.setState({ listHealthOrg: data.content })
    })
  }

  selectHealthOrg = (healthOrg) => {
    if (healthOrg != null && healthOrg.id != null) {
      this.setState({ healthOrg: healthOrg, idHealthOrg: healthOrg.id }, () => {
        this.search();
      })
    } else {
      this.setState({ healthOrg: null, idHealthOrg: null }, () => {
        this.search();
      })
    }
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }
  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 1 }, function () {
      this.updatePageData()
    })
  }
  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  handleClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteListDialog: false,
      shouldOpenGetPrint:false
    }, () => {
      this.updatePageData();
    });
  };
  handleEditItem = item => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true
    });
  };
  async handleDeleteList(list) {
    let listAlert = [];
    let { t } = this.props
    for (var i = 0; i < list.length; i++) {
      try {
        await deleteItem(list[i].id);
      } catch (error) {
        listAlert.push(list[i].name);
      }
    }
    this.handleClose()
    toast.success(t('toast.delete_success'));
  };
  handleDeleteListItem = (event) => {
    let { t } = this.props
    if (this.data != null) {
      this.handleDeleteList(this.data).then(() => {
        this.updatePageData();
      })
    } else {
      this.handleClose();
      toast.warning(t('toast.please_select'));
    };
  }
  handleConfirmDeleteItem = () => {
    let { t } = this.props
    deleteItem(this.state.id).then(() => {
      this.handleClose();
      toast.success(t('toast.delete_success'));
    });
  };
  handleDelete = id => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true
    });
  };

  componentDidMount() {
    this.updatePageData();
    this.getAllHealthOrg();
  }

  handlePatientIncident(item) {
    this.props.history.push({
      pathname: ConstantList.ROOT_PATH + "patient/create/" + item.id,
      state: { readOnly: true }
    });
  }

  renderGender = (value) => {
    let gender = "";
    Const.listGender.map((item) => {
      if (item.code === value) {
        gender = item.display;
      }
    })
    return gender;
  }

  render() {
    const { t, i18n } = this.props;
    let {
      itemList,
      healthOrg,
      listHealthOrg,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDialog,
      shouldOpenConfirmationDeleteListDialog,
      shouldOpenGetPrint,id
    } = this.state;
    let columns = [
      { title: t('Mã bệnh nhân'), field: "patientCode", defaultSort: "asc", align: "left", width: "150" },
      { title: t('Tên bệnh nhân'), field: "displayName", align: "left", width: "150" },
      {
        title: t('Giới tính'), field: "gender", align: "left", width: "150",
        render: rowData => this.renderGender(rowData.gender)
      },
      {
        title: t('Đơn vị điều trị'), field: "healthOrg.name", align: "left", width: "150",
      },
      {
        title: t("Ngày sinh"), align: "left", width: "250px",
        render: rowData =>
          (rowData.birthDate) ? <span>{moment(rowData.birthDate).format('DD/MM/YYYY')}</span> : ''
      },
      {
        title: t('general.action'),
        field: "custom",
        type: 'numeric',
        width: "250",
        render: rowData =>
          <>
            <NiceActionButton
              item={rowData}
              size="small"
              fontSize="small"
              color="primary"
              icon="edit"
              title={t('general.button.edit')}
              onSelect={(rowData) => {
                this.props.history.push(ConstantList.ROOT_PATH + "patient/create/" + rowData.id + "/" + this.state.page + "/" + this.state.rowsPerPage);
                // getById(rowData.id).then(({ data }) => {
                //   if (data.parent === null) {
                //     data.parent = {};
                //   }
                //   this.handleEditItem(data);
                //   console.log(data);
                // })
              }}
            />
            <NiceActionButton
              item={rowData}
              size="small"
              fontSize="small"
              color="info"
              icon="picture_as_pdf"
              title={t('general.button.viewPDF')}
              onSelect={(rowData) => {
                this.setState({ shouldOpenGetPrint: true,id:rowData.id })
              }}
            />
            <NiceActionButton
              item={rowData}
              size="small"
              fontSize="small"
              color="secondary"
              icon="account_box"
              title="Xem"
              onSelect={(rowData) => {
                this.handlePatientIncident(rowData);
              }}
            />
            <NiceActionButton
              item={rowData}
              size="small"
              fontSize="small"
              color="error"
              icon="delete"
              title={t('general.button.delete')}
              onSelect={(rowData) => {
                this.handleDelete(rowData.id);
              }}
            />
          </>
      },
    ];
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t('Danh sách bệnh nhân') }]} />
        </div>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <>
              {/* <Button
                className="mb-16 mr-16 btn btn-success d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  this.handleEditItem({ startDate: new Date(), endDate: new Date() });
                }
                }
              >
                {t('general.button.add')}
              </Button>
              <Button
                className="mb-16 mr-36 btn btn-warning d-inline-flex"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => this.setState({ shouldOpenConfirmationDeleteListDialog: true })}>
                {t('general.button.delete')}
              </Button> */}
              {shouldOpenConfirmationDeleteListDialog && (
                <ConfirmationDialog
                  open={shouldOpenConfirmationDeleteListDialog}
                  onConfirmDialogClose={this.handleClose}
                  onYesClick={this.handleDeleteListItem}
                  title={t("confirm_dialog.delete_list.title")}
                  text={t('confirm_dialog.delete_list.text')}
                  agree={t("confirm_dialog.delete_list.agree")}
                  cancel={t("confirm_dialog.delete_list.cancel")}
                />
              )}
            </>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Autocomplete

              options={listHealthOrg ? listHealthOrg : []}
              value={healthOrg ? healthOrg : null}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => this.selectHealthOrg(value)}
              renderInput={(params) => <TextField {...params}
                label={
                  <span>
                    {t("Lọc theo đơn vị điều trị")}
                  </span>
                } size="small" variant="outlined" />}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SearchInput
              search={this.updatePageData}
              t={t}
            />
          </Grid>
          <Grid item xs={12}>
            {/* {shouldOpenEditorDialog && (
              <EthnicityEditorDialog t={t} i18n={i18n}
                handleClose={this.handleClose}
                open={shouldOpenEditorDialog}
                item={this.state.item ? this.state.item : {}}
              />
            )} */}
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={this.handleClose}
                onYesClick={this.handleConfirmDeleteItem}
                title={t("confirm_dialog.delete.title")}
                text={t('confirm_dialog.delete.text')}
                agree={t("confirm_dialog.delete.agree")}
                cancel={t("confirm_dialog.delete.cancel")}
              />
            )}

            {shouldOpenGetPrint && (
              <PatienPrint
                t={t}
                open={shouldOpenGetPrint}
                id={id}
                handleClose={this.handleClose}
              />
            )}



            <NiceTable
              itemList={itemList}
              t={t}
              columns={columns}
              totalPages={this.state.totalPages}
              handleChangePage={this.handleChangePage}
              setRowsPerPage={this.setRowsPerPage}
              options={{ sorting: true }}
              pageSize={this.state.rowsPerPage}
              pageSizeOption={[2, 5, 10, 25, 50, 100]}
              totalElements={this.state.totalElements}
              page={this.state.page}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PatientTable;