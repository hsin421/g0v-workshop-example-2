import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld.js';

class App extends React.Component{
	render() {
		return <HelloWorld user="world" id="12345" />
	}
}



render(<App />, document.getElementById('app'))
