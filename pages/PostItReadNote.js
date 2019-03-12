import React from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, View, Text, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { NavigationActions } from 'react-navigation';
import styles from './stylesheets/StyleSheets';

let db;



class PostItReadNote extends React.Component {

  static navigationOptions = {
    title: 'Read a note',
  };

  constructor(props) {
    super(props);
    this.state = {
      noteId: "",
      title: "",
      content: "",
      editTitle: false,
      editContent: false,
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
  }


  updateTitle = () => {

    const title = this.state.title;
    const id = this.state.noteId;

    db.transaction(function(tx) {
      tx.executeSql(
        'UPDATE notes SET title=? WHERE id=?',
        [title, id],
        (tx, results) => {
          ToastAndroid.show('Saved!', ToastAndroid.SHORT);
        });
    });

    this.setState({editTitle: false});
  }

  updateContent = () => {

    const content = this.state.content;
    const id = this.state.noteId;

    db.transaction(function(tx) {
      tx.executeSql(
        'UPDATE notes SET content=? WHERE id=?',
        [content, id],
        (tx, results) => {
          ToastAndroid.show('Saved!', ToastAndroid.SHORT);
        });
    });

    this.setState({editContent: false});
  }



  deletePostIt = () => {

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM notes where id=?',
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


  goHome = () => {
    if (this.state.editTitle || this.state.editContent) {
      Alert.alert(
        'Save',
        'Would you like to save these changes?',
        [
          {
            text: 'Nope',
            onPress: () => {
              ToastAndroid.show('Not saved!', ToastAndroid.SHORT);
              this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0);
            }
          },
          {
            text: 'Ok',
            onPress: () => {
              this.updateTitle();
              this.updateContent();
              ToastAndroid.show('Saved!', ToastAndroid.SHORT);
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

            { this.state.editContent === false ?
                <View style={styles.content}>
                  <Text style={styles.contentText}>{this.state.content}</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ editContent: true })}
                  >
                    <Image
                      style={styles.contentIcon}
                      source={require('../images/pencil.png')}
                    />
                  </TouchableOpacity>
                </View>
              :
              <View style={styles.content}>
                <TextInput
                  style={styles.contentText}
                  onChangeText={(content) => this.setState({content})}
                  placeholder="Content..."
                  value={this.state.content}
                  autoFocus={true}
                  multiline={true}
                  autoCapitalize = 'sentences'
                />
                <TouchableOpacity
                  onPress={() => this.updateContent(this.props.navigation)}
                >
                  <Image
                    style={styles.contentIcon}
                    source={require('../images/check-symbol.png')}
                  />
                </TouchableOpacity>
              </View>
            }

        </View>
        <View style={styles.footer}>
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

export default PostItReadNote;
