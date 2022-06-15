import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LogBox,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar, TextButton} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import AddProjectTeamModal from '../Modals/AddProjectTeamModal.js';

const ProjectTeam = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [showAddTeamModal, setShowAddTeamModal] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleExpanded = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const teamdetail = [
    {
      id: 1,
      name: 'Shivam Verma',
      email: 'shivam@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 2,
      name: 'Rahul Shrivastav',
      email: 'rahul@gmail.com',
      mobile: 9988776655,
      designation: 'Architect',
    },
    {
      id: 3,
      name: 'Chotu Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 4,
      name: 'Aman Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 5,
      name: 'Arvind Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 6,
      name: 'Anup Patil',
      email: 'patil@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 7,
      name: 'Jeet',
      email: 'singh@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 8,
      name: 'Demo',
      email: 'demo@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 9,
      name: 'Demo1',
      email: 'demo1@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
  ];
  const [teamdetails, setTeamDetails] = React.useState(teamdetail);

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: SIZES.base,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
          <View style={{flex: 1, marginLeft: SIZES.radius}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                }}>
                Mr.{item.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    alert('edit name');
                  }}>
                  <Image
                    source={icons.edit}
                    style={{
                      width: 18,
                      height: 18,
                      right: 15,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('delete name');
                  }}>
                  <Image
                    source={icons.delete_icon}
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{...FONTS.body4}}>
              Designation - {item.designation}
            </Text>
          </View>
          {/* <Image
            source={icons.down_arrow}
            resizeMode="contain"
            style={{height: 15, width: 15, tintColor: COLORS.darkGray}}
          /> */}
        </TouchableOpacity>
      </View>
    );
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>List</Text>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={false}
          data={teamdetails}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} title="Project Team" />
      <TextButton
        label="Add New Team"
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
        }}
        onPress={() => setShowAddTeamModal(true)}
      />
      {showAddTeamModal && (
        <AddProjectTeamModal
          isVisible={showAddTeamModal}
          onClose={() => setShowAddTeamModal(false)}
        />
      )}
      <ScrollView>{renderTeamList()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ProjectTeam;
