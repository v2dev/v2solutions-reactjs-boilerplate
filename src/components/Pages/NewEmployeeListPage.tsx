import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid"
import { format } from "date-fns"
import useCrudApi from "../../hooks/useCrudApi"
import API_ENDPOINTS from "../../configs/apiConfig"
import EmployeeAddEditModal from "./EmployeeAddEditModal"
import DeleteEmployee from "./DeleteEmployeeDialog"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import { EmployeeActionType, IEmployeeFormFields } from "../../Models/employeeModel"
import Header from "../UI/Header/Header"
import Breadcrumb from "../UI/Breadcrumb/Breadcrumb"
import Footer from "../UI/Footer/Footer"
//import LinearProgress from '@mui/material/LinearProgress'; for DataGrid loading styling
import { batch, useDispatch, useSelector } from "react-redux"

const NewEmployeeListPage: React.FC = () => {
  let debounceTimeOut: NodeJS.Timeout = 0
  let waitTimeOut = 500

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [data, setData] = useState([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [exportGridData, setExportGridData] = useState(true)

  const { fetchData, deleteData } = useCrudApi(API_ENDPOINTS.EMPLOYEES)
  const [actionType, setActionType] = useState<EmployeeActionType>(
    EmployeeActionType.Add,
  )
  const [employees, setEmployees] = useState<IEmployeeFormFields>({
    _id: "",
    name: "",
    email: "",
    dob: "",
    designation: "",
    education: "",
  })
  const [open, setOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeId, setEmployeeId] = useState("")

  const fetchEmployees = async (page = 1, pageSize = 5, filterValue = "") => {
    setLoading(true)
    const response = await fetchData(
      `?page=${page}&limit=${pageSize}&sort=${"asc"}&sortedColumn=${"name"}&filter=${filterValue}`,
    )
    if (response && !response.error) {
      batch(() => {
        setData(response.data)
        setCurrentPage(page)
        setPageSize(pageSize)
        setRowCount(20)
        setLoading(false)
      })
    }
  }

  const handlePageChange = async (page, pageSize) =>
    await fetchEmployees(page, pageSize)

  const AddEmployee = () => {
    setActionType(EmployeeActionType.Add)
    setOpen(true)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    clearTimeout(debounceTimeOut)
    debounceTimeOut = setTimeout(async () => {
      console.log(e.target.value)
      await fetchEmployees(currentPage, pageSize, e.target.value as string)
    }, waitTimeOut)
  }

  const onEditButtonClick = (e, row) => {
    e.stopPropagation()
    setActionType(EmployeeActionType.Edit)
    setEmployees({
      _id: row._id,
      name: row.name,
      email: row.email,
      dob: row.dob,
      designation: row.designation,
      education: row.education,
    })
    setOpen(true)
  }
  const onDeleteButtonClick = (e, row) => {
    e.stopPropagation()
    setEmployeeId(row._id)
    setDeleteDialogOpen(true)
  }

  const handleModalClose = async (value) => {
    setOpen(value)
    await fetchEmployees(currentPage, pageSize)
  }

  const handleDeleteModalClose = async (value: boolean) => {
    console.log(value)
    setDeleteDialogOpen(value)
    await fetchEmployees(currentPage, pageSize)
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
      renderHeader: () => <strong>{"Name"}</strong>,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      renderHeader: () => <strong>{"Email"}</strong>,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "string",
      width: 250,
      renderHeader: () => (
        <strong>
          {"Birthday "}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
      ),
      // Add the valueFormatter to format the date
      valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"),
    },
    {
      field: "designation",
      headerName: "Designation",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      renderHeader: () => <strong>{"Designation"}</strong>,
    },
    {
      field: "education",
      headerName: "Education",
      width: 130,
      renderHeader: () => <strong>{"Designation"}</strong>,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      type: "actions",
      renderHeader: () => <strong>{"Actions"}</strong>,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={(e) => onEditButtonClick(e, params.row)}
          label="Edit"
          showInMenu={false}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={(e) => onDeleteButtonClick(e, params.row)}
          label="Delete"
          showInMenu={false}
        />,
      ],
    },
  ]

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector /> */}
        {exportGridData ? <GridToolbarExport /> : null}
      </GridToolbarContainer>
    )
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <div style={{ position: "relative", zIndex: 2 }}>
          {" "}
          <Header />
        </div>

        <div id="content" className="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Breadcrumb />
            </div>
          </nav>
          <Box
            sx={{
              width: "100%",
             
              overflow: "auto",
              padding: "10px",
              minHeight: "calc(100vh - 50px)",
              paddingBottom: "100px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <TextField
                  id="input-with-icon-textfield"
                  placeholder="Search"
                  onChange={(e) => handleInputChange(e)}
                  variant="standard"
                  type="search"
                  style={{ flex: "1" }}
                />
              </div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={() => AddEmployee()}
                >
                  Add New
                </Button>
              </div>
            </div>

            <DataGrid
              autoHeight
              rows={data}
              rowCount={rowCount}
              getRowId={(row: any) => row._id}
              loading={loading}
              rowsPerPageOptions={data.length !== 0 ? [5, 10, 20, 50, 100] : [5]}
              pagination
              page={currentPage - 1}
              pageSize={pageSize}
              paginationMode="server"
              onPageChange={(newPage) => {
                handlePageChange(newPage + 1, pageSize)
              }}
              onPageSizeChange={(newPageSize) => {
                handlePageChange(currentPage, newPageSize)
              }}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
              sx={{
                margin: "10px",
              }}
            />
            <Button
              color="primary"
              variant="outlined"
              size="medium"
              sx={{
                display: "flex",
                top: "10px",
              }}
              onClick={() => fetchEmployees()}
            >
              Load
            </Button>
          </Box>
          <EmployeeAddEditModal
            key={`${employees._id}${employees.email}${employees.name}${employees.designation}${employees.education}${actionType}`}
            isOpen={open}
            actionType={actionType}
            closeModal={handleModalClose}
            employees={employees}
          />
          <DeleteEmployee
            id={employeeId}
            isOpen={deleteDialogOpen}
            closeModal={handleDeleteModalClose}
          />
        </div>
      </div>
      <div >
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default NewEmployeeListPage
