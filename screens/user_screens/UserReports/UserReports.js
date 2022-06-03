import React from 'react'
import { View, Animated, Easing, Switch, Text, FlatList, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES, dummyData } from '../../../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CheckBox, Layout, Card } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

MaterialCommunityIcons.loadFont()

const UserReports = () => {

  const [selectedId, setSelectedId] = React.useState(null)
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [comp_team, setcomp_team] = React.useState(false);
  const [pro_team, setpro_team] = React.useState(false);
  const [contract_team, setcontract_team] = React.useState(false);
  const [contract_lab_team, setcontract_lab_team] = React.useState(false);
  const [toggle_report, settoggle_report] = React.useState(true);
  // console.log(selectedId);
  let opacity = new Animated.Value(0);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const OnSelectedActiveItem = (activeItem,index) => {
    console.log(activeItem);
    console.log(index);

    setSelectedId(activeItem)
    // console.log(selectedId);
    if (activeItem.name == 'Company Team' && activeItem.id==index+1) {
      // settoggle_report(!toggle_report)
      setcomp_team(true)
      isEnabled?animate(Easing.out(Easing.exp)):animate(Easing.out(Easing.exp))
      // alert("com team");
      setpro_team(false)
      setcontract_team(false)
      setcontract_lab_team(false)
    }
    else if(activeItem.name == 'Project Team') {
      setpro_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setcontract_team(false)
      setcontract_lab_team(false)
      // alert("pro team");
    }
    else if(activeItem.name == 'Contractor Team') {
      setcontract_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setpro_team(false)
      setcontract_lab_team(false)
      // alert("contra team");
    }
    else if(activeItem.name == "Contractor's Labour") {
      setcontract_lab_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setpro_team(false)
      setcontract_team(false)
      // alert("con labour");
    }

    
  }

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80]
  });


  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size
    }
  ];


  function Company_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Company view function</Text>
      </View>
    )
  }
  function Project_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Project view function</Text>
      </View>
    )
  }
  function Contract_team_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Contract_team view function</Text>
      </View>
    )
  }
  function Contract_labour_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Contract_labour view function</Text>
      </View>
    )
  }

  // function render_selected_report(item) {


  // }

  const renderItem = ({ item,index }) => {


    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white2, position: "relative" }}>
        <View style={{
          paddingHorizontal: 110, paddingVertical: 70

        }}>
          <TouchableOpacity
            style={[styles.rend_rep_card, { backgroundColor: (selectedId?.id == item.id) ? "#26D1B2" : COLORS.gray3 }]}
            onPress={
              () => {
                OnSelectedActiveItem(item,index);     
              }
            }
          >
            <Text style={{ ...FONTS.body4 }}>{item.name}</Text>

            {
              (item.name == 'Company Team') ?
                (<Switch
                  trackColor={{ false: "#767577", true: "gray" }}
                  thumbColor={isEnabled ? "#30a566" : "#f4f3f4"}
                  disabled={false}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  activeText={'On'}
                  inActiveText={'Off'}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                // circleActiveColor={'#30a566'}
                // circleInActiveColor={'#000000'}
                />) : null
            }
          </TouchableOpacity>

        </View>

        <Divider style={{ backgroundColor: COLORS.transparentPrimary, marginHorizontal: 8 }} />
        {/* <View> */}
        {comp_team?item.name=='Company Team' && (Company_view()) :null}
        {pro_team?item.name=='Project Team' && (Project_view()) :null}
        {contract_team?item.name=='Contractor Team' && (Contract_team_view()) :null}
        {contract_lab_team?item.name=="Contractor's Labour" && (Contract_labour_view()) :null}
        {/* </View> */}
      </View>
    );
  };


  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SIZES.body1 }}>
        <View >
          <Text style={{ ...FONTS.h2, color: COLORS.blue }}>Manpower</Text>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: COLORS.white2, paddingHorizontal: SIZES.base, marginHorizontal: -SIZES.padding * 0.95, top: SIZES.base }}>
          <Pressable style={{ marginRight: 5 }}>
            <FontAwesome5 name='arrow-circle-left' size={SIZES.h2} />
          </Pressable>
          <Pressable>
            <FontAwesome5 name='arrow-circle-right' size={SIZES.h2} />
          </Pressable>
        </View>
      </View>
      <Text
        style={{
          paddingHorizontal: SIZES.h3 * 2,
          paddingVertical: SIZES.base,
          ...FONTS.body5,
          color: COLORS.red
        }}

      >Ongoing 8 Reports</Text>
      <Divider style={{ backgroundColor: COLORS.transparentPrimary, marginHorizontal: 8 }} />
      <View>
        <Animated.FlatList />
        <FlatList
          data={dummyData.Reports_part}
          renderItem={( item, index ) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedId}
          horizontal
        />
      </View>


      {/* some space then start selected report sections */}
      {/* {isEnabled?Company_view():null } */}

    </>
  )
}

export default UserReports

const styles = StyleSheet.create({

  rend_rep_card: {
    padding: SIZES.largeTitle,
    margin: 5,
    borderRadius: 10,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  boxContainer: {
    height: 160,
    alignItems: "center"
  },
})