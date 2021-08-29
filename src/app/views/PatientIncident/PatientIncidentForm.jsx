import React, { useEffect } from 'react';
import {
    makeStyles,
    DialogActions,
    Button,
    DialogContent,
    Grid,
    TextField
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import TabPatientIncident from './TabPatientIncident';
import { ConfirmationDialog } from "egret";
import NiceTextField from '../Component/Form/NiceTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NiceDatePicker from '../Component/Form/NiceDatePicker';
import PatientConst from "../Patient/Const";
import PatientIncidentSelectTypeReport from '../Component/Form/PatientIncidentSelectTypeReport';
import InputPopupHealthOrg from '../HealthOrg/InputPopup/InputPopup';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff"
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
        listDrugs,
        listLabTest,
        readOnly
    } = props;

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
                <div>
                    <DialogContent className="o-hidden">
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <fieldset>
                                    <legend>{t('THÔNG TIN BỆNH NHÂN')}</legend>
                                    <Grid container spacing={2} className={classes.root} style={{marginTop: "4px"}}>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                field="displayName"
                                                size="small"
                                                label={<span className="font">
                                                {t("Họ và tên")}
                                            </span>}
                                                variant="outlined"
                                                required={true}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                field="patientCode"
                                                size="small"
                                                label={"Mã số bệnh nhân"}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                field="eTBCode"
                                                size="small"
                                                label={"Số eTB"}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} sm={6} xs={12}>
                                            <InputPopupHealthOrg
                                                label={t("Cơ sở điều trị")}
                                                formik={formik}
                                                field="healthOrg"
                                                variant="outlined"
                                                size="small"
                                                tree="true"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceDatePicker
                                                formik={formik}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                label={t('hiv_case.birth_date')}
                                                format={"dd/MM/yyyy"}
                                                field={"birthDate"}
                                                inputVariant="outlined"
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <Autocomplete
                                                disabled
                                                value={formik.values.patient.gender}
                                                id="gender"
                                                name="gender"
                                                onChange={(even, value) => {
                                                    formik.setFieldValue("gender", value);
                                                }}
                                                options={(PatientConst.listGender ? PatientConst.listGender : []).map(option => option.code)}
                                                getOptionLabel={(optionId) =>
                                                    (PatientConst.listGender ? PatientConst.listGender : []).filter(option => option.code === optionId)[0]?.display
                                                }
                                                filterSelectedOptions
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        variant="outlined"
                                                        label="Giới tính"
                                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                                        helperText={formik.touched.gender && formik.errors.gender}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                field="height"
                                                size="small"
                                                label={"Chiều cao (cm)"}
                                                variant="outlined"
                                                type="number"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={6} sm={6}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                isCollapse={true}
                                                collapseNode="patient"
                                                field="weight"
                                                size="small"
                                                label={"Cân nặng (kg)"}
                                                variant="outlined"
                                                type="number"
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                </fieldset>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TabPatientIncident
                                    id={id}
                                    formik={formik}
                                    listDrugs={listDrugs}
                                    listLabTest={listLabTest}
                                    disabled={readOnly ? readOnly : false}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <fieldset>
                                    <legend>{t('THÔNG TIN NGƯỜI BÁO CÁO')}</legend>
                                    <Grid container spacing={2} className={classes.root} style={{marginTop: "4px"}}>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                field="reportBy"
                                                size="small"
                                                label={<span className="font">
                                                    {t("Họ và tên")}
                                                </span>}
                                                variant="outlined"
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                field="reporterTitle"
                                                size="small"
                                                label={t("Nghề nghiệp/Chức vụ")}
                                                variant="outlined"
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                field="reporterPhoneNumber"
                                                size="small"
                                                label={t("Điện thoại liên lạc")}
                                                variant="outlined"
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <NiceTextField 
                                                formik={formik}
                                                classes={classes}
                                                field="reporterEmail"
                                                size="small"
                                                label={t("Email")}
                                                variant="outlined"
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <PatientIncidentSelectTypeReport 
                                                formik={formik}
                                                field="reportType"
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <NiceDatePicker
                                                formik={formik}
                                                label={t("Ngày báo cáo")}
                                                format={"dd/MM/yyyy"}
                                                field={"reportDate"}
                                                inputVariant="outlined"
                                                size="small"
                                                disableFuture={true}
                                                maxDateMessage={t("general.maxDateMessage")}
                                                invalidDateMessage ={t("general.invalidDateMessage")}
                                                disabled={readOnly ? readOnly : false}
                                            />
                                        </Grid>
                                    </Grid>
                                </fieldset>
                            </Grid>
                        </Grid>
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
                                type="submit"
                                disabled = {readOnly ? readOnly : false}>
                                {t("general.button.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    )
}