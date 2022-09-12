import { gql } from '@apollo/client';

export const PLAYING_MOVIES = gql`
	query nowPlayingMovies {
		nowPlayingMovies {
			genres {
				id
				name
			}
			id
			popularity
			release_date
			review {
				title
				year
				rottenScore
				metaScore
				boxOffice
				year
			}
			title
			vote_average
			vote_count
		}
	}
`;
