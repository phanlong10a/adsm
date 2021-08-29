import React from "react";
import {
    Button,
    Grid,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTable, { MTableToolbar } from "material-table";
import NiceDatePicker from '../../Component/Form/NiceDatePicker';
import NiceAutocomplete from "app/views/Component/Form/NiceAutocomplete";
import AddIcon from '@material-ui/icons/Add';
import NiceTextField from "app/views/Component/Form/NiceTextField";
import NiceActionButton from '../../Component/Table/NiceActionButton';
import viLocale from "date-fns/locale/vi"
import './DynamicTableStyles.css';
const useStyles = makeStyles((theme) => ({

}));
export default function TBDrugs(props) {
    const classes = useStyles();

    const {
        t,
        formik,
        listDrug,
        disabled
    } = props;

    const columns = [
        {
            title: t("Tên thuốc"),
            field: "name",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                <Autocomplete
                    id="drug-id"
                    options={listDrug ? listDrug : []}
                    value={rowData.drug}
                    getOptionLabel={(option) => option.name}
                    onChange={(even, value) => handleChangeDrug(rowData.tableData.id, value)}
                    disabled={disabled ? disabled : false}
                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
                />
                // <NiceAutocomplete
                //     isCollapse={true}
                //     collapseNode="tbDrugs"
                //     collapseIndex={rowData.tableData.id}
                //     formik={formik}
                //     field="drug"
                //     options={listDrug ? listDrug : []}
                //     size="small"
                //     variant="outlined"
                // />
            ),
        },
        {
            title: t("Liều/ngày"),
            field: "doseInDay",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.doseInDay}
                    className="w-100"
                    name="doseInDay"
                    onChange={(event) => handleChange(rowData.tableData.id, event)}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
                // <NiceTextField
                //     formik={formik}
                //     isCollapse={true}
                //     collapseNode="tbDrugs"
                //     collapseIndex={rowData.tableData.id}
                //     field="doseInDay"
                //     size="small"
                //     type="number"
                //     variant="outlined"
                // />
            ),
        },
        {
            title: t("Ngày/tuần"),
            field: "dayInWeek",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.dayInWeek}
                    className="w-100"
                    name="dayInWeek"
                    onChange={(event) => handleChange(rowData.tableData.id, event)}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
                // <NiceTextField
                //     formik={formik}
                //     isCollapse={true}
                //     collapseNode="tbDrugs"
                //     collapseIndex={rowData.tableData.id}
                //     field="dayInWeek"
                //     size="small"
                //     type="number"
                //     variant="outlined"
                // />
            ),
        },
        {
            title: t("Ngày bắt đầu"),
            field: "startDate",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                // <NiceDatePicker
                //     isCollapse={true}
                //     collapseNode="tbDrugs"
                //     collapseIndex={rowData.tableData.id}
                //     formik={formik}
                //     format={"dd/MM/yyyy"}
                //     field={"startDate"}
                //     size="small"
                //     inputVariant="outlined"
                // />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="startDate"
                        name="startDate"
                        autoOk
                        variant="inline"
                        openTo="year"
                        views={["year", "month","date"]}
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        disabled={disabled ? disabled : false}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "startDate")}
                        value={rowData.startDate ? rowData.startDate : null}
                        disableFuture={true}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage ={t("general.invalidDateMessage")}
                    />
                </MuiPickersUtilsProvider>
            ),
        },
        {
            title: "",
            field: "custom",
            // align: "center",
            width: "10%",
            headerStyle: {
                padding: "0px",
            },
            cellStyle: {
                padding: "0px",
            },
            render: (rowData) => (

                <NiceActionButton
                    item={rowData}
                    size="small"
                    fontSize="small"
                    color="error"
                    icon="delete"
                    title={t('general.button.delete')}
                    disabled={disabled ? disabled : false}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleRemoveRow(rowData.tableData.id);
                        }
                    }}
                />
            ),
        },
    ];

    const [tbDrugs, setTbDrugs] = React.useState(formik.values.tbDrugs);

    const handleAddRow = () => {
        let list = [];
        list = tbDrugs;
        list.push({ drug: null });

        setTbDrugs(list);
        formik.setFieldValue("tbDrugs", tbDrugs);

    }
    const handleRemoveRow = (rowId) => {
        console.log(rowId);
        let list = [];
        list = tbDrugs;
        list.splice(rowId, 1);
        setTbDrugs(list);
        formik.setFieldValue("tbDrugs", tbDrugs);
        console.log(formik)
    }

    const handleChangeDrug = (index, event) => {
        let listData = formik.values.tbDrugs;
        if (listData == null) {
            listData = []
        }
        listData[index].drug = event;
        formik.setFieldValue("tbDrugs", listData);
    }
    const handleChange = (index, event) => {
        let tbDrugs = formik.values.tbDrugs;
        if (tbDrugs == null) {
            tbDrugs = []
        }
        tbDrugs[index][event.target.name] = event.target.value;
        formik.setFieldValue("tbDrugs", tbDrugs);
    }

    const handleChangeDate = (index, date, field) => {
        console.log(date)
        let tbDrugs = formik.values.tbDrugs;
        if (tbDrugs == null) {
            tbDrugs = []
        }
        tbDrugs[index][field] = date;
        formik.setFieldValue("tbDrugs", tbDrugs);
        console.log(formik.values.tbDrugs)
    }

    React.useEffect(() => {
        if (typeof formik.values.tbDrugs === "undefined"
            || formik.values.tbDrugs == null
            || formik.values.tbDrugs.length == 0) {
            handleAddRow();
        }

    }, [tbDrugs])


    return (
        <Grid item md={12} className="dynamic-table">
            <Button
                className="mb-16 mr-16 btn btn-success d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                disabled={disabled ? disabled : false}
                onClick={() => {
                    handleAddRow()
                }
                }
            >
                {t('general.button.add')}
            </Button>
            <MaterialTable
                data={formik.values.tbDrugs}
                columns={columns}
                // className="dynamic-table"
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
                    headerStyle: {
                        backgroundColor: "#2a80c8",
                        color: "#fff",
                    },
                    rowStyle: (rowData, index) => ({
                        backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
                    }),
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
        </Grid>
    )
}