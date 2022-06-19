import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Switch,
  Linking,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, Apis} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {FormInput, TextButton} from '../../Components';
import utils from '../../utils';
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {
  const makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${+91-988774455}';
    } else {
      phoneNumber = 'telprompt:${+919988774455}';
    }
    Linking.openURL(phoneNumber);
  };

  const [switchValue, setSwitchValue] = React.useState(false);
  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const [userMobileNo, setUserMobileNo] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userMobileNoError, setUserMobileNoError] = React.useState('');

  const [companyMobileNo, setCompanyMobileNo] = React.useState('');
  const [companyPassword, setCompanyPassword] = React.useState('');
  const [companyMobileNoError, setCompanyMobileNoError] = React.useState('');

  const [showPass, setShowPass] = React.useState(false);

  function isEnableLogin() {
    return (
      userMobileNo != '' &&
      userMobileNoError == '' &&
      companyMobileNo != '' &&
      companyMobileNoError == ''
    );
  }
  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Login Successfully',
      text2: 'Success',
      visibilityTime: 400,
    });

  const showToastError = () =>
    Toast.show({
      position: 'top',
      type: 'error',
      text1: 'Please Enter Valid Mobile No. and Password',
      text2: 'Error',
      visibilityTime: 4000,
    });
  const userOnSubmit = () => {
    const UserData = {
      mobile: userMobileNo,
      password: userPassword,
    };
    console.log(data);
    fetch(`${Apis.API_URL.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.access_token) {
          showToast();
          setTimeout(() => {
            navigation.navigate('UserDashboard');
          }, 200);
        }
        if (!data.access_token) {
          showToastError();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const companyOnSubmit = () => {
    const Companydata = {
      mobile: companyMobileNo,
      password: companyPassword,
    };
    console.log(Companydata);
    fetch(`${Apis.API_URL.BASE_URL}/company-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Companydata),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.access_token) {
          showToast();
          setTimeout(() => {
            if (data.role == 'Editor' || data.role == 'Administrator') {
              navigation.navigate('Home');
            }
          }, 200);
        }
        if (!data.access_token) {
          showToastError();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function renderHeaderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.consoft_PNG}
          resizeMode="contain"
          style={{
            height: 100,
          }}
        />
      </View>
    );
  }
  function renderHeaderImage() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.build_f}
          resizeMode="contain"
          style={{
            width: '60%',
          }}
        />
      </View>
    );
  }
  function renderUserForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <View>
          <FormInput
            placeholder="Mobile No."
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChange={value => {
              //validate email
              utils.validateNumber(value, setUserMobileNoError);
              setUserMobileNo(value);
            }}
            errorMsg={userMobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    userMobileNo == '' ||
                    (userMobileNo != '' && userMobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      userMobileNo == ''
                        ? COLORS.gray
                        : userMobileNo != '' && userMobileNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            placeholder="Password"
            secureTextEntry={!showPass}
            keyboardType="default"
            autoCompleteType="password"
            onChange={value => setUserPassword(value)}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onPress={() => setShowPass(!showPass)}>
                <Image
                  source={showPass ? icons.eye_close : icons.eye}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
                />
              </TouchableOpacity>
            }
          />
          <TextButton
            label="Login"
            // disabled={isEnableSignIn() ? false : true}
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              // backgroundColor: isEnableSignIn()
              //   ? COLORS.lightblue_900
              //   : COLORS.transparentPrimary,
            }}
            onPress={userOnSubmit}
          />
        </View>
      </View>
    );
  }
  function renderCompanyForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <View>
          <FormInput
            placeholder="Mobile No."
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChange={value => {
              //validate email
              utils.validateNumber(value, setCompanyMobileNoError);
              setCompanyMobileNo(value);
            }}
            errorMsg={companyMobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    companyMobileNo == '' ||
                    (companyMobileNo != '' && companyMobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      companyMobileNo == ''
                        ? COLORS.gray
                        : companyMobileNo != '' && companyMobileNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            placeholder="Password"
            secureTextEntry={!showPass}
            keyboardType="default"
            autoCompleteType="password"
            onChange={value => setCompanyPassword(value)}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onPress={() => setShowPass(!showPass)}>
                <Image
                  source={showPass ? icons.eye_close : icons.eye}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
                />
              </TouchableOpacity>
            }
          />
          <TextButton
            label="Login"
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
            }}
            onPress={companyOnSubmit}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 1.5,
            justifyContent: 'center',
            paddingBottom: SIZES.base,
          }}>
          <TouchableOpacity onPress={() => console.log('Demo Video')}>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body3,
                fontWeight: 'bold',
              }}>
              Demo &{' '}
            </Text>
          </TouchableOpacity>
          <TextButton
            label="Free 7-days trial"
            buttonContainerStyle={{
              marginLeft: 4,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.rose_600,
              ...FONTS.h3,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('CompanyRegistration')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: SIZES.padding,
          }}>
          <TextButton
            label="Purchase & Register"
            buttonContainerStyle={{
              backgroundColor: COLORS.lightblue_900,
              paddingHorizontal: SIZES.padding * 2,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.base,
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate('CompanyRegistration')}
          />
        </View>
        <View
          style={{
            marginHorizontal: SIZES.padding * 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightblue_900,
              padding: 5,
              borderRadius: SIZES.base,
            }}
            onPress={() => console.log('Send Email')}>
            <Image
              source={icons.mail}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightblue_600,
              padding: 5,
              borderRadius: SIZES.base,
            }}
            onPress={makeCall}>
            <Image
              source={icons.call}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 5,
              borderRadius: SIZES.base,
            }}
            onPress={() => console.log('Send Whatsappp Message')}>
            <Image
              source={icons.whatsapp}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              padding: 5,
              borderRadius: SIZES.base,
            }}
            onPress={() => console.log('Website')}>
            <Image
              source={icons.website}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderToggleButton() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 4,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            marginRight: SIZES.base,
            color: switchValue ? COLORS.gray : COLORS.black,
          }}>
          User Login
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          value={switchValue}
          trackColor={{false: COLORS.gray, true: COLORS.gray}}
          thumbColor={switchValue ? COLORS.white : COLORS.white}
          ios_backgroundColor={COLORS.blue}
        />
        <Text
          style={{
            ...FONTS.h3,
            marginLeft: SIZES.base,
            color: switchValue ? COLORS.black : COLORS.gray,
          }}>
          Company Login
        </Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.lightblue_50, COLORS.lightblue_300]}
        style={{flex: 1}}>
        {renderHeaderLogo()}
        <Toast config={showToast} />
        <Toast config={showToastError} />
        <ScrollView>
          {renderHeaderImage()}
          {renderToggleButton()}
          {switchValue ? renderCompanyForm() : renderUserForm()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Login;