import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

import PlayerProvider from './contexts/PlayerContext'
import App from './components/App'

const theme = {
	primary: '#75634F',
	secondary: '#542929',
	text: {
		main: '#D6D6D6',
		primary: '#8F7251',
		secondary: '#764343',
		default: {
			300: '#3A3A3A',
			400: '#383838',
			500: '#6B6B6B',
			600: '#A3A3A3',
			700: '#D6D6D6',
			800: '#C1C1C1',
			900: '#FFFFFF',
		},
	},
	background: {
		default: '#070707',
		footer: '#060606',
		sidebar: '#0A0A0A',
		main: '#060606',
		card: '#141414',
		content: '#111111',
		cardHover: '#343434',
	},
	phoneOnly: '@media (max-width: 599px)',
	tabletPortraitUp: '@media (min-width: 600px)',
	tabletLandscapeUp: '@media (min-width: 900px)',
	desktopUp: '@media (min-width: 1200px)',
	desktopBigUp: '@media (min-width: 1800px)',
}

const GlobalStyle = createGlobalStyle`
	${normalize}

	*, html, body, #root {
		margin: 0;
		box-sizing: border-box;
		font-family: 'Nunito', sans-serif;
	}

	body, html, #root {
		background-color: ${props => props.theme.background.default};
		color: ${props => props.theme.text.default[600]};
		height: 100%;
		width: 100%;}


	@font-face {
        font-family: 'Monoton';
		src: url(/fonts/Monoton-Regular.ttf);
	}
	
	@font-face {
		font-family: 'Nunito';
		src: url(/fonts/NunitoSans-Regular.ttf),
		url(/fonts/NunitoSans-SemiBold.ttf),
		url(/fonts/NunitoSans-Bold.ttf);
		font-weight: normal;
		font-style: normal;
    }
	
	@font-face {
		font-family: 'MontserratBold';
		src: url(/fonts/Montserrat-ExtraBold.ttf);
    }
`

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<PlayerProvider>
				<GlobalStyle />
				<App />
			</PlayerProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
