
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FontAwesome from 'react-fontawesome'
import SpotifyAuthenticationFrame from '../components/SpotifyAuthenticationFrame'
import ConfirmationButton from '../components/ConfirmationButton'
import PusherConnectionList from '../components/PusherConnectionList'
import Header from '../components/Header'

import * as pusherActions from '../services/pusher/actions'
import * as mopidyActions from '../services/mopidy/actions'
import * as spotifyActions from '../services/spotify/actions'

class Settings extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			mopidy_host: this.props.mopidy.host,
			mopidy_port: this.props.mopidy.port,
			pusher_username: this.props.pusher.username,
			pusher_port: this.props.pusher.port,
			spotify_country: this.props.spotify.country,
			spotify_locale: this.props.spotify.locale
		};
	}

	resetAllSettings(){
		localStorage.clear();
		window.location.reload(true);
		return false;
	}

	setMopidyConfig(e){
		e.preventDefault();
		this.props.mopidyActions.setConfig({ host: this.state.mopidy_host, port: this.state.mopidy_port });
		window.location.reload(true);
		return false;
	}

	setPusherConfig(e){
		e.preventDefault();
		this.props.pusherActions.changeUsername( this.state.pusher_username );
		this.props.pusherActions.setConfig({ port: this.state.pusher_port });
		return false;
	}

	setSpotifyConfig(e){
		e.preventDefault();
		this.props.spotifyActions.setConfig({ country: this.state.spotify_country, locale: this.state.spotify_locale });
		return false;
	}

	componentWillReceiveProps(newProps){
		if( this.state.pusher_username != newProps.pusher.username ){
			this.setState({
				pusher_username: newProps.pusher.username
			})
		}
	}

	render(){
		return (
			<div className="view settings-view">
				<Header
					icon="cog"
					title="Settings"
					/>

				<section>

					<h3 className="underline">Mopidy</h3>
					<form onSubmit={(e) => this.setMopidyConfig(e)}>
						<label>
							<div className="label">Host</div>
							<div className="input">
							<input 
								type="text"
								onChange={ e => this.setState({ mopidy_host: e.target.value })} 
								value={ this.state.mopidy_host } />
							</div>
						</label>
						<label>
							<div className="label">Port</div>
							<div className="input">
							<input 
								type="text"
								onChange={ e => this.setState({ mopidy_port: e.target.value })} 
								value={ this.state.mopidy_port } />
							</div>
						</label>
						<button type="submit" className="secondary">Apply</button>
					</form>

					<h3 className="underline">Pusher</h3>
					<form onSubmit={(e) => this.setPusherConfig(e)}>
						<label>
							<div className="label">Username</div>
							<div className="input">
							<input 
								type="text"
								onChange={ e => this.setState({ pusher_username: e.target.value })} 
								value={ this.state.pusher_username } />
							</div>
						</label>
						<label>
							<div className="label">Port</div>
							<div className="input">
							<input 
								type="text"
								onChange={ e => this.setState({ pusher_port: e.target.value })} 
								value={ this.state.pusher_port } />
							</div>
						</label>
						<button type="submit" className="secondary">Apply</button>
					</form>

					<h3 className="underline">Spotify</h3>
					<form onSubmit={(e) => this.setSpotifyConfig(e)}>
						<label>
							<div className="label">Country</div>
							<div className="input">
							<input 
								type="text"
								onChange={ e => this.setState({ spotify_country: e.target.value })} 
								value={ this.state.spotify_country } />
							</div>
						</label>
						<label>
							<div className="label">Locale</div>
							<div className="input">
								<input 
									type="text"
									onChange={ e => this.setState({ spotify_locale: e.target.value })} 
									value={ this.state.spotify_locale } />
							</div>
						</label>
						<button type="submit" className="secondary">Apply</button>
					</form>

			        <SpotifyAuthenticationFrame />

			        <ConfirmationButton content="Reset all settings" confirmingContent="Are you sure?" onConfirm={() => this.resetAllSettings()} />

					<h3 className="underline">Advanced</h3>
					<label>
						<div className="label">Connections</div>
						<div className="input">
			        		<PusherConnectionList />
			        	</div>
			        </label>

		        </section>
			</div>
		);
	}
}


/**
 * Export our component
 *
 * We also integrate our global store, using connect()
 **/

const mapStateToProps = (state, ownProps) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		pusherActions: bindActionCreators(pusherActions, dispatch),
		mopidyActions: bindActionCreators(mopidyActions, dispatch),
		spotifyActions: bindActionCreators(spotifyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)