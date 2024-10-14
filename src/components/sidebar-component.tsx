import React from 'react'
import { useRecoilState } from 'recoil';
import { productFilteredState, searchTermState, viewState } from '../state/employeeState';

const positions = ["All", "Manager", "Developer", "Designer","Technical Lead","Principal Engineer "]; 

const SideBarComponent = () => {
    const [view, setView] = useRecoilState(viewState);
    const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
    const [positionFilter, setPositionFilter] = useRecoilState(productFilteredState);
  return (
//     <div className="columns is-multiline">
//     <div className="column is-12">
//       <div className="field has-addons">
//           <div className="control">
//             <button
//               className={`button ${view == "column" ? `is-dark` : null}`}
//               onClick={() => setView("column")}
//             >
//               <i className="fas fa-th-large"></i>
//             </button>
//           </div>
//       <div/>    
//     </div>
//     <div className="control">
//             <button
//               className={`button ${view == "row" ? `is-dark` : null}`}
//               onClick={() => setView("row")}
//             >
//               <i className="fas fa-grip-horizontal"></i>
//             </button>
//           </div>
//   </div>
//   </div>
<div className="columns is-multiline">
<div className="column is-12">
  
  {/* <div className="field has-addons">
    <div className="control">
      <button
        className={`button ${view == "column" ? `is-dark` : null}`}
        onClick={() => setView("column")}
      >
        <i className="fas fa-th-large"></i>
      </button>
    </div>
    <div className="control">
      <button
        className={`button ${view == "row" ? `is-dark` : null}`}
        onClick={() => setView("row")}
      >
        <i className="fas fa-grip-horizontal"></i>
      </button>
    </div>
  </div> */}
 
</div>
<div className="column is-12">
  <h3 className="subtitle is-6 mb-2">Filter</h3>
  <div className="select is-fullwidth">
    <select value={positionFilter}  onChange={(e) => setPositionFilter(e.target.value)}>
      {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
    </select>
  </div>
</div>
</div>
  )
}

export default SideBarComponent
