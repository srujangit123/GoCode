import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Row } from "react-grid-system";
import Select from "react-select";
import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { useHistory } from "react-router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  h1: {
    marginTop: "10px",
    color: "black",
    fontSize: "25px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgb(79, 98, 148)",
  },

  form: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  p: {
    color: "#bf1650",
    textAlign: "center",
  },

  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "10px 15px",
    marginBottom: "10px",
    fontSize: "14px",
  },

  label: {
    lineHeight: "2",
    textAlign: "left",
    display: "block",
    marginBottom: "13px",
    marginTop: "20px",
    color: "black",
    fontSize: "14px",
    fontWeight: "200",
  },

  submitButton: {
    background: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    marginTop: "40px",
    padding: "20px",
    fontSize: "16px",
    fontWeight: "100",
    letterSpacing: "10px",
    display: "block",
    appearance: "none",
    borderRadius: "4px",
    width: "100%",
  },

  container: {
    backgroundColor: "#2f3956",
    marginTop: "100px",
    paddingBottom: "30px",
    paddingTop: "20px",
    borderRadius: "25px",
  },

  dropdown: {
    width: "50%",
  },
}));
const tags = [
  { value: "flows", label: "flows" },
  { value: "graph matchings", label: "graph matchings" },
  { value: "graphs", label: "graphs" },
  { value: "greedy", label: "greedy" },
  { value: "binary search", label: "binary search" },
  { value: "dp", label: "dp" },
  { value: "geometry", label: "geometry" },
  { value: "brute force", label: "brute force" },
  { value: "data structures", label: "data structures" },
  { value: "implementation", label: "implementation" },
  { value: "sortings", label: "sortings" },
  { value: "constructive algorithms", label: "constructive algorithms" },
  { value: "two pointers", label: "two pointers" },
  { value: "dfs and similar", label: "dfs and similar" },
  { value: "hashing", label: "hashing" },
  { value: "bitmasks", label: "bitmasks" },
  { value: "meet-in-the-middle", label: "meet-in-the-middle" },
  { value: "combinatorics", label: "combinatorics" },
  { value: "math", label: "math" },
  { value: "dsu", label: "dsu" },
  { value: "divide and conquer", label: "divide and conquer" },
  { value: "strings", label: "strings" },
  { value: "interactive", label: "interactive" },
  { value: "number theory", label: "number theory" },
  { value: "shortest paths", label: "shortest paths" },
  { value: "trees", label: "trees" },
  { value: "probabilities", label: "probabilities" },
  { value: "string suffix structures", label: "string suffix structures" },
  { value: "fft", label: "fft" },
  { value: "matrices", label: "matrices" },
  { value: "2-sat", label: "2-sat" },
  { value: "ternary search", label: "ternary search" },
  { value: "games", label: "games" },
  { value: "chinese remainder theorem", label: "chinese remainder theorem" },
  { value: "dfs", label: "dfs" },
  { value: "Array", label: "Array" },
  { value: "trie", label: "trie" },
  { value: "linked list", label: "linked list" },
  { value: "sliding window", label: "sliding window" },
  { value: "stack", label: "stack" },
  { value: "queue", label: "queue" },
];
const AddContest = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const [contestsOverview, setcontestsOverview] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/contests/" + props.match.params.id)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setcontestsOverview(data);
      });
  }, []);

  const [loadingProblemSubmit, setloadingProblemSubmit] = useState(false);
  const onSubmit = (data) => {
    data["tags"] = selectedOptions;
    data["hidden"] = true;
    data["contestId"] = props.match.params.id;
    console.log(data);
    setloadingProblemSubmit(true);
    axios
      .post("http://localhost:5000/api/addproblem", data)
      .then((res) => {
        setloadingProblemSubmit(false);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDropdownChange = (event) => {
    console.log(event);
    let tagsArray = [];
    event.map((o) => tagsArray.push(o.value));

    setSelectedOptions(tagsArray);
  };
  console.log(contestsOverview);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "grey",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Challenges" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        style={{
          display: "auto",
          minHeight: "50rem",
          background: "#424242",
        }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Row
            style={{
              padding: "2rem",
            }}
          >
            <Typography
              style={{
                color: "white",
              }}
            >
              Name:
            </Typography>
            <Typography
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              'name'
            </Typography>
          </Row>

          <Row
            style={{
              padding: "2rem",
            }}
          >
            <Typography
              style={{
                color: "white",
              }}
            >
              Host:
            </Typography>
            <Typography
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              'host'
            </Typography>
          </Row>
        </Row>

        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Row
            style={{
              padding: "2rem",
            }}
          >
            <Typography
              style={{
                color: "white",
              }}
            >
              Contest Date:
            </Typography>
            <Typography
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              'on'
            </Typography>
          </Row>

          <Row
            style={{
              padding: "2rem",
            }}
          >
            <Typography
              style={{
                color: "white",
              }}
            >
              Duration:
            </Typography>
            <Typography
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              'duration'
            </Typography>
          </Row>
        </Row>

        <Typography
          style={{
            color: "white",
          }}
          variant="h6"
        >
          Description:
        </Typography>
        <Typography
          style={{
            color: "white",
            padding: "2rem",
          }}
          variant="h6"
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </Typography>

        {/* {contestsOverview.Host}
        <br />
        {contestsOverview.Duration}
        <br />
        {contestsOverview.isPublic}
        <br /> */}
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{
          display: "auto",
          minHeight: "50rem",
          background: "#424242",
        }}
      >
        <Paper
          style={{
            margin: "2rem",
            padding: "0.5rem 5rem",
            borderRadius: "2rem",
          }}
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Grid container>
              <Grid item xs={12}>
                <Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Link to={problemURL + problem._id}> */}
                  <Typography variant="h5"> Problem Name</Typography>
                  {/* </Link> */}
                  {/* <Row>
                    <Typography
                      variant="h7"
                      style={{
                        fontWeight: "bold",
                        padding: "10px",
                      }}
                    >
                      Score:
                    </Typography>

                    <Typography
                      // component="div"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "gray",
                        color: "white",
                        fontWeight: "bold",

                        padding: "10px",
                        //  paddingRight: "20px",
                      }}
                    >
                      15
                    </Typography>
                  </Row> */}
                  <DeleteForeverIcon fontSize="large"></DeleteForeverIcon>
                </Row>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span">Other Tags:</Typography>
                {/* {problem.tags.map((p, i) => {
                  return (
                    <Chip
                      size="small"
                      label={p}
                      key={i}
                      style={{
                        padding: "10px",
                        margin: "5px",
                      }}
                    />
                  );
                })} */}
              </Grid>
            </Grid>
          </Row>
        </Paper>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              color: "white",
              padding: "1rem 2rem ",
              borderColor: "white",
              // marginLeft: "auto",
              background: "#006633",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            <Row>
              <AddIcon />
              <Typography
                style={{
                  marginLeft: "10px",
                }}
              >
                Add a Challenge
              </Typography>
            </Row>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Problem</DialogTitle>
            <DialogContent
              style={{
                width: "35rem",
              }}
            >
              <DialogContentText></DialogContentText>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={classes.label} htmlFor="problemName">
                  Problem Name:
                </label>

                <input
                  className={classes.input}
                  {...register("problemName", {
                    required: "Problem name cannot be empty.",
                  })}
                  id="problemName"
                />
                {errors.problemName && (
                  <span className={classes.p}>
                    {errors.problemName.message}
                  </span>
                )}

                <label className={classes.label} htmlFor="problemStatement">
                  Problem Statement:{" "}
                </label>
                <textarea
                  name="problemStatement"
                  id="problemStatement"
                  placeholder="Enter the problem statement"
                  className={classes.input}
                  {...register("problemStatement", {
                    required: "Problem statement cannot be empty.",
                  })}
                ></textarea>
                {errors.problemStatement && (
                  <span className={classes.p}>
                    {errors.problemStatement.message}
                  </span>
                )}
                <label className={classes.label} htmlFor="tags">
                  Tags:{" "}
                </label>
                <Select
                  id="tags"
                  onChange={handleDropdownChange}
                  className={classes.dropdown}
                  isMulti
                  options={tags}
                />
                <label className={classes.label} htmlFor="sampleInput">
                  Sample input:{" "}
                </label>
                <textarea
                  style={{
                    height: "8rem",
                  }}
                  name="sampleInput"
                  id="sampleInput"
                  placeholder="Separate sample inputs using ~                                                                                                                                                       
                  Ex:                                                                                                                                                             
                  abc                                                                                                                                                                                                                                            
                  ~                                                                                                                            
                  def                                                                                                                                           
                  ~"
                  className={classes.input}
                  {...register("sampleInput", {
                    required: "Sample input cannot be empty.",
                  })}
                ></textarea>
                <label className={classes.label} htmlFor="sampleInput">
                  Sample output:{" "}
                </label>
                <textarea
                  style={{
                    height: "8rem",
                  }}
                  id="sampleOutput"
                  name="sampleOutput"
                  placeholder="Separate sample outputs using ~                                                                                                                                                       
                  Ex:                                                                                                                                                             
                  123                                                                                                                                                                                                                                            
                  ~                                                                                                                            
                  456                                                                                                                                          
                  ~"
                  className={classes.input}
                  {...register("sampleOutput", {
                    required: "Sample output cannot be empty.",
                  })}
                ></textarea>
                <label className={classes.label} htmlFor="testInputs">
                  Test inputs:{" "}
                </label>
                <textarea
                  name="testInputs"
                  id="testInputs"
                  placeholder="Enter Testinputs similar to sample inputs"
                  className={classes.input}
                  {...register("testInputs", {
                    required: "Test inputs cannot be empty.",
                  })}
                ></textarea>
                <label className={classes.label} htmlFor="testOutputs">
                  Test outputs:{" "}
                </label>
                <textarea
                  name="testOutputs"
                  id="testOutputs"
                  placeholder="Enter Testoutputs similar to sample outputs"
                  className={classes.input}
                  {...register("testOutputs", {
                    required: "Test outputs cannot be empty.",
                  })}
                ></textarea>
                {loadingProblemSubmit ? (
                  <CircularProgress
                    style={{ display: "flex", justifyContent: "center" }}
                    disableShrink
                  />
                ) : (
                  <input
                    className={classes.submitButton}
                    value="Next"
                    type="submit"
                  />
                )}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={handleClose} color="primary">
                    Subscribe
                  </Button> */}
            </DialogActions>
          </Dialog>
        </div>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "50rem",
          background: "#424242",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Work In Progress
      </TabPanel>
    </div>
  );
};

export default AddContest;
