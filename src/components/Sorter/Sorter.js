import React, {Component} from 'react';
import './Sorter.css'

export class Sorter extends Component{

	state = {
		optionSelected: 'audi'
	}

	changeOptionSelected = (event) => {
		this.setState({optionSelected: event.target.value})
		this.props.changeOrder(event.target.value)
	}

	render(){
		return (
	    <div className="sorter">
	    	<h3>Sort By:</h3>
	    		<select className="sorter-select" onChange={this.changeOptionSelected} value={this.state.optionSelected}>
					  <option  value='newest'>Newest</option>
					  <option  value='oldest'>Oldest</option>
					</select>
	    </div>
  	);
	}
  
}

