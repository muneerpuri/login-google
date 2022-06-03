import React from 'react'
import Navbar from '../components/Navbar'
import styled from '@emotion/styled'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgress} from '@mui/material';

const ParentBody = styled.div`
background-color: #FA8BFF;
background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
height: 100vh;
width: 100%;


`;

const LoadingDiv = styled.div`
width:100%;
height:100vh;
display:flex;
justify-content: center;align-items:center;
box-sizing:border-box;

`;

const PaginationParent =  styled.div`
margin:20px;
box-sizing:border-box;
display:flex;
justify-content: center;align-items:center;

`;
function Home() {
  const [ content,setContent] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const [activePageTab, setActivePageTab] = React.useState(1);
  const itemsPerPage = 5;
  React.useEffect(()=>{
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => {setContent(json)
    setLoading(false)})
  },[])

  const indexOfLastTodo = activePageTab * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  let activeData = content.slice(indexOfFirstTodo, indexOfLastTodo);
  
  console.log("indexOfLastTodo",indexOfLastTodo)
  console.log("indexOfFirstTodo",indexOfFirstTodo)
  console.log("activeData length",activeData.length)
  console.log("activePageTab",activePageTab)
  return (
    <ParentBody>
    <Navbar/>
    {loading?<LoadingDiv><CircularProgress  color="success"/></LoadingDiv>:<TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">S.NO.</TableCell>
            <TableCell align="center">USER ID</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">COMPLETED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeData.map((row,index) => (
            <TableRow
              key={index+'aknslan'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="center">
              {index+1}
            </TableCell>
            <TableCell align="center">
              {row.userId}
            </TableCell>
              <TableCell align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.completed.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    <PaginationParent>
            <span style={{background:"white"}}>
              {console.log(itemsPerPage)}

    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(content.length / itemsPerPage)}
        renderItem={(item) => (
          <span 
          onClick={() => {
            activeData = []
            setActivePageTab(item.page)}}>

          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            />
            </span>
        )}
        />
    </Stack>
        </span>
            </PaginationParent>
    </ParentBody>
  )
}

export default Home