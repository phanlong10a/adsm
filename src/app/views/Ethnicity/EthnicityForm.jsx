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
        maxHeight: '68vh',
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

export default function EthnicityForm(props) {

    const classes = useStyles();

    const { initialValues, handleSubmit, handleClose, readOnly } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        code: Yup.string().required(),
        name: Yup.string().required()
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
                        <Grid container className={classes.gridContainerForm}>
                            <Grid item sm={12}>
                                {/* <TextField
                                    required
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="code"
                                    size="small"
                                    name="code"
                                    label={t('occupation.code')}
                                    variant="outlined"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.code && Boolean(formik.errors.code)}
                                    helperText={formik.touched.code && formik.errors.code}
                                /> */}
                                <NiceTextFiend
                                    required
                                    label={t('occupation.code')}
                                    field="code"
                                    size="small"
                                    variant="outline"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    required
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="name"
                                    size="small"
                                    name="name"
                                    label={t('occupation.name')}
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="description"
                                    size="small"
                                    name="description"
                                    label={t('occupation.description')}
                                    variant="outlined"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
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