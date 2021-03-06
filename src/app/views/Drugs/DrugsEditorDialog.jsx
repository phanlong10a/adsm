import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Icon,
  IconButton
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addNew, update, checkCode } from "./DrugsService";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import Autocomplete from "@material-ui/lab/Autocomplete";
import DrugsForm from './DrugsForm';

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3
});

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class DrugsEditorDialog extends Component {
  state = {
    id: null,
    name: "",
    code: "",
    level: 0,
    parent: null,
    listDrugs: [],
    isActive: false,
    loading: false
  };

  // handleChange = (event, source) => {
  //   event.persist();
  //   if (source === "switch") {
  //     this.setState({ isActive: event.target.checked });
  //     return;
  //   }
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // selectDrugs = (event, item) => {
  //   this.setState({ parent: item ? item : null, parentId: item ? item.id : null });
  // }

  handleFormSubmit = async (values) => {
    // await this.openCircularProgress();
    let { id } = this.state;
    let { t } = this.props;
    let obj = {}
    obj.id = id;
    obj.code = values.code;
    obj.name = values.name;
    obj.drugContent = values.drugContent;
    obj.dosageForm = values.dosageForm;
    obj.parent = values.parent;
    obj.parentId = values.parent ? values.parent.id : null;
    checkCode(obj).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        toast.warning(t('toast.duplicate_code'));
        this.setState({ loading: false })
      } else {
        if (id) {
          update(obj).then(() => {
            toast.success(t('toast.update_success'));
            this.setState({ loading: false })
            this.props.handleClose()
            
          });
        } else {
          addNew(obj).then((response) => {
            if (response.data != null && response.status === 200) {
              this.state.id = response.data.id
              this.setState({ ...this.state, loading: false })
              toast.success(t('toast.add_success'));
              this.props.handleClose()
            }
          });
        }
      }
    });
  };
  componentWillUnmount() {
    this.props.updatePageData();
  }

  componentDidMount() {
  }

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose, item } = this.props;
    this.setState({ ...item });
  }

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n, readOnly } = this.props;
    let {
      id,
      name,
      code,
      dosageForm,
      drugContent,
      level,
      parent,
      listDrugs,
      isActive,
      loading
    } = this.state;
    return (
      <Dialog
        className="dialog-container"
        open={open}
        PaperComponent={PaperComponent}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          className="dialog-header bgc-primary-d1"
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
        >
          <span className="mb-20 text-white" > {(id ? t("general.button.edit") : t("general.button.add")) + " " + t("drugs.title")} </span>
          <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}>
            <Icon color="disabled" title={t("general.button.close")}>close</Icon>
          </IconButton>
        </DialogTitle>
        
        <DrugsForm
          initialValues={
            {
              code: code ? code : '',
              name: name ? name : '',
              dosageForm: dosageForm ? dosageForm: '',
              drugContent: drugContent ? drugContent: '', 
              parent: parent ? parent : null,
            }
          }
          handleSubmit={this.handleFormSubmit}
          handleClose={handleClose}
          readOnly={readOnly}
        />
      </Dialog>
    );
  }
}

export default DrugsEditorDialog;
