import { AreaCards, AreaCharts,  } from "../../components";
// import {useNavigate } from "react-router-dom"
const Dashboard = () => {
  // const navigate = useNavigate();
  return (
    <div className="content-area">
      <AreaCards />
      <AreaCharts />
    </div>
  );
};

export default Dashboard;