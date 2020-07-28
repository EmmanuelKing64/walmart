import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import GridList from "@material-ui/core/GridList";
import axios from "axios";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { AppContext } from "../store";
import "../component/CardView.css";
import Skeleton from "@material-ui/lab/Skeleton";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    //height: 300
  },
  media: {
    height: 57,
    // paddingTop: "56.25%" // 16:9
  },
  content: {
    height: 100,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const useStylesForGrid = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 1200,
    // height: 650
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

let loading = true;
let error = "";
export async function fetchData(page, rowsPerPage) {
  console.log("page1", page, rowsPerPage);
  try {
    const response = await axios.get(
      `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${
        page + 1
      }/${rowsPerPage}`
    );
    const productData = await response.data;
    const data = productData.products;
    loading = false;
    error = "";
    return productData;
  } catch (err) {
    console.error("Failed to fetch", err);
    loading = true;
    error = "Failed to fetch";
    return null;
  }
}

export default function SimpleCard({ history }) {
  const classes = useStyles();
  const gridClasses = useStylesForGrid();
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const { value, dispatch } = React.useContext(AppContext);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const getAllProducts = async () => {
      console.log("page", page);
      const data = await fetchData(page, rowsPerPage);
      console.log("list", data);
      if (data && error === "") {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } else {
        alert(error);
      }
    };
    getAllProducts();
  }, [page, error, rowsPerPage]);

  const handleclick = async (id) => {
    history.push(`/detailedView/${id}`);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dataEntities = value && value.entities;
  const totalNumber = dataEntities && dataEntities.totalProducts;
  const pageSize = dataEntities && dataEntities.pageSize;
  console.log("totalNumber", totalNumber);
  //console.log('loading',value&& value.loading)
  const entities = dataEntities && dataEntities.products;
  return (
    <div>
      {loading ? (
        <div>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      ) : (
        <GridList spacing={10} className={gridClasses.gridList}>
          {entities &&
            entities.map((i) => (
              <Card className={classes.root}>
                <CardActionArea onClick={() => handleclick(i.productId)}>
                  <CardHeader
                    avatar={<Avatar className={classes.avatar}>WM</Avatar>}
                    action={
                      <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                      </IconButton>
                    }
                    title={i.productName}
                  />
                  <CardMedia
                    className={classes.media}
                    image="my-app\src\component\no image.png"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Price:{i.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      In stock: {i.inStock ? "Available" : "Unavailable"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </GridList>
      )}
      <TablePagination
        component="div"
        rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8]}
        count={60}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
