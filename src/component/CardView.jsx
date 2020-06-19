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
import Defined from "./defined";
import { AppContext } from '../store';
import "../component/CardView.css";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    height: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));
const useStylesForGrid = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1200,
    height: 650
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function SimpleCard({ history }) {
  const classes = useStyles();
  const gridClasses = useStylesForGrid();
  // const [productId, setProductid] = React.useState('test');
  // const [sharmi, setSharmi] = React.useState("");
  // const [products, setProducts] = React.useState([]);
  // const [boolean, setBoolean] = React.useState(false);
  const {value,dispatch} = React.useContext(AppContext)
  const [page,setPage] = React.useState(1)

  async function fetchData() {
    try{
      const response = await axios.get(
        "https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/8"
      );
      const productData = await response.data;
      const data = productData.products;
      return productData;
    }
    catch(err){
      console.error('Failed to fetch',err);
      return null;
    }
  }
  React.useEffect(() => {
    const getAllProducts = async ()=>{
      const data = await fetchData(page);
     // const list = data.products;

      // setProducts(data);
      console.log('list',data)
      if(data){
        dispatch({type:"SET_PRODUCTS",payload:data});
      }
    }
    // fetchData();
    getAllProducts();
  }, [page]);

  const handleclick = async id => {
    // console.log("clicked value", params);
    // temp1 = params;
    // await setProductid("test123");
    // await setBoolean(!boolean);
    // console.log("id value", productId);
    history.push(`/detailedView/${id}`);
  };
 const handlePageChange =(event)=>{
  //  console.log('event',event)
  // // console.log('value',value)
  // setPage(event.target.value);
 }
  const dataEntities = value && value.entities;
  const totalNumber = dataEntities && dataEntities.totalProducts;
  const pageSize = dataEntities &&  dataEntities.pageSize;
  console.log('totalNumber',totalNumber)
  const entities = dataEntities && dataEntities.products
  return (
    <div>
      <GridList cellHeight={180} className={gridClasses.gridList}>
        {entities &&
          entities.map(i => (
            <Card className={classes.root}>
              <CardActionArea onClick={() => handleclick(i.productId)}>
                <CardHeader
                  avatar={<Avatar className={classes.avatar}>R</Avatar>}
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
      <Pagination count={Math.floor(totalNumber/pageSize)} page={1} onChange={handlePageChange} />
      </div>
  );
}
