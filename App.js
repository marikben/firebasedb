import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

const firebaseConfig = {
      apiKey: "AIzaSyB4T6AEg8LfAUitsK3cB_dEqTVkNk3DLk4",
      authDomain: "fir-db-82f7e.firebaseapp.com",
      databaseURL: "https://fir-db-82f7e-default-rtdb.firebaseio.com",
      projectId: "fir-db-82f7e",
      storageBucket: "fir-db-82f7e.appspot.com",
      messagingSenderId: "986508601146",
      appId: "1:986508601146:web:b3579b0a25996806edd203",
      //measurementId: "G-1GPCFRY1H9"
    };
   
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setItems(prods);
    });
  }, []);

  const saveItem = () => {
    //to clear the input fields
    setAmount('')
    setProduct('')
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    );
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };
  
  
  return (
    <View style={styles.container}>
    <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(product) => setProduct(product)}
      value={product}/> 
    <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(amount) => setAmount(amount)}
      value={amount}/>       
    <Button onPress={saveItem} title="Add" /> 
    <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
    <FlatList 
      style={{marginLeft : "5%"}}
      keyExtractor={item => item.id} 
      renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.amount} </Text>
      </View>} 
      data={items} 
      ItemSeparatorComponent={listSeparator} 
    />      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});
