import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getTopStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

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
    return (
      <View style={{ backgroundColor: '#f6f6ef' }}>
        <List pullToRefresh={this.props.getTopStories} />
      </View>
    );
  }
}

export default connect(
  null,
  { getTopStories }
)(Top);
