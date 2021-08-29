import React from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent,
    FormControl,
    Select,
    MenuItem,InputLabel
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    textField: {
        width: '100%',
        margin: '10px 0px !important',
    },
}));
export default function DrugsForm(props) {
    const classes = useStyles();

    const { initialValues, handleSubmit, handleClose, readOnly } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        code: Yup.string().required(),
        name: Yup.string().required(),
        dosageForm: Yup.string().required(),
        drugContent: Yup.string().required()
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
                                <TextField
                                    disabled={readOnly}
                                    required
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
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    disabled={readOnly}
                                    required
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
                                    required
                                    classes={{ root: classes.textField }}
                                    id="drugContent"
                                    size="small"
                                    name="drugContent"
                                    label={t('Hàm lượng')}
                                    variant="outlined"
                                    placeholder="Đơn vị tính bằng miligram"
                                    type="text"
                                    value={formik.values.drugContent}
                                    onChange={formik.handleChange}
                                    error={formik.touched.drugContent && Boolean(formik.errors.drugContent)}
                                    helperText={formik.touched.drugContent && formik.errors.drugContent}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <FormControl fullWidth={true} variant="outlined" size="small" className={classes.formControl}>
                                    <InputLabel htmlFor="dosage-simple">Dạng điều chế *</InputLabel>
                                    <Select
                                        label="Dạng điều chế *"
                                        value={formik.values.dosageForm}
                                        onChange={formik.handleChange}
                                        inputProps={{
                                            name: "dosageForm",
                                            id: "dosage-simple",
                                        }}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="Viên">Viên</MenuItem>
                                        <MenuItem value="Viên kết hợp">Viên kết hợp</MenuItem>
                                        <MenuItem value="Gói">Gói</MenuItem>
                                        <MenuItem value="Lọ">Lọ</MenuItem>  
                                    </Select>
                                </FormControl>
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