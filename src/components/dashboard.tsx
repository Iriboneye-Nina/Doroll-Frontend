import {InfoCircleOutlined,CheckOutlined,FileProtectOutlined,IssuesCloseOutlined} from "@ant-design/icons";
import {Card,Statistic}from "antd"
export default function Percent(){
    return (
        <div className="flex flex-wrap gap-3 justify-center">
        <Card
         className="shadow-sm rounded-lg w-[] p-3"
         style={{borderRadius: "6px",border: "1px solid #E0E0E0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={11} precision={0} valueStyle={{ fontSize: "20px", color: "#1F2937" }}/>
             <span style={{ fontSize: "10px", color: "#1F2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <FileProtectOutlined
             style={{ fontSize: "20px", color: "#9CA3AF" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Total Tasks</div>
        </Card>
        <Card
         className="shadow-sm rounded-lg w-[150px] p-3"
         style={{borderRadius: "6px",border: "1px solid #E0E0E0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={1} precision={0} valueStyle={{ fontSize: "20px", color: "#1F2937" }}/>
             <span style={{ fontSize: "10px", color: "#1F2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <CheckOutlined
             style={{ fontSize: "20px", color: "#9CA3AF" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Completed</div>
        </Card>
        <Card
         className="shadow-sm rounded-lg w-[150px] p-3"
         style={{borderRadius: "6px",border: "1px solid #E0E0E0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={7} precision={0} valueStyle={{ fontSize: "20px", color: "#1F2937" }}/>
             <span style={{ fontSize: "10px", color: "#1F2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <InfoCircleOutlined
             style={{ fontSize: "20px", color: "#9CA3AF" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Pending</div>
        </Card>
        <Card
         className="shadow-sm rounded-lg w-[150px] p-3"
         style={{borderRadius: "6px",border: "1px solid #E0E0E0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={3} precision={0} valueStyle={{ fontSize: "20px", color: "#1F2937" }}/>
             <span style={{ fontSize: "10px", color: "#1F2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <IssuesCloseOutlined
             style={{ fontSize: "20px", color: "#9CA3AF" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Off-Track</div>
        </Card>
        </div>
    )
}