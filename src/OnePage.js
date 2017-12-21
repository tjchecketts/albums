import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button, TextInput
} from 'react-native';
import AddDogName from './AddDogName';

const Realm = require('realm');

class OnePage extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({ realm });
    });
  }

  handleClicker() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Blue'});
      });
      this.setState({ realm });
    })
    // if you want to test if it works, you can call alert messages
    // .then(alert("You added 1 more Puppy!"))
  }

  handleSubmit = () => {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({ realm });
    })
    // .then(alert("it worked!"))
  }

  render() {
    const info = this.state.realm
      ? 'Number of Puppies in this Realm: ' 
      + this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
        <Button
          // dont use onPress={this.handleClicker}
          // writing it that way below binds it 
          // to the referrenced this
          onPress={() => this.handleClicker()}
          title="Add a nameless Puppy"
          accessibilityLabel="Click to add a Puppy"
          color="firebrick"
        />
        {/* <AddDogName /> */}
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder="Enter Puppy name"
            textAlign='center'
            value={this.state.text}
          />
          <Button
            title="Submit Puppy name"
            onPress={() => this.handleSubmit()}
          />
          {/* </Form> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
  },
});

export default OnePage;