import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

function InProgressModal({ inProgressModal, setinProgressModal }) {
    return (
        <>
            {/* <View>  {val}</View> */}
            <View style={{ backgroundColor: "whitesmoke" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={inProgressModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setinProgressModal(!inProgressModal);
                    }}>
                    <View style={{ backgroundColor: "whitesmoke",flex:1 }}>

                        <TouchableOpacity onPress={() => setinProgressModal(!inProgressModal)}><Text>hide</Text></TouchableOpacity>
                    </View>

                </Modal>
                {/* <TouchableOpacity onPress={() => setInProgressModal(true)}><Text>show</Text></TouchableOpacity> */}
            </View>
        </>
    )
}
export default InProgressModal