import React from 'react';
import './Sorter.css';

export const Sorter = (props) => {

	return (
    <div className="sorter-container flex center-align-items">
    	<h3>Sort By:</h3>
    		<select 
    			className="sorter-select" 
    			onChange={(event) => props.changeOrder(event.target.value)} 
    			value={props.order}>
				  <option  value='newest'>Newest</option>
				  <option  value='oldest'>Oldest</option>
				</select>
    </div>
	);
	
}

