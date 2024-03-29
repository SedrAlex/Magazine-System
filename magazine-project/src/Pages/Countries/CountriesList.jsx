import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Modal from "@mui/material/Modal";
import CountryAddForm from "../../Components/Panel/AddForm/CountryAddForm";
import { useAppStore } from "../Store";
import CountrytEditForm from "../../Components/Panel/EditForm/CountryEditForm";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CountriesList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);

  const [formid, setFormid] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCountries = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/country")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setRows(data); // Assuming the data is an array of categories
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const performDelete = (id, accessToken) => {
    axios
      .delete(
        `https://www.tanaghomtech.com/magazine/public/api/country/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          Swal.fire("تم الحذف بنجاح", "", "success", {
            timer: 500,
          });
          getCountries();
        }
      })

      .catch((error) => {
        Swal.fire("خطأ", error.message, "error");
      });
  };

  const deleteCountry = (id) => {
    Swal.fire({
      title: "هل  أنت  متأكد؟ ",
      text: "لن  تتمكن  من التراجع  عن  هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#E1021F",
      confirmButtonText: "نعم،  احذفه",
    }).then((result) => {
      if (result.value) {
        const accessToken = localStorage.getItem("accessToken");
        performDelete(id, accessToken);
      }
    });
  };
  const editData = (id, name) => {
    const data = {
      id: id,
      countryName: name,
    };
    setFormid(data);
    handleEditOpen();
  };

  useEffect(() => {
    getCountries();
  }, []);

  //   const filterData = (v) => {
  //     if (v) {
  //       setRows([v]);
  //     } else {
  //       setRows([]);

  //       getCountries();
  //     }
  //   };
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CountryAddForm closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CountrytEditForm closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      {rows.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Countries List
            </Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              اضافة
            </Button>
          </Box>

          <Divider />
          {/* <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />}>
              Add
            </Button>
          </Stack>
          <Box height={10} /> */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={row.id} align="left">
                          {row.countryName}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editData(row.id, row.countryName);
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteCountry(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {rows.length == 0 && (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            marginLeft:"150px",
            alignItems: "right",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default CountriesList;
