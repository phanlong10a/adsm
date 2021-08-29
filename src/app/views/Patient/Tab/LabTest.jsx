import React, { useEffect, useState } from 'react';
import {
    Grid,
    TableHead,
    TableCell,
    Table,
    TableBody,
    TableRow,
    makeStyles,
    withStyles,
    TextField,
    FormLabel,
    Checkbox
} from '@material-ui/core';
import DobInput from '../../Component/Form/DobInput';
import NameInput from '../../Component/Form/NameInput';
import NiceTextField from '../../Component/Form/NiceTextField';
import NiceAutocomplete from '../../Component/Form/NiceAutocomplete';
import Autocomplete from "@material-ui/lab/Autocomplete";
import NiceCheckbox from '../../Component/Form/NiceCheckbox';
import Const from '../Const';
import NiceDatePicker from 'app/views/Component/Form/NiceDatePicker';
import MaterialTable, { MTableToolbar } from 'material-table';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function LabTest(props) {
    const {
        t,
        formik,
        listLabTest,
        disabled
    } = props;

    const [patientLabtestResults, setPatientLabtestResults] = React.useState(formik.values.patientLabtestResults);

    const handleChangeNumberResult = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = []
        }
        patientLabtestResults[index].numberResult = event.target.value;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    }

    const handleChangeCheckIsExtraordinary = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = []
        }
        patientLabtestResults[index].isExtraordinary = event.target.checked;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    }

    const handleChangeNormalNumberResult = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = []
        }
        patientLabtestResults[index].normalNumberResult = event.target.value;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    }

    const handleChangeDate = (code, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = []
        }
        patientLabtestResults[code].testedDate = event;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    };

    const handleChangeOtherLabTestName = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = []
        }
        patientLabtestResults[index].otherLabTestName = event.target.value;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    }
    const columns = [
        {
            title: "Tên xét nghiệm",
            field: "labTest.name",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <TextField
                    value={rowData.labTest && rowData.labTest.name ? rowData.labTest.name : rowData.otherLabTestName}
                    className="w-100 mt-10"
                    name="name"
                    label={
                        !rowData.labTest ?
                            "Khác, cụ thể" : ""
                    }
                    disabled={formik.values.patientLabtestResults.length - 1 != rowData.tableData.id}
                    onChange={(event) => handleChangeOtherLabTestName(rowData.tableData.id, event)}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: "Kết quả",
            field: "numberResult",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <NiceTextField
                    formik={formik}
                    isCollapse={true}
                    collapseNode="patientLabtestResults"
                    collapseIndex={rowData.tableData.id}
                    field="numberResult"
                    size="small"
                    type="number"
                    variant="outlined"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: "GT Bình thường",
            field: "normalNumberResult",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <TextField
                    value={rowData.normalNumberResult ? rowData.normalNumberResult : rowData.labTest && rowData.labTest.normalNumberResult}
                    className="w-100 mt-10"
                    name="normalNumberResult"
                    onChange={(event) => handleChangeNormalNumberResult(rowData.tableData.id, event)}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },

        {
            title: "Ngày XN",
            field: "testedDate",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <NiceDatePicker
                    isCollapse={true}
                    collapseNode="patientLabtestResults"
                    collapseIndex={rowData.tableData.id}
                    formik={formik}
                    format={"dd/MM/yyyy"}
                    field={"testedDate"}
                    size="small"
                    inputVariant="outlined"
                    disableFuture={true}
                    maxDateMessage={t("general.maxDateMessage")}
                    invalidDateMessage={t("general.invalidDateMessage")}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: "GT bất thường",
            field: "isExtraordinary",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <Checkbox
                    disabled={disabled ? disabled : false}
                    value={rowData.isExtraordinary}
                    checked={rowData.isExtraordinary}
                    className="mt-10"
                    name="isExtraordinary"
                    onChange={(event) => handleChangeCheckIsExtraordinary(rowData.tableData.id, event)}
                />
            ),
        },
    ];

    const handleAddRow = (rowId) => {
        console.log(rowId)
        let list = [];
        if (listLabTest && listLabTest.length > 0) {
            listLabTest.forEach(element => {
                let p = {}
                p.labTest = element;
                list.push(p);
            });
        }

        list.push({
            labTest: null,
        });

        setPatientLabtestResults(list);
        formik.setFieldValue("patientLabtestResults", list);
    }

    React.useEffect(() => {
        if (typeof formik.values.patientLabtestResults === "undefined"
            || formik.values.patientLabtestResults == null
            || formik.values.patientLabtestResults.length == 0) {
            handleAddRow(null);
        } else {
            // formik.values.patientLabtestResults.push({
            //     labTest: null,
            // });
            // handleAddRow(null);
            setPatientLabtestResults(formik.values.patientLabtestResults);
        }
    }, [patientLabtestResults])

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Grid container spacing={2}>
                    <MaterialTable
                        data={formik.values.patientLabtestResults}
                        columns={columns}
                        className="w-100"
                        disabled={disabled ? disabled : false}
                        options={{
                            toolbar: false,
                            selection: false,
                            actionsColumnIndex: -1,
                            paging: false,
                            search: false,
                            tableLayout: "fixed",
                            padding: "dense",
                            border: "none",
                            cellStyle: { border: "none" },
                            headerStyle: { border: "none", fontSize: "15px" },
                        }}
                        components={{
                            Toolbar: (props) => (
                                <div style={{ textHeader: "center" }}>
                                    <MTableToolbar {...props} />
                                </div>
                            ),
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
                            },
                        }}

                    />
                    <Grid item md={6} sm={6} xs={6} style={{ marginTop: "12px" }}>
                        <Grid container spacing={2} style={{ alignItems: "center" }}>
                            <Grid item md={4} sm={4} xs={4}>
                                <span style={{ fontWeight: "bold" }}>Đo thính lực: </span>
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="hearingLeft"
                                    size="small"
                                    label={"Tai trái"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="hearingRight"
                                    size="small"
                                    label={"Tai phải"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6} style={{ marginTop: "12px" }}>
                        <Grid container spacing={2} style={{ alignItems: "center" }}>
                            <Grid item md={4} sm={4} xs={4}>
                                <span style={{ fontWeight: "bold" }}>Đo thị lực: </span>
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="eyeSightLeft"
                                    size="small"
                                    label={"Mắt trái"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="eyeSightRight"
                                    size="small"
                                    label={"Mắt phải"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="qtc"
                            size="small"
                            label={"Khoảng QT/QTc (ms)"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="qTcF"
                            size="small"
                            type="number"
                            label={"Khoảng QTcF (ms)"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="heartbeat"
                            type="number"
                            size="small"
                            label={"Nhịp tim"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="otherTest"
                            size="small"
                            label={"Khác"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}