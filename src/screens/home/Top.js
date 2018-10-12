import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getTopStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

const List = connect(state => ({
  data: state.stories.top
}))(StoryList);

class Top extends React.Component {
  componentDidMount() {
    this.props.getTopStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <List />;
  }
}

export default connect(
  null,
  { getTopStories }
)(Top);
