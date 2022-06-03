import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../constants/config';
const EmpDetails = ({navigation, route}) => {
  const {id, name} = route.params;
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      try {
        axios
          .get(`${BASE_URL}/emp/getEmpById/${id}`)
          .then(response => {
            if (response.data) {
              setData(response.data);
            }
          })
          .catch(error => console.log('error---', error.message));
      } catch (error) {
        console.log(error.message);
      }
    }, []),
  );
  console.log('line 37 empDetails', data);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.buttonSign}>
          <Text style={styles.buttonText}>Add New Emloyee</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: 'black',
            fontWeight: '700',
            marginTop: 10,
          }}>
          Employee Details
        </Text>
      </View>

      {data.map((emp, index) => (
        <View key={index}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.textField}
            value={emp.name}
            editable={false}></TextInput>

          <Text style={styles.inputText}>Email Id</Text>
          <TextInput
            style={styles.textField}
            value={emp.email}
            editable={false}></TextInput>

          <Text style={styles.inputText}>Mobile</Text>
          <TextInput
            style={styles.textField}
            editable={false}
            value={emp.mobile.toString()}></TextInput>

          <Text style={styles.inputText}>Address</Text>
          <TextInput
            style={styles.textField}
            value={emp.address}
            editable={false}></TextInput>
          <Text style={styles.inputText}> Role</Text>
          <TextInput
            style={styles.textField}
            value={emp.role}
            editable={false}></TextInput>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  heading: {
    marginTop: 22,
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  inputText: {
    marginLeft: 40,
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
    paddingTop: 20,
  },
  textField: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: '80%',
    fontSize: 18,
  },
  buttonSign: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    width: '40%',
    marginLeft: '50%',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },

  name: {
    borderWidth: 1,

    height: 'auto',
    backgroundColor: '#cbb3a9',
    textAlign: 'center',
    paddingTop: 5,
    borderColor: '#cbb3a9',

    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    width: '25%',
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 20,
    paddingTop: 3,
  },
});

export default EmpDetails;
