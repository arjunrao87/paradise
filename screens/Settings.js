import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return <ExpoConfigView />;
  }
}
