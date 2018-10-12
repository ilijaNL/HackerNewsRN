import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getNewStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

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
    return (
      <View style={{ backgroundColor: '#f6f6ef' }}>
        <List pullToRefresh={this.props.getNewStories} />
      </View>
    );
  }
}

export default connect(
  null,
  { getNewStories }
)(New);
