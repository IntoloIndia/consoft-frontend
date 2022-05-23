import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { icons } from '../../../constants'


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avai_task}>
          <Text style={styles.avai_text}>Available Tasks</Text>
        </View>
        <View>
          <Image
            style={styles.icon1}
            source={icons.task}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avai_task: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    width: 280,
    marginBottom: 35

  },
  avai_text: {
    textAlign: "center",
    marginTop: 4,
    padding:5,
    paddingBottom:10

  },
  icon1: {
    width: 45,
    borderRadius:10, 
    borderWidth:2,
    padding:5,
    height: 45,
    marginTop:10,
    marginHorizontal:5
  }

})

export default HomeScreen
