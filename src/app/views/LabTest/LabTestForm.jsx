import React from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import NiceTextFiend from "../Component/Form/NiceTextField";

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    gridContainerForm: {
        maxHeight: '100vh',
        overflowY: 'auto',
        // padding: '0 20px 20px 20px !important',
        marginBottom: 10,
        borderBottom: `1px solid ${theme.palette.myTextColor?.textIcon}`
    },
    textField: {
        width: '99%',
        margin: '10px 0px !important',
    },
}));

export default function LabTestForm(props) {

    const classes = useStyles();

    const { initialValues, handleSubmit, handleClose, readOnly } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({

    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });
    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                <div className="dialog-body">
                    <DialogContent className="o-hidden">
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="STT"
                                    field="orderNumber"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Mã xét nghiệm"
                                    field="code"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Tên xét nghiệm"
                                    field="name"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Mô tả"
                                    field="description"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Loại xét nghiệm"
                                    field="labTestType"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                    type="number"
                                />
                            </Grid> */}
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Giá trị lúc bình thường (bằng số)"
                                    field="normalNumberResult"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                    type="number"
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Giá trị lúc bình thường (bằng chữ)"
                                    field="normalStringResult"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid> */}
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Giá trị trung bình"
                                    field="averageNumberResult"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                    type="number"
                                />
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
                                onClick={() => handleClose()}
                            >
                                {t("general.button.cancel")}
                            </Button>
                            {!readOnly &&
                                <Button
                                    startIcon={<SaveIcon />}
                                    className="mr-0 btn btn-success d-inline-flex"
                                    variant="contained"
                                    color="primary"
                                    type="submit">
                                    {t("general.button.save")}
                                </Button>}
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}