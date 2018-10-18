import React from 'react';
import { connect } from 'react-redux';
import { getShowStories } from '../../redux/stories';
import StoryList from './StoryList';

const List = connect(state => ({
  data: state.stories.show,
  loading: state.stories.loading.show
}))(StoryList);

class Show extends React.Component {
  componentDidMount() {
    this.props.getShowStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <List pullToRefresh={this.props.getShowStories} />;
  }
}

export default connect(
  null,
  { getShowStories }
)(Show);
