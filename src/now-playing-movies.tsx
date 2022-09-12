import { useQuery } from '@apollo/client';
import { VizzuChart } from './vizzu';
import { PLAYING_MOVIES } from './playing-movies';

interface Movie {
	id: number;
	popularity: number;
	release_date: string;
	title: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	genres: {
		id: number;
		name: string;
	}[];
	review: {
		title: string;
		year: string;
		rottenScore: number;
		metaScore: number;
		boxOffice: number;
	};
}

const series = [
	{ name: 'Title', type: 'dimension' },
	{ name: 'Category', type: 'dimension' },
	{ name: 'Score', type: 'measure' }
];

const channels = {
	x: { set: ['Title'] },
	y: { set: ['Score', 'Category'] },
	color: { attach: ['Category'] }
};

const style = {
	plot: {
		paddingBottom: 150,
		xAxis: {
			label: {
				angle: 2.3,
				fontSize: 11
			}
		}
	}
};

export const NowPlayingMovies = () => {
	const { loading, error, data } = useQuery<{ nowPlayingMovies: Movie[] }>(
		PLAYING_MOVIES
	);

	const records = data?.nowPlayingMovies
		.filter((movie) => Boolean(movie.review.rottenScore))
		.reduce((acc: [string, string, number][], movie) => {
			return acc.concat([
				[
					movie.title,
					movie?.genres[0]?.name ?? 'N/A',
					movie?.review?.rottenScore ?? 0
				]
			]);
		}, []);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<VizzuChart
			tooltip
			title="Now Playing Movies By Rotten Score / Category"
			data={{
				series: series as any,
				records: records as any
			}}
			config={{
				channels
			}}
			style={style}
		/>
	);
};
