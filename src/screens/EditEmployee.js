import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../constants/config';
const EditEmployee = ({navigation, route}) => {
  // const {id, name, email, mobile, address, role } = route.params
  const [id, setId] = React.useState(route.params.id);
  const [email, setEmail] = React.useState(route.params.email);
  const [name, setName] = React.useState(route.params.name);
  const [mobile, setMobile] = React.useState(route.params.mobile.toString());

  const [address, setAddress] = React.useState(route.params.address);
  const [role, setRole] = React.useState(route.params.role);

  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const [data, setData] = React.useState({
    isEmailEmpty: false,
    isNameEmpty: false,
    isAddressEmpty: false,
    isMobileEmpty: false,
    isRoleEmpty: false,
  });

  const textNameChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        isNameEmpty: false,
      });

      setName(e);
    } else {
      setData({
        isNameEmpty: true,
      });
    }
  };

  const textMobileChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        isMobileEmpty: false,
      });

      setMobile(e);
    } else {
      setData({
        isMobileEmpty: true,
      });
    }
  };

  const textAddressChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        isAddressEmpty: false,
      });

      setAddress(e);
    } else {
      setData({
        isAddressEmpty: true,
      });
    }
  };

  const textEmailChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        isEmailEmpty: false,
      });

      setEmail(e);

      if (
        /^[a-zA-Z0-9]+(?:[a-zA-Z]|\.(?!(\.|@))|\_(?!(\_|@))|\-(?!(\-|@)))+(?:[\w]|\.(?!(\.|@)))*@{1}[a-zA-Z0-9\-]+(?:\.(?!\.))*[a-zA-Z0-9\-]+(?:\.(?!\.))+[a-zA-Z]{2,7}$/g.test(
          e,
        )
      ) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }
    } else {
      setData({
        ...data,
        isEmailEmpty: true,
      });
    }
  };

  const textRoleChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        isRoleEmpty: false,
      });

      setRole(e);
    } else {
      setData({
        ...data,
        isRoleEmpty: true,
      });
    }
  };

  const isUpdated = async () => {
    const data = {
      //   _id: id,
      email: email,
      name: name,
      address: address,
      mobile: mobile,
      role: role,
    };
    try {
      await axios
        .post(`${BASE_URL}/emp/updateEmployee/${id}`, data)
        .then(response => {
          if (response.data.success) {
            Alert.alert(
              response.data.success ? 'Success' : 'Error',
              response.data.message,
            );
            navigation.navigate('Home');
          } else {
            Alert.alert(
              response.data.success ? 'Success' : 'Error',
              response.data.message,
            );
          }
        })
        .catch(error => {
          alert(error);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: '700',
            marginTop: 20,
            paddingBottom: 20,
          }}>
          Edit Employee Details
        </Text>
      </View>
      <ScrollView style={{height: '72%'}}>
        <View>
          {/* <Text>{id}</Text> */}
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.textField}
            value={name}
            onChangeText={event => textNameChange(event)}></TextInput>
          {data.isNameEmpty ? (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Name should not be empty.
            </Text>
          ) : null}
          <Text style={styles.inputText}>Email Id</Text>
          <TextInput
            style={styles.textField}
            value={email}
            onChangeText={event => textEmailChange(event)}></TextInput>
          {data.isEmailEmpty ? (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Email should not be empty.
            </Text>
          ) : !isValidEmail ? null : (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Email is not valid.
            </Text>
          )}
          <Text style={styles.inputText}>Mobile</Text>
          <TextInput
            style={styles.textField}
            value={mobile}
            onChangeText={event => textMobileChange(event)}></TextInput>
          {data.isMobileEmpty ? (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Mobile should not be empty.
            </Text>
          ) : null}
          <Text style={styles.inputText}>Address</Text>
          <TextInput
            style={styles.textField}
            value={address}
            onChangeText={event => textAddressChange(event)}></TextInput>
          {data.isAddressEmpty ? (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Address should not be empty.
            </Text>
          ) : null}
          <Text style={styles.inputText}> Role</Text>
          <TextInput
            style={styles.textField}
            value={role}
            onChangeText={event => textRoleChange(event)}></TextInput>
          {data.isRoleEmpty ? (
            <Text style={{marginLeft: 40, color: 'red'}}>
              Role should not be empty.
            </Text>
          ) : null}
        </View>

        <View style={styles.buttonSign}>
          <TouchableOpacity onPress={isUpdated}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    marginTop: 22,
    fontSize: 25,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  inputText: {
    marginLeft: 40,
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 10,
  },
  textField: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '80%',
    fontSize: 18,
  },
  buttonSign: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 30,
    width: '40%',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default EditEmployee;
