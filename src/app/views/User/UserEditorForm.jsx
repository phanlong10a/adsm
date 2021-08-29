import React from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import { Link } from "react-router-dom";
import NiceSelect from '../Component/Form/NiceSelect';
import NiceAutocomplete from '../Component/Form/NiceAutocomplete';
import 'styles/globitsStyles.css';
import InputPopupHealthOrg from '../HealthOrg/InputPopup/InputPopup';
import ChangePassWordAccordion from './ChangePassWordAccordion';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    gridContainerForm: {
        marginBottom: 10,
        borderBottom: `1px solid ${theme.palette.myTextColor?.textIcon}`
    },
    textField: {
        width: '100%',
        backgroundColor: '#fff',
    },
    select: {
        width: '100%',
        backgroundColor: '#fff',
    },
}));

export default function UserProfileForm(props) {

    const classes = useStyles();

    const { initialValues, handleSubmit, listGender, listRole, listOrg, handleChangePassWord, isAddNew, handleClose } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Tên hiện thị không được để trống").max(90, 'Tên hiển thị quá dài'),
        gender: Yup.string().required("Giới tính không được để trống").typeError('Chưa chọn giới tính'),
        username: Yup.string().required("Tên đăng nhập không được để trống").min(6, 'Tên đăng nhập phải lớn hơn 6 ký tự').max(30, 'Tên đăng nhập quá dài'),
        email: Yup.string().email("Email chưa đúng định dạng").required("Email không được để trống"),
        roles: Yup.array().min(1, "Cần ít nhất 1 quyền").required("Vai trò không được để trống").typeError('Chưa chọn quyền'),
        org: Yup.object().required('Chưa chọn đơn vị y tế').typeError('Chưa chọn đơn vị y tế'),
        // password: Yup.string().required("Chưa nhập mật khẩu").min(6, 'Too short'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu chưa trùng khớp')
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

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                <div className="dialog-body">
                    <DialogContent className="o-hidden">
                        <Grid container className={classes.gridContainerForm} spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="displayName"
                                    type="text"
                                    label={t('user.display_name')}
                                    variant="outlined"
                                    value={formik.values.displayName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                                    helperText={formik.touched.displayName && formik.errors.displayName}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormControl fullWidth={true} variant="outlined" size="small">
                                    <InputLabel htmlFor="gender-simple">
                                        {
                                            <span className="font">
                                                <span style={{ color: "red" }}>*</span>
                                                {t("user.gender")}
                                            </span>
                                        }
                                    </InputLabel>
                                    <Select
                                        label={<span className="font">
                                            <span style={{ color: "red" }}>*</span>
                                            {t("user.gender")}
                                        </span>}
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        inputProps={{
                                            name: "gender",
                                            id: "gender-simple",
                                        }}
                                    >
                                        {listGender.map((item) => {
                                            return (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="username"
                                    type="text"
                                    label={t('user.username')}
                                    variant="outlined"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="email"
                                    type="email"
                                    label={t('user.email')}
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <NiceAutocomplete
                                    formik={formik}
                                    multiple
                                    field="roles"
                                    label={t("user.role.title")}
                                    options={listRole ? listRole : []}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <InputPopupHealthOrg
                                    label={t("user.org.title")}
                                    formik={formik}
                                    field="org"
                                    variant="outlined"
                                    size="small"
                                    tree="true"
                                    required
                                />

                            </Grid>
                            {!isAddNew && <Grid item xs={12}> <ChangePassWordAccordion
                                t={t}
                                formik={formik}
                            /> </Grid>}
                            {isAddNew &&
                                <>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label={t('user.password')}
                                            variant="outlined"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="password"
                                            name="confirmPassword"
                                            label={t('user.re_password')}
                                            variant="outlined"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        />
                                    </Grid>
                                </>
                            }
                            <Grid item >
                                <FormControlLabel
                                    value={formik.values.active}
                                    className="mb-16"
                                    name="active"
                                    onChange={formik.handleChange}
                                    control={<Checkbox checked={formik.values.active} />}
                                    label={t("user.active")}
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
                                // color="secondary"
                                onClick={() => handleClose()}
                            >
                                {t("general.button.cancel")}
                            </Button>
                            <Button
                                startIcon={<SaveIcon />}
                                className="mr-0 btn btn-success d-inline-flex"
                                variant="contained"
                                // color="primary"
                                type="submit">
                                {t("general.button.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}