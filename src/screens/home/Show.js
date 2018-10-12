import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getShowStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

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
    return (
      <View style={{ backgroundColor: '#f6f6ef' }}>
        <List pullToRefresh={this.props.getShowStories} />
      </View>
    );
  }
}

export default connect(
  null,
  { getShowStories }
)(Show);
