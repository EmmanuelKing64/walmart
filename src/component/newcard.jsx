import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import axios from 'axios'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Defined from './defined';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      height:300,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const useStylesForGrid = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1200,
      height: 650,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  

export default function SimpleCard({history}) {
  const classes = useStyles();
  const gridClasses = useStylesForGrid();
  const [productId,setProductId] = React.useState(0);
  const [products,setProducts] = React.useState([])
  const [data,setData] = React.useState([])
  const [boolean,setBoolean] = React.useState(false)
  let temp1 = ''
  
  React.useEffect(()=>{
    axios.get('https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/8')
    .then(res =>{
      setData(res.data)
      setProducts(data.products)
      console.log(products.map(i=>(i.productName)),'check')
      
    })
    .catch(err =>
      console.log(err))
  },[data])
  
  const handleclick=(params)=>{
      console.log('clicked value',params)
      temp1=params;
      setProductId(temp1)
      setBoolean(!boolean);
      console.log('id value',temp1)
      console.log('id value',productId)
      history.push('/defined')
  }
  return (<div>
    <GridList cellHeight={180} className={gridClasses.gridList}>
        {products&&products.map(i=>(
    <Card className={classes.root}>
        <CardActionArea onClick={()=>handleclick(i.productId)}>
        <CardHeader
        avatar={
          <Avatar  className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={i.productName}
        subheader="September 14, 2016"
      />      
      <CardMedia
        className={classes.media}
        image='my-app\src\component\no image.png'
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      </CardActionArea>
        </Card>
        ))}
        </GridList>
        {boolean === true &&
        <Defined product={products} productid={temp1} />}
        </div>
  );
}
