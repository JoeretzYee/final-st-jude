import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// css
import "../css/ViewPatient.css";
// react router dom
import { useParams } from "react-router-dom";
// axios
import axios from "../axios";
// sweet alert
import swal from "sweetalert";
// material UI
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";

import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function ViewPatient() {
  let { patientId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");
  const [complaint, setComplaint] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    axios
      .get(`/api/patients/${patientId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setMiddleName(res.data.middle_name);
        setAddress(res.data.address);
        setTelephone(res.data.telephone);
        setAge(res.data.age);

        setOccupation(res.data.occupation);
        setStatus(res.data.status);
        setComplaint(res.data.complaint);
      });

    axios
      .get("/api/payments", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
      });
  }, [patientId]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12} xs={12} lg={12} className="test">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="viewPatient__tableHead">
                <TableRow>
                  <TableCell className="viewPatient__tableCell">Name</TableCell>
                  <TableCell align="center" className="viewPatient__tableCell">
                    Address
                  </TableCell>
                  <TableCell align="center" className="viewPatient__tableCell">
                    Telephone
                  </TableCell>
                  <TableCell align="center" className="viewPatient__tableCell">
                    Age
                  </TableCell>
                  <TableCell align="center" className="viewPatient__tableCell">
                    Occupation
                  </TableCell>
                  <TableCell
                    align="ricentertableCell"
                    className="viewPatient__tableCell"
                  >
                    Status
                  </TableCell>
                  <TableCell align="center" className="viewPatient__tableCell">
                    Complaint
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {firstName} {middleName}. {lastName}
                  </TableCell>
                  <TableCell align="center">{address}</TableCell>
                  <TableCell align="center">{telephone}</TableCell>
                  <TableCell align="center">{age}</TableCell>
                  <TableCell align="center">{occupation}</TableCell>
                  <TableCell align="center">{status}</TableCell>
                  <TableCell align="center">{complaint}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={12} xs={12} lg={12}>
          <h1 className="viewPatient__h1">Payment History</h1>
          <Box sx={{ bgcolor: "background.paper", width: 100 + "%" }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Paid" {...a11yProps(0)} />
                <Tab label="Balance" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid item md={12} xs={12}>
                  <FormControl className="viewPatient__dateField">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="date"
                      className="patients__info"
                      onChange={(e) => setSearchDate(e.target.value)}
                      value={searchDate}
                    />
                  </FormControl>
                </Grid>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead className="viewPatient__tableHead">
                      <TableRow>
                        <TableCell className="viewPatient__tableCell">
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Description
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Check Number
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Discount
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align="ricentertableCell"
                          className="viewPatient__tableCell"
                        >
                          Payment
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Balance
                        </TableCell>
                        <TableCell
                          align="center"
                          className="viewPatient__tableCell"
                        >
                          Process By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions
                        ?.filter((val) => {
                          if (searchDate === "") {
                            return val;
                          } else if (val.date.includes(searchDate)) {
                            return val;
                          }
                        })
                        .map((val) => {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              key={val.id}
                            >
                              <TableCell component="th" scope="row">
                                {val.date}
                              </TableCell>
                              <TableCell align="center">
                                {val.description.name}
                              </TableCell>
                              <TableCell align="center">
                                {val.check_number}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(val.discount)}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(val.amount)}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(val.payment)}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(val.balance)}
                              </TableCell>
                              <TableCell align="center">
                                {val.process_by}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Details
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewPatient;
