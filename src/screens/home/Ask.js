import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getAskStories } from '../../redux/stories';
import StoryList from '../../components/StoryList';

const List = connect(state => ({
  data: state.stories.ask,
  loading: state.stories.loading.ask
}))(StoryList);

class Ask extends React.Component {
  componentDidMount() {
    this.props.getAskStories();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f6f6ef' }}>
        <List pullToRefresh={this.props.getAskStories} />
      </View>
    );
  }
}

export default connect(
  null,
  { getAskStories }
)(Ask);
