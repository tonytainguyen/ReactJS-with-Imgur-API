var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');
var Actions = require('../actions');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function() {
		return {
			image: null
		}
	},
	componentWillMount: function() {
		Actions.getImage(this.props.params.id);
	},
	render: function() {
		return (
			<div>
			Image Detail {this.state.image ? this.renderContent() : null}
			</div>
		)
	},
	renderContent: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4>{this.state.image.title}</h4>
				</div>
				<div className="panel-body">
					{this.renderImage()}
				</div>
				<div className="panel-footer">
					<h5>{this.state.image.description}</h5>
				</div>
			</div>
		);
	},
	renderImage: function() {
		if(this.state.image.animated) {
			return (
				<video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
					<source src={this.state.image.mp4} type="video/mp4"></source>
				</video>
			)
		} else {
			return <img src={this.state.image.link} />
		}
	},
	getImage: function() {

	},
	onChange: function() {
		this.setState({
			image: ImageStore.find(this.props.params.id)
		});
	}
});