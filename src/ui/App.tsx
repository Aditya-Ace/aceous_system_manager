import { useEffect } from 'react';

import { Statistics } from '../../types';

const App = () => {
	useEffect(() => {
		window.electron.subscribeStatistics((statistics: Statistics) =>
			console.log(statistics)
		);
	}, []);
	return <main>Hello</main>;
};

export default App;
