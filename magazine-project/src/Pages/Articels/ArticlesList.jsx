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
import { useArticleStore } from "../Store";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import ArticleAddForm from "../../Components/Panel/AddForm/ArticleAddForm";
import ArticlesEditForm from "../../Components/Panel/EditForm/ArticlesEditForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:1100 ,
  right:"10%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height:800,
  p:2,
};

export default function ArticlesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);

  const [formid, setFormid] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const setRows = useArticleStore((state) => state.setRows);
  const rows = useArticleStore((state) => state.rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   const getArticles = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/article?include=category,country,writer")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setRows(data); // Assuming the data is an array of categories
        console.log("rows", rows);
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
        `https://www.tanaghomtech.com/magazine/public/api/article/${id}`,
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
          getArticles();
        }
      })
      .catch((error) => {
        Swal.fire("خطأ", error.message, "error");
      });
  };
  const deleteCategory = (id) => {
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

  const editData = (id, title,brief,content) => {
    const data = {
      id: id,
      title: title,
      brief:brief,
      content:content
    };
    setFormid(data);
    handleEditOpen();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);

      getArticles();
    }
  };
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ArticleAddForm fid={formid}closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ArticlesEditForm closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      {/* {rows.length > 0 && ( */}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box
            sx={{
              display:"flex",
              justifyContent:"space-between",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Articles List
            </Typography>
          </Box>

          <Divider />
          <Box height={10} />
          <Stack
            direction="row"
            spacing={2}
            style={{ marginRight: "16px", marginLeft: "16px" }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.title || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="البحث عن المقالات" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              اضافة
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" style={{ minWidth: "450px" }}>
              <TableHead   >
                <TableRow >
                  <TableCell align="left" style={{ minWidth: "80px" }}>
                     Image
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "80px" }}>
                    Title
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "80px" }}>
                    Author
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "80px" }}>
                    Category
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "80px" }}>
                    Country
                  </TableCell>
              
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell align="left" >
                       
                          <Avatar
                            variant="rounded"
                            alt="image"
                            src={`https://www.tanaghomtech.com/magazine/storage/app/public/${row.imageLink}`}
                          >
                          </Avatar>
                        </TableCell>
                        <TableCell  align="left">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">
                          {row.writer.writerName}
                        </TableCell>
                        <TableCell align="left"> {row.category.categoryName}</TableCell>
                        <TableCell align="left">{row.country.countryName}</TableCell>

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
                                editData(row.id, row.title,row.brief, row.content);
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteCategory(row.id);
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
      {/* )} */}
      {/* {rows.length == 0 && (
        <>
          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
          </Paper>
        </>
      )} */}
    </>
  );
}
