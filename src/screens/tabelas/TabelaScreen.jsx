import { AreaCards, AreaCharts, AreaTable, } from "../../components";
import Comission from "../../components/comission/Comission";
// import {useNavigate } from "react-router-dom"

const Tables = () => {
  // const navigate = useNavigate();
  return (
    <div className="content-area">
      <Comission/>
      <AreaTable/>
    </div>
  );
};

export default Tables;
