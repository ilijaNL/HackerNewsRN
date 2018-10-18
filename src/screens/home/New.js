import React from 'react';
import { connect } from 'react-redux';

import { getNewStories } from '../../redux/stories';
import StoryList from './StoryList';

const List = connect(state => ({
  data: state.stories.new,
  loading: state.stories.loading.new
}))(StoryList);

class New extends React.Component {
  componentDidMount() {
    this.props.getNewStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <List pullToRefresh={this.props.getNewStories} />;
  }
}

export default connect(
  null,
  { getNewStories }
)(New);
