import {
  StyleSheet, Text, View, Image,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import yelp from '../../api/yelp'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null)

  const id = route.params.id
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getResult(id);
  }, [])
  if (!result) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title} >{result.name}</Text>
      <Text style={styles.phone}>{result.phone}</Text>
      <View style={styles.icon}>
        {
          result.is_closed ? (<FontAwesome5 name="door-closed" size={30} color="black" />)
          : (<FontAwesome5 name="door-open" size={30} color="black" />)
        }
      </View>
      <ScrollView style={styles.imageContainer}>
        {Array(3).fill().map((_, index) => (
          <Image
            style={styles.image}
            source={{ uri: result.image_url }}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    margin: 10,
    borderRadius: 10
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginVertical: 10
  },
  phone: {
    alignSelf: 'center',
    fontSize: 20
  },
  icon: {
    alignSelf: 'center'
  }
})