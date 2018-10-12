import React from 'react';
import { connect } from 'react-redux';
import { getAskStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

const List = connect(state => ({
  data: state.stories.ask
}))(StoryList);

class Ask extends React.Component {
  componentDidMount() {
    this.props.getAskStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <List pullToRefresh={this.props.getAskStories} />;
  }
}

export default connect(
  null,
  { getAskStories }
)(Ask);
