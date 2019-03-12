import React from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  homeButton: {
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ff6871',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  homeContent: {
    flex: 1,
    backgroundColor: '#d2dde4',
  },

  homeFooterButton: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom:10,
    backgroundColor:'#ff6871',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
  },

  homeButtonText: {
    fontFamily: 'Roboto',
    color:'black',
    paddingLeft : 10,
    paddingRight : 10,
  },


  homeImagesContainer: {
      flexDirection: 'row',
    },

    itemContainer: {
      marginRight:10,
      marginLeft:10,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#ff6871',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    homeContainer: {
      marginRight:10,
      marginLeft:10,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#ff6871',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
    },

    newItemInput: {
      padding: 0,
      paddingLeft: 10,
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 16,
      color: 'black',
    },



  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#d2dde4',
  },
    postit: {
      flex: 1,
      // alignItems: 'stretch',
    },
      title: {
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ff6871',
        margin: 10,
        height: 50,
        backgroundColor: '#d2dde4',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      titleText: {
        flex: 1,
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 0,
        color: 'black',
      },

      titleIcon: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        width: 20,
      },
      contentIcon: {
        margin: 5,
        height: 20,
        width: 20,
      },



      content: {
        flex: 1,
        backgroundColor: '#d2dde4',
        textAlignVertical: 'top',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      contentText: {
        flex: 1,
        textAlignVertical: 'top',
        fontFamily: 'Roboto',
        fontSize: 16,
        padding: 0,
        color: 'black',
      },



    footer: {
      justifyContent: 'flex-end',
      margin: 0,
      marginBottom: 10,
    },
      buttonsRow: {
        flexDirection: 'row',
      },
        button: {
          flex: 1,
        },


    flatlistHomeIcon: {
      marginLeft: 10,
      height: 20,
      width: 20,
    },

    newItemIcon: {
      marginRight: 10,
      height: 20,
      width: 20,
    },

    deleteItemIcon: {
      marginRight: 10,
      height: 20,
      width: 20,
    },

    pinguinIcon: {
      height: 200,
      width: 200,
      alignSelf: 'center',
    },

});
