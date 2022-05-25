import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

function DoneModal({ doneModal, setdoneModal }) {
    return (
        <>
            {/* <View>  {val}</View> */}
            <View style={{ backgroundColor: "whitesmoke" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={doneModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setDoneModal(!doneModal);
                    }}>
                    <View style={{ backgroundColor: "whitesmoke",flex:1 }}>

                        <TouchableOpacity onPress={() => setdoneModal(!doneModal)}><Text>hide</Text></TouchableOpacity>
                    </View>

                </Modal>
                {/* <TouchableOpacity onPress={() => setDoneModal(true)}><Text>show</Text></TouchableOpacity> */}
            </View>
        </>
    )
}
export default DoneModal