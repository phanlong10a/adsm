import React from "react";
import {
    TextField,
    Grid,
    Button
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NiceAutocomplete from "app/views/Component/Form/NiceAutocomplete";
import AddIcon from '@material-ui/icons/Add';
import NiceTextField from "app/views/Component/Form/NiceTextField";
import Checkbox from '@material-ui/core/Checkbox';
import NiceActionButton from '../../Component/Table/NiceActionButton';
import NiceCheckbox from '../../Component/Form/NiceCheckbox';
import './DynamicTableStyles.css';


export default function DrugHistory(props) {

    const {
        t,
        formik,
        listDrug,
        disabled
    } = props;

    // const [rowData, setRowData] = React.useState([])

    // const [item, setItem] = React.useState(props.item)

    // const [shouldChangeColorRemoveIcon, setChangeColorRemoveIcon] = React.useState(false)

    // const [shouldDisableRemoveIcon, setDisableRemoveIcon] = React.useState(false)

    // const [selected, setSelected] = React.useState([props.item])

    // const [inUsed, setIsUsed] = React.useState([props.item])


    const columns = [
        {
            title: t("Tên thuốc"),
            field: "name",
            align: "center",
            width: "100%",
            headerStyle: {
                padding: "0px",
                minWidth: "200px"
            },
            cellStyle: {
                padding: "0px",
                minWidth: "200px"
            },
            render: (rowData) => (
                <Autocomplete
                    id="drug-id"
                    options={listDrug ? listDrug : []}
                    value={rowData.drug}
                    getOptionLabel={(option) => option.name}
                    onChange={(even, value) => handleChangeDrug(rowData.tableData.id, value)}
                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
                    disabled={disabled ? disabled : false}
                />
                // <NiceAutocomplete
                //     isCollapse={true}
                //     collapseNode="drugHistories"
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
            title: t("Liều dùng"),
            field: "dosage",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.dosage}
                    className="w-100"
                    name="dosage"
                    onChange={(event) => handleChange(rowData.tableData.id, event)}
                    type="number"
                    variant="outlined"
                    size="small"
                   disabled={disabled ? disabled : false}
                />
                // <NiceTextField
                //     formik={formik}
                //     isCollapse={true}
                //     collapseNode="drugHistories"
                //     collapseIndex={rowData.tableData.id}
                //     field="dosage"
                //     size="small"
                //     type="number"
                //     variant="outlined"
                // />
            ),
        }, {
            title: t("Đường dùng"),
            field: "drugRoute",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.drugRoute}
                    className="w-100"
                    name="drugRoute"
                    onChange={(event) => handleChange(rowData.tableData.id, event)}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
                // <NiceTextField
                //     formik={formik}
                //     isCollapse={true}
                //     collapseNode="drugHistories"
                //     collapseIndex={rowData.tableData.id}
                //     field="drugRoute"
                //     size="small"
                //     type="text"
                //     variant="outlined"
                // />
            ),
        },
        {
            title: t("Đang dùng"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) =>
                <FormControlLabel
                    control={<Checkbox value={rowData.inUsed} disabled={disabled ? disabled : false} checked={rowData.inUsed} onChange={(e) => handleClick(e, rowData.tableData.id)} name="checkedA" />}
                />
                // <NiceCheckbox
                //     formik={formik}
                //     field="inUsed"
                //     isCollapse={true}
                //     collapseNode="drugHistories"
                //     collapseIndex={rowData.tableData.id}
                // />
        },
        {
            title: "",
            field: "custom",
            align: "center",
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

    const [drugHistories, setDrugHistories] = React.useState(formik.values.drugHistories);

    const handleAddRow = () => {
        let list = [];
        list = drugHistories;
        list.push({
            inUsed: false
        });
        setDrugHistories(list);
        // setDisableRemoveIcon(false);
        // setChangeColorRemoveIcon(false);
        formik.setFieldValue("drugHistories", list);
        console.log(formik.values.drugHistories);;

    }
    const handleRemoveRow = (rowId) => {
        let list = [];
        list = drugHistories;
        list.splice(rowId, 1);
        setDrugHistories(drugHistories);
        formik.setFieldValue("drugHistories", list);
    }

    const handleClick = (event, item) => {
        console.log(event, item)
        let listData = formik.values.drugHistories;
        listData[item].inUsed = event.target.checked

        formik.setFieldValue("drugHistories", listData)
    }

    const handleChangeDrug = (index, event) => {
        let listData = formik.values.drugHistories;
        if (listData == null) {
            listData = []
        }
        listData[index].drug = event;
        formik.setFieldValue("drugHistories", listData);
    }
    const handleChange = (index, event) => {
        let drugHistories = formik.values.drugHistories;
        if (drugHistories == null) {
            drugHistories = []
        }
        drugHistories[index][event.target.name] = event.target.value;
        formik.setFieldValue("drugHistories", drugHistories);
    }

    React.useEffect(() => {
        if (typeof formik.values.drugHistories === "undefined"
            || formik.values.drugHistories == null
            || formik.values.drugHistories.length == 0) {
            handleAddRow();
        }
    }, [drugHistories])

    return (
        <>
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
                    data={formik.values.drugHistories}
                    columns={columns}
                    className="w-100"
                    disabled={disabled ? disabled : false}
                    options={{
                        toolbar: false,
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
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


        </>
    )
}