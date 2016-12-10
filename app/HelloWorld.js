import React from 'react';
import axios from 'axios';
import uuid from 'uuid/v1';

export default class TodoApp extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			userId: null,
			isSuccess: false,
			signeeList: []
		}

	}
	
	componentDidMount() {
		axios.get('https://5bq2v7mgi5.execute-api.us-east-1.amazonaws.com/prod/worskshopExample2?TableName=g0v-workshop')
		.then(response => {
			this.setState({
				signeeList: response.data.Items
			})
		})
	}


	handleClick = () => {
		// console.log('hsiao a click me');
		axios.post('https://5bq2v7mgi5.execute-api.us-east-1.amazonaws.com/prod/worskshopExample2', {
			'Item': {
				userId: uuid(),
				name: this.state.name,
				email: this.state.email
			},
			'TableName': 'g0v-workshop'
		})
		.then(response => {
			if (response.status == 200) {
				this.setState({
					isSuccess: true,
					name: '',
					email: ''
				})
			}
		})

	}

	handleChangeName = (event) => {
		this.setState({
			name: event.target.value
		})
	}

	handleChangeEmail = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	render() {

		const signeeList = this.state.signeeList.map(
			signee => (
				<li>
					<p>Name: {signee.name} </p>
					<p>Email: {signee.email} </p>
				</li>
			)
		)		
		return(
			<div>
				<h1> Hello {this.props.user} </h1>
				<h2> 來連署吧 </h2>
				<input 
					placeholder="your name" 
					onChange={this.handleChangeName}
					value={this.state.name}
				/>
				<br />
				<input 
					placeholder="your email" 
					onChange={this.handleChangeEmail} 
					value={this.state.email}
				/>
				<br />
				<button onClick={this.handleClick} > 連署 </button>
				{this.state.isSuccess && <p> 感謝你參與連署！ </p> }

				<h2> 已參與聯署者 </h2>
				<ul>
					{signeeList}
				</ul>
			</div>
			)
	}
}