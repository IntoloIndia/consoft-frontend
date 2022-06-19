import React from 'react';
import {View, Image} from 'react-native';
import {HeaderBar} from '../../Components';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import {COLORS, images, icons, SIZES, Apis} from '../../constants';
import {FormInput, TextButton} from '../../Components';
import Toast from 'react-native-toast-message';

<<<<<<< HEAD:screens/OnBoarding/CompanyRegistration.js
const CompanyRegistration = ({navigation}) => {
=======


const url = 'http://192.168.1.99:8000/api/company';

const CreateCompany = ({navigation}) => {
>>>>>>> 94543fa2e1910b67598eb44acdc9059cf899c1b1:screens/OnBoarding/CreateCompany.js
  const [cName, setCName] = React.useState('');
  const [cPanNo, setCPanNo] = React.useState('');
  const [cMobileNo, setCMobileNo] = React.useState('');
  const [cEmail, setCEmail] = React.useState('');

  const [cNameError, setCNameError] = React.useState('');
  const [cPanNoError, setCPanNoError] = React.useState('');
  const [cMobileNoError, setCMobileNoError] = React.useState('');
  const [cEmailError, setCEmailError] = React.useState('');

  function isEnableCreateCompany() {
    return (
      cName != '' &&
      cNameError == '' &&
      cPanNo != '' &&
      cPanNoError == '' &&
      cMobileNo != '' &&
      cMobileNoError == '' &&
      cEmail != '' &&
      cEmailError == ''
    );
  }

  const showToast = () =>
    Toast.show({
      position: 'top',
      topOffset: 10,
      type: 'success',
      text1: 'Successfully Created Company',
      text2: 'Success',
      visibilityTime: 700,
    });

  const showToastError = () =>
    Toast.show({
      position: 'top',
      topOffset: 10,
      type: 'error',
      text1: 'Email & Mobile No. is Already Exist',
      text2: 'If you want to continue with us, click on CONTINUE & PAYMENT',
      visibilityTime: 4000,
    });

  const onSubmit = () => {
    const data = {
      company_name: cName,
      pan: cPanNo,
      mobile: cMobileNo,
      email: cEmail,
    };

    console.log(data);

    fetch(`${Apis.API_URL.BASE_URL}/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 200) {
          showToast();
          setTimeout(() => {
            navigation.navigate('VerifyProductKey');
          }, 350);
        }
        if (data.status != 200) {
          showToastError();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="registration" />

      <Toast config={showToast} />
      <Toast config={showToastError} />

      <AuthLayout image={images.create_company} title="Let's Create Company">
        <View
          style={{
            marginHorizontal: SIZES.padding,
          }}>
          <FormInput
            label="Name"
            keyboardType="default"
            autoCompleteType="name"
            onChange={value => {
              utils.validateText(value, setCNameError);
              setCName(value);
            }}
            errorMsg={cNameError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    cName == '' || (cName != '' && cNameError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      cName == ''
                        ? COLORS.gray
                        : cName != '' && cNameError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            label="Pan No."
            keyboardType="default"
            onChange={value => {
              utils.validateText(value, setCPanNoError);
              setCPanNo(value);
            }}
            errorMsg={cPanNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    cPanNo == '' || (cPanNo != '' && cPanNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      cPanNo == ''
                        ? COLORS.gray
                        : cPanNo != '' && cPanNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            label="Mobile No."
            keyboardType="phone-pad"
            onChange={value => {
              utils.validateNumber(value, setCMobileNoError);
              setCMobileNo(value);
            }}
            errorMsg={cMobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    cMobileNo == '' || (cMobileNo != '' && cMobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      cMobileNo == ''
                        ? COLORS.gray
                        : cMobileNo != '' && cMobileNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            label="Email"
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={value => {
              utils.validateEmail(value, setCEmailError);
              setCEmail(value);
            }}
            errorMsg={cEmailError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    cEmail == '' || (cEmail != '' && cEmailError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      cEmail == ''
                        ? COLORS.gray
                        : cEmail != '' && cEmailError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <TextButton
            label="Save & Continue"
            // disabled={isEnableCreateCompany() ? false : true}
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              //   backgroundColor: isEnableCreateCompany()
              //     ? COLORS.lightblue_900
              //     : COLORS.transparentPrimary,
            }}
            onPress={onSubmit}
          />
        </View>
      </AuthLayout>
    </View>
  );
};

export default CompanyRegistration;