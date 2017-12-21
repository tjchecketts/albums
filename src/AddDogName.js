import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Form, 
  Button
} from 'react-native';

class AddDogName extends Component {

  state = { text: '' }

  handleSubmit = () => {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({ realm });
    }).then(alert("it worked!"))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          AddDogName Component
        </Text>
        {/* <Form
          ref={c => this._form = c} // assign a ref
          type={Text}
        > */}
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder="Enter Puppy name"
            textAlign='center'
            value={this.state.text}
          />
          <Button
            title="This one doesn't re-render"
            onPress={() => this.handleSubmit()}
          />
          {/* </Form> */}
      </View>
    )
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

export default AddDogName;