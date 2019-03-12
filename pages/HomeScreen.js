import React from 'react';
import { Alert, Button, FlatList, Image, View, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './stylesheets/StyleSheets';



class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'My notes',
  };

  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      title: "",
      type: "",
    };
  }




  componentDidMount() {
    console.log("HOMESCREEN IS MOUNTED");
    let db = openDatabase({ name: 'postit' });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM notes', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }




  createPostIt = (props, typeN) => {

      const title = this.state.title;
      const content = "";
      const type = typeN;
      this.setState({type: typeN});

      db = openDatabase({ name: 'postit' });

      db.transaction(function(tx) {
        tx.executeSql(
          'INSERT INTO notes (title, content, type) VALUES (?, ?, ?)',
          [title, content, type],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            console.log(results);
            console.log(results.insertId);
            if (results.rowsAffected > 0 && type === "text") {
              ToastAndroid.show('Note created!', ToastAndroid.SHORT);
              props.reset([NavigationActions.navigate({ routeName: 'PostItReadNote', params: { itemId: results.insertId } })], 0);
            } else if (results.rowsAffected > 0 && type === "list") {
              ToastAndroid.show('Note created!', ToastAndroid.SHORT);
              props.reset([NavigationActions.navigate({ routeName: 'PostItReadList', params: { itemId: results.insertId } })], 0);
            } else {
              ToastAndroid.show('Registration failed!', ToastAndroid.SHORT);
            }
          }
        );
      });
    }

  render() {

    const loadingData = () => {
      console.log("BOUH!");
    }
    loadingData();


    return (
      <View style={styles.screen}>
        <View style={styles.postit}>
          <FlatList style={styles.homeContent}
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "text") {
                return (
                  <View key={item.id} >
                    <TouchableOpacity
                      style={styles.homeContainer}
                      onPress={() => this.props.navigation.navigate('PostItReadNote', {itemId: item.id })}
                    >
                      <Image
                        style={styles.flatlistHomeIcon}
                        source={require('../images/text.png')}
                      />
                      <Text style={styles.homeButtonText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return (
                  <View key={item.id} >
                    <TouchableOpacity
                      style={styles.homeContainer}
                      onPress={() => this.props.navigation.navigate('PostItReadList', {itemId: item.id })}
                    >
                      <Image
                        style={styles.flatlistHomeIcon}
                        source={require('../images/list.png')}
                      />
                      <Text style={styles.homeButtonText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
          />
        </View>
        <View style={styles.footer} >
          <View style={styles.itemContainer}>
            <TextInput
              style={styles.newItemInput}
              onChangeText={(title) => this.setState({title})}
              placeholder="Title of your new note..."
              value={this.state.title}
              autoFocus={false}
              autoCapitalize = 'sentences'
            />
            <View style={styles.homeImagesContainer} >
              <TouchableOpacity
                onPress={() => this.createPostIt(this.props.navigation, "text")}
              >
                <Image
                  style={styles.newItemIcon}
                  source={require('../images/text.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
               onPress={() => this.createPostIt(this.props.navigation, "list")}
             >
               <Image
                 style={styles.newItemIcon}
                 source={require('../images/list.png')}
               />
             </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
  }
}

export default HomeScreen;
