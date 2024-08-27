import { AreaCards, AreaCharts,  } from "../../components";
import {useNavigate } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="content-area">
      
      <AreaCards />
      <AreaCharts />
    </div>
  );
};

export default Dashboard;
