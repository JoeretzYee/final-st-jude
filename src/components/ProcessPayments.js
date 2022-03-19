import React, { useEffect, useState } from "react";
import "../css/ProcessPayments.css";
// material UI
import {
  Button,
  FormControl,
  Grid,
  TextField,
  FormHelperText,
} from "@mui/material";
import Select from "react-select";
// axios
import axios from "../axios";
//sweet alert
import swal from "sweetalert";
// react router dom
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function ProcessPayments() {
  const user = useSelector(selectUser);
  const todaysDate = new Date();
  let navigate = useNavigate();
  const DateToday = () => {
    let d = new Date(todaysDate);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  const [dateToday, setDateToday] = useState(DateToday());
  const [description, setDescription] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [checkNumber, setCheckNumber] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState();
  const [payment, setPayment] = useState(0);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState("");
  const [appointments, setAppointments] = useState([]);

  // options for select
  let patientsOptions = patients.map((patient) => ({
    value: patient.id,
    label: patient.first_name + " " + patient.last_name,
  }));

  useEffect(() => {
    axios
      .get("/api/patients", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPatients(res.data);
      });

    axios
      .get("/api/appointments", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAppointments(res.data);
      });

    axios
      .get("/api/treatments", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTreatments(res.data);
      });
  }, []);

  const filterAppointments = () => {
    if (patient) {
      return appointments.filter((val) => {
        return val.patient.id === patient;
      });
    }
  };

  const allDoneAppointments = () => {
    return filterAppointments()?.filter((val) => {
      return val.status === true;
    });
  };

  let treatmentsOptions = allDoneAppointments()?.map((treatment) => ({
    value: treatment.description.id,
    label: treatment.description.name,
  }));

  const automaticAmount = (discount) => {
    return amount - discount;
  };

  const automaticBalance = (amount, payment, discount) => {
    return amount - payment - discount;
  };

  const [balance, setBalance] = useState(
    automaticBalance(amount, payment, discount)
  );

  const handleProcessPayment = (e) => {
    e.preventDefault();
    // console.log(dateToday);
    // console.log(patient);
    // console.log(description);
    // console.log(checkNumber);
    // console.log(discount);
    // console.log(automaticAmount(discount));
    // console.log(payment);
    // console.log(automaticBalance(amount, payment, discount));
    if (patient === "" || description === "" || amount === 0) {
      swal("Error", "Fill all the fields", "warning");
    } else {
      const form = {
        patient: patient,
        description: description,
        date: dateToday,
        check_number: checkNumber,
        discount: discount,
        amount: automaticAmount(discount),
        payment: payment,
        balance: automaticBalance(amount, payment, discount),
      };

      axios
        .post("/api/payments/", form, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          swal("Success", `Process Payment Successful`, "success").then(
            setTimeout(() => {
              navigate(`/patients`);
            }, 1000)
          );
        });
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="date"
              className="patients__info"
              value={dateToday}
              disabled={true}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl className="patients__info">
            <Select
              label="Select Patients"
              options={patientsOptions}
              onChange={(e) => setPatient(e.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl className="patients__info">
            <Select
              label="Select Patients"
              options={treatmentsOptions}
              onChange={(e) => setDescription(e.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Check Number"
              type="text"
              className="patients__info"
              onChange={(e) => setCheckNumber(e.target.value)}
              value={checkNumber}
              required
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              className="patients__info"
              onChange={(e) => setAmount(e.target.value)}
              value={automaticAmount(discount)}
              required
              helperText="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12} lg={6}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              className="patients__info"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              required
              helperText="Discount"
            />
          </FormControl>
        </Grid>

        <Grid item md={12} xs={12}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              className="patients__info"
              onChange={(e) => setPayment(e.target.value)}
              value={payment}
              required
              helperText="Payment"
            />
          </FormControl>
        </Grid>
        <Grid item md={12} xs={12}>
          <FormControl className="patients__info">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              className="patients__info"
              onChange={(e) => setBalance(e.target.value)}
              value={automaticBalance(amount, payment, discount)}
              required
              helperText="Balance"
            />
          </FormControl>
        </Grid>
        <Grid item md={12} xs={12}>
          <Button
            onClick={handleProcessPayment}
            variant="contained"
            className="patients__modalButton"
          >
            Process Payment
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ProcessPayments;
