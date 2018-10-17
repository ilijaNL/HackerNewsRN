import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    padding: 10,
    paddingRight: 5,
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 0
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15
  },
  rightIconsContainer: {
    marginRight: 5
  }
});

class Header extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    backButton: PropTypes.bool.isRequired
  };

  render() {
    const { backButton, popScreen } = this.props;
    return (
      <View style={styles.container}>
        {backButton && (
          <TouchableOpacity style={styles.backIcon} onPress={popScreen}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        )}
        <Text numberOfLines={2} style={styles.title}>
          {this.props.title}
        </Text>
        {this.props.rightButtons &&
          this.props.rightButtons.length > 0 && (
            <View style={styles.rightIconsContainer}>
              {this.props.rightButtons.map(btn => (
                <TouchableOpacity
                  key={btn.icon}
                  style={styles.backIcon}
                  onPress={btn.action}
                >
                  <Icon name={btn.icon} size={30} />
                </TouchableOpacity>
              ))}
            </View>
          )}
      </View>
    );
  }
}

export default Header;
