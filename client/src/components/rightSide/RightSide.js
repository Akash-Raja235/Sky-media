
import TrendCard from '../trendCard/TrendCard'
import {Button} from '@mui/material'
import './RightSide.css'
import { useState } from 'react';
import ShareModel from '../shareModel/ShareModel';
const RightSide = () => {

const [modalOpened, setModalOpened] = useState(false);
  
  return (
    <div className="RightSide">
      <TrendCard />
      <Button
        onClick={() => setModalOpened(true)}
        variant="contained"
        sx={{
          fontSize: "large",
          bgcolor: "orange",
          "&:hover": { bgcolor: "secondary" },
          marginLeft: "120px",
          mt: 2,
        }}
      >
      
        Shares
      </Button>
      <ShareModel 
           modalOpened={modalOpened}
          setModalOpened={setModalOpened}
      />
    </div>
  );
  }
export default RightSide