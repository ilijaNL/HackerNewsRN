import React from 'react';
import { connect } from 'react-redux';
import { getTopStories } from '../../redux/stories';
import StoryList from './StoryList';

const List = connect(state => ({
  data: state.stories.top,
  loading: state.stories.loading.top
}))(StoryList);

class Top extends React.Component {
  componentDidMount() {
    this.props.getTopStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <List pullToRefresh={this.props.getTopStories} />;
  }
}

export default connect(
  null,
  { getTopStories }
)(Top);
