import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
	uri: process.env.STEPZEN_URI,
	cache: new InMemoryCache(),
	headers: {
		authorization: process.env.STEPZEN_API_KEY || ''
	}
});

const rootElement = document.getElementById('root');
render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	rootElement
);
