import React, { useEffect } from 'react';
import {
    makeStyles,
    DialogActions,
    Button,
    DialogContent,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import TabPatient from './TabPatient';
import { ConfirmationDialog } from "egret";
const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    textField: {
        width: '100%',
    }
}));


export default function PatientForm(props) {
    const classes = useStyles();

    const {
        id,
        initialValues,
        handleSubmit,
        handleClose,
        pageIndex,
        pageSize,
        history,
        listLabTest,
        listDrug,
        readOnly
    } = props;

    // console.log(id)
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        // code: Yup.string().required(),
        // name: Yup.string().required(),
        // birthDate: Yup.string().required()

    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
            // console.log(values)
        }
    });

    const [shouldOpenConfirmationDeleteListDialog, setShouldOpenConfirmationDeleteListDialog] = React.useState(false);

    const handleConfirmCloseOpen = () => {
        setShouldOpenConfirmationDeleteListDialog(true);
    };

    const handleConfirmClose = () => {
        setShouldOpenConfirmationDeleteListDialog(false);
    };

    return (
        <div className={classes.root}>
            {shouldOpenConfirmationDeleteListDialog && (
                <ConfirmationDialog
                    open={shouldOpenConfirmationDeleteListDialog}
                    onConfirmDialogClose={handleConfirmClose}
                    onYesClick={() => {
                        handleClose(history, pageIndex, pageSize);
                    }}
                    title={t("confirm_dialog.confirm_close.title")}
                    text={t('confirm_dialog.confirm_close.text')}
                    agree={t("confirm_dialog.confirm_close.agree")}
                    cancel={t("confirm_dialog.confirm_close.cancel")}
                />
            )}
            <form onSubmit={formik.handleSubmit}>
                <div className="">
                    <DialogContent className="o-hidden">   
                        <TabPatient
                            id={id}
                            formik={formik}
                            listLabTest={listLabTest}
                            listDrug = {listDrug}
                            history={history}
                            disabled={readOnly ? readOnly : false}
                        />
                    </DialogContent>
                </div>
                <div className="dialog-footer">
                    <DialogActions className="p-0">
                        <div className="flex flex-space-between flex-middle">
                            <Button
                                startIcon={<BlockIcon />}
                                variant="contained"
                                className="mr-12 btn btn-secondary d-inline-flex"
                                color="secondary"
                                onClick={handleConfirmCloseOpen}
                            >
                                {t("general.button.cancel")}
                            </Button>
                            <Button
                                startIcon={<SaveIcon />}
                                className="mr-0 btn btn-success d-inline-flex"
                                variant="contained"
                                color="primary"
                                disabled={props.adding}
                                type="submit"
                                disabled={readOnly ? readOnly : false}>
                                
                                {t("general.button.save")}
                               
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    )
}