import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../constants/config';
import EmpDetails from './EmpDetails';
import {Card} from 'react-native-paper';
const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let id;
      try {
        axios
          .get(`${BASE_URL}/emp/getAllEmp`)
          .then(response => {
            if (response.data) {
              setData(response.data);
            }
          })
          .catch(error => console.log('error---', error.message));
      } catch (error) {
        console.log(error.message);
      }
    }),
  );
  const deleteEmp = _id => {
    // console.log('64======', _id);
    try {
      axios
        .post(`${BASE_URL}/emp/deleteEmployee/${_id}`, {id: _id})
        .then(response => {
          if (response.data.success == true) {
            alert('Successfully Deleted the employee');
            navigation.replace('Home');
          }
        })
        .catch(error => console.log('error---', error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: 25,
          color: 'black',
          borderBottomWidth: 1,
          paddingBottom: 5,
          paddingTop: 10,
          borderColor: 'grey',
        }}>
        Employee Management System
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.buttonSign}>
        <Text style={styles.buttonText}>Add New Emloyee</Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: '700',
            paddingTop: 20,
          }}>
          List of Employees
        </Text>
      </View>

      {data.map((item, id) => (
        <View
          key={item._id}
          style={{
            flexDirection: 'row',
            alignContent: 'space-between',
            alignItems: 'center',
            marginLeft: 8,
            marginRight: 8,

            marginTop: 20,
          }}>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{marginBottom: 10, justifyContent: 'center'}}>
                    Are You Sure You Want to Delete The Emloyee ??
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => deleteEmp(item._id)}
                      style={{...styles.button, backgroundColor: 'blue'}}>
                      <Text style={styles.modalText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{...styles.button, backgroundColor: 'tomato'}}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.modalText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              backgroundColor: 'white',
              elevation: 5,
              height: '120%',
            }}>
            <View style={{width: '40%', marginRight: 10, alignSelf: 'center'}}>
              <Text style={styles.name}> {item.name} </Text>
            </View>

            <View
              style={{
                width: '60%',
                flexDirection: 'row',

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: '#95D279'}}
                onPress={() =>
                  navigation.navigate('EmpDetails', {
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    mobile: item.mobile,
                    address: item.address,
                    role: item.role,
                  })
                }>
                <Text style={styles.smallButtonText}>Read</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: 'blue'}}
                onPress={() =>
                  navigation.navigate('EditEmployee', {
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    mobile: item.mobile,
                    address: item.address,
                    role: item.role,
                  })
                }>
                <Text style={styles.smallButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{...styles.button, backgroundColor: 'red'}}>
                <Text style={styles.smallButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  smallButtonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',

    alignSelf: 'center',
    padding: 5,
  },

  name: {
    padding: 5,

    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    width: '25%',
    textAlign: 'center',
    marginRight: 20,

    paddingTop: 3,
  },
  modalText: {
    marginBottom: 5,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    marginTop: '50%',

    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignSelf: 'center',
    height: '30%',
    width: '80%',
    elevation: 10,
  },
});

export default Home;
