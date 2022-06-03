import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../constants/config';
const Register = ({navigation}) => {
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const [data, setData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    role: '',
    isNameEmpty: false,
    isEmailEmpty: false,
    isMobileEmpty: false,
    isAddressEmpty: false,
    isroleEmpty: false,
  });

  const textNameChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        name: e,
        isNameEmpty: false,
      });
    } else {
      setData({
        ...data,
        name: e,
        isNameEmpty: true,
      });
    }
  };

  const textEmailChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        email: e,
        isEmailEmpty: false,
      });

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
        email: e,
        isEmailEmpty: true,
      });
    }
  };

  const textMobileChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        mobile: e,
        isMobileEmpty: false,
      });
    } else {
      setData({
        ...data,
        mobile: e,
        isMobileEmpty: true,
      });
    }
  };

  const textAddressChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        address: e,
        isAddressEmpty: false,
      });
    } else {
      setData({
        ...data,
        address: e,
        isAddressEmpty: true,
      });
    }
  };

  const textRoleChange = e => {
    if (e.length != 0) {
      setData({
        ...data,
        role: e,
        isroleEmpty: false,
      });
    } else {
      setData({
        ...data,
        role: e,
        isroleEmpty: true,
      });
    }
  };

  const onSubmit = async () => {
    if (
      data.name == '' &&
      data.email == '' &&
      data.mobile == '' &&
      data.address == '' &&
      data.role == ''
    ) {
      setData({
        ...data,
        isNameEmpty: true,
        isEmailEmpty: true,
        isMobileEmpty: true,
        isAddressEmpty: true,
        isroleEmpty: true,
      });
    } else if (data.name == '') {
      setData({
        ...data,
        isNameEmpty: true,
      });
    } else if (data.email == '') {
      setData({
        ...data,
        isEmailEmpty: true,
      });
    } else if (data.mobile == '') {
      setData({
        ...data,
        isMobileEmpty: true,
      });
    } else if (data.address == '') {
      setData({
        ...data,
        isAddressEmpty: true,
      });
    } else if (data.role == '') {
      setData({
        ...data,
        isroleEmpty: true,
      });
    } else {
      try {
        await axios
          .post(`${BASE_URL}/emp/addNewEmpReg`, {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            address: data.address,
            role: data.role,
          })
          .then(response => {
            Alert.alert(response.data.message);
            setData({
              ...data,
              name: '',
              email: '',
              mobile: '',
              address: '',
              role: '',
            });
            navigation.navigate('Home');
          })
          .catch(error => Alert.alert(error.message));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={Styles.container}>
      <View style={{paddingTop: 15, paddingBottom: 20}}>
        <Text style={Styles.headText}>Fill Your Details</Text>
      </View>
      <ScrollView>
        <View>
          <View>
            <Text style={Styles.fieldText}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={Styles.textInput}
              value={data.name}
              onChangeText={event => textNameChange(event)}
            />
            {data.isNameEmpty ? (
              <Text style={{marginLeft: 40, color: 'red'}}>
                Name should not be empty.
              </Text>
            ) : null}
          </View>
          <View>
            <Text style={Styles.fieldText}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={Styles.textInput}
              value={data.email}
              onChangeText={event => textEmailChange(event)}
            />
            {data.isEmailEmpty ? (
              <Text style={{marginLeft: 40, color: 'red'}}>
                Email should not be empty.
              </Text>
            ) : !isValidEmail ? null : (
              <Text style={{marginLeft: 40, color: 'red'}}>
                Email is not valid.
              </Text>
            )}
          </View>
          <View>
            <Text style={Styles.fieldText}>Mobile</Text>
            <TextInput
              placeholder="9999999999"
              style={Styles.textInput}
              value={data.mobile}
              onChangeText={event => textMobileChange(event)}
            />
            {data.isMobileEmpty ? (
              <Text style={{marginLeft: 40, color: 'red'}}>
                Mobile should not be empty
              </Text>
            ) : null}
          </View>
          <View>
            <Text style={Styles.fieldText}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              style={Styles.textInput}
              value={data.address}
              onChangeText={event => textAddressChange(event)}
              multiline={true}
              numberOfLines={1}
            />
          </View>
          <View>
            <Text style={Styles.fieldText}>Role</Text>
            <TextInput
              placeholder="Enter your Role"
              style={Styles.textInput}
              value={data.role}
              onChangeText={event => textRoleChange(event)}
            />
            {data.isroleEmpty ? (
              <Text style={{marginLeft: 40, color: 'red'}}>
                Role should not be empty.
              </Text>
            ) : null}
          </View>

          <View style={Styles.buttonSign}>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={Styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 25,
  },
  //
  fieldText: {
    marginLeft: 40,
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
    paddingTop: 5,
  },
  textInput: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '80%',
    fontSize: 18,
  },
  buttonSign: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'tomato',
    padding: 5,
    borderRadius: 30,
    width: '35%',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});
