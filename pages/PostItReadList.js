import React from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, View, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { NavigationActions } from 'react-navigation';
import styles from './stylesheets/StyleSheets';

let db;



class PostItReadList extends React.Component {

  static navigationOptions = {
    title: 'Read a list',
  };

  constructor(props) {
    super(props);
    this.state = {
      noteId: "",
      title: "",
      content: "",
      itemContent: "",
      FlatListItems: [],
      editTitle: false,
      editContent: false,
      itemDeleted: false,
    };

  }


  componentDidMount() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    console.log("DETAILSSCREEN is mounted");
    console.log(itemId);

    db = openDatabase({ name: 'postit' });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM notes WHERE id = ?',
       [itemId],
       (tx, results) => {
        console.log(results.rows.item(0));
        const postit = results.rows.item(0)
        this.setState({
          noteId: postit.id,
          title: postit.title,
          content: postit.content
        });
      });
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM items WHERE note_id = ?',
       [itemId],
       (tx, results) => {
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


  updateTitle = (props) => {

    const title = this.state.title;
    const id = this.state.noteId;

    db.transaction(function(tx) {
      tx.executeSql(
        'UPDATE notes SET title=? WHERE id=?',
        [title, id],
        (tx, results) => {
          // props.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0)
          ToastAndroid.show('Title updated!', ToastAndroid.SHORT);
        });
    });

    this.setState({editTitle: false});
  }


  addNewItem = (props) => {
    const noteId = this.state.noteId;
    const itemContent = this.state.itemContent;

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (note_id, item_content) VALUES (?, ?)',
        [noteId, itemContent],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.show('New item created!', ToastAndroid.SHORT);
            this.setState({itemContent: ""});
            props.reset([NavigationActions.navigate({ routeName: 'PostItReadList', params: { itemId: noteId } })], 0);
          } else {
            ToastAndroid.show('Error!', ToastAndroid.SHORT);
          }
        }
      );
    })
  }

  deletePostIt = () => {

    // db = openDatabase({ name: 'postit', createFromLocation: "~data.db" });

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE note_id=?',
        [this.state.noteId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('The deed is done!');
          } else {
            console.log('Nothing to delete here!');
          }
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM notes WHERE id=?',
        [this.state.noteId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            ToastAndroid.show('Note deleted!', ToastAndroid.SHORT);
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0);
          } else {
            ToastAndroid.show('Please insert a valid User Id!', ToastAndroid.SHORT);
          }
        }
      );
    });

  }

  deleteItem = (itemDeleted) => {
    const noteId = this.state.noteId;
    const itemId = itemDeleted.item_id;
    console.log("DELETE DELETE DELETE");
    console.log(itemId);

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE item_id=?',
        [itemId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.show('Congrats! Item Deleted!', ToastAndroid.SHORT);
            this.setState({itemDeleted: true});
            setTimeout( () => {
              this.props.navigation.reset([NavigationActions.navigate({ routeName: 'PostItReadList', params: { itemId: noteId } })], 0);
            }, 5000)
          } else {
            ToastAndroid.show('Error!', ToastAndroid.SHORT);
          }
        }
      );
    });
  }


  goHome = () => {
    if (this.state.editTitle || this.state.editContent) {
      Alert.alert(
        'Save',
        'Would you like to save these changes?',
        [
          {
            text: 'Nope',
            onPress: () => {
              ToastAndroid.show('Not saving!', ToastAndroid.SHORT);
              this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0);
            }
          },
          {
            text: 'Ok',
            onPress: () => {
              this.updateTitle();
              ToastAndroid.show('Saving!', ToastAndroid.SHORT);
              this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0);
    }
  }

  render() {

    return (
      <View style={styles.screen}>
        <View style={styles.postit}>

        { this.state.editTitle === false ?
            <View style={styles.title}>
              <Text style={styles.titleText}>{this.state.title}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ editTitle: true })}
              >
                <Image
                  style={styles.titleIcon}
                  source={require('../images/pencil.png')}
                />
              </TouchableOpacity>
            </View>
          :
          <View style={styles.title}>
            <TextInput
              style={styles.titleText}
              onChangeText={(title) => this.setState({title})}
              placeholder="Title..."
              value={this.state.title}
              autoFocus={true}
              autoCapitalize = 'sentences'
            />
            <TouchableOpacity
              onPress={() => this.updateTitle(this.props.navigation)}
            >
              <Image
                style={styles.titleIcon}
                source={require('../images/check-symbol.png')}
              />
            </TouchableOpacity>
          </View>
        }

        { this.state.itemDeleted ?
          <View>
            <Image
              style={styles.pinguinIcon}
              source={require('../images/tenor.gif')}
            />
          </View>
          : null
        }

          <FlatList style={styles.homeContent}
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer} key={item.item_id} >
                  <Text style={styles.homeButtonText}>{item.item_content}</Text>
                <TouchableOpacity
                  onPress={() => this.deleteItem(item)}
                >
                  <Image
                    style={styles.deleteItemIcon}
                    source={require('../images/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          />

        </View>
        <View style={styles.footer}>
          <View style={styles.itemContainer}>

            <TextInput
              style={styles.newItemInput}
              onChangeText={(itemContent) => this.setState({itemContent})}
              placeholder="New task..."
              value={this.state.itemContent}
              autoFocus={false}
              autoCapitalize = 'sentences'
            />
            <TouchableOpacity
              onPress={() => this.addNewItem(this.props.navigation) }
            >
              <Image
                style={styles.newItemIcon}
                source={require('../images/add-item.png')}
              />
            </TouchableOpacity>

          </View>
          <View style={styles.buttonsRow}>
            <View style={styles.button} >
              <TouchableOpacity
                style={styles.homeFooterButton}
                onPress={() => this.goHome() }
              >
                <Text style={styles.homeButtonText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button} >
              <TouchableOpacity
                style={styles.homeFooterButton}
                onPress={() => this.deletePostIt()}
              >
                <Text style={styles.homeButtonText}>Delete note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


export default PostItReadList;
