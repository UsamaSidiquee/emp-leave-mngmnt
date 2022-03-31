const Leave = require("../models/leaveModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const handleErrors = require("../utils/leaveErrorHandler");

const leave_index = (req, res) => {
  Leave.find({
    user: res.locals.user._id,
  })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { leave: result, title: "All leaves" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_all_leaves = (req, res) => {
  Leave.find({
    user: res.locals.user._id,
  })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send({ leaves: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const leave_details = (req, res) => {
  const id = req.params.id;
  Leave.findById(id)
    .then((result) => {
      res.render("details", { leave: result, title: "Leave Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Leave not found" });
    });
};

const date = new Date();
const curr_date = date.getDate();
const curr_month = date.getMonth() + 1; //Months are zero based
const curr_year = date.getFullYear();
const todaysDate = curr_year + "-" + curr_month + "-" + curr_date;
const yearFromNow = curr_year + 1 + "-" + curr_month + "-" + curr_date;

const leave_create_get = (req, res) => {
  res.render("create-leave-page", {
    title: "Create a new blog",
    todaysDate,
    yearFromNow,
  });
};

const leave_create_post = (req, res) => {
  const { leaveDate } = req.body;
  const isValidDate = () => {
    if (new Date(leaveDate) < new Date(todaysDate)) return false;
    if (new Date(leaveDate) > new Date(yearFromNow)) return false;
    return true;
  };
  if (!isValidDate()) {
    res.json({ errors: { leaveDate: "Please Enter a valid Date" } });
    return;
  }
  const newLeave = {
    ...req.body,
    user: res.locals.user._id,
  };
  console.log(req.body);
  const leave = new Leave(newLeave);
  leave
    .save()
    .then((result) => {
      res.json({ leave: result });
    })
    .catch((err) => {
      console.log(handleErrors(err));
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors });
    });
};

const leave_approve_get = (req, res) => {
  res.send("hal");
};

const leave_approve_post = (req, res) => {
  if (res.locals.user?.isAdmin) {
    const id = req.params.id;
    Leave.findOneAndUpdate({ _id: id }, { status: "APPROVED" })
      .then(() => {
        res.json({ redirect: "/" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ error: "You are not allowed" });
  }
};

const leave_delete = (req, res) => {
  const id = req.params.id;
  Leave.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  leave_index,
  get_all_leaves,
  leave_details,
  leave_create_get,
  leave_create_post,
  leave_approve_get,
  leave_approve_post,
  leave_delete,
};
