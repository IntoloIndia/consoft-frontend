import { View, Text, Modal, TouchableOpacity, Alert, Pressable,StyleSheet } from 'react-native'
import React from 'react'
import { AccordionList } from 'accordion-collapse-react-native';

const data =
{
    list: [
        {
            id: 1,
            title: 'Task 1',
            body: 'AccordionListBody'
        },
        {
            id: 2,
            title: 'Task 2',
            body: 'AccordionListBody'
        }
    ]
}

function TaskModal({ taskModal, settaskModal }) {

    const [list, setlist] = React.useState(data.list)
    console.log(data);
    function _head(item) {
        return (
            <View style={styles.header} key={item.key}>
                <Text>{item.title}</Text>
            </View>
        );
    }

    function _body(item) {
        return (
            <View style={styles.body_container} key={item.key}>                        
                    <Text>S.no</Text>
                    <Text>Date</Text>
                    <Text>Particular</Text>
                    <Text>Working Percentage</Text>
                    <Pressable >
                        <Text>Submit</Text>
                    </Pressable>               
            </View>
        );
    }

    return (
        <>
            
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={taskModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        settaskModal(!taskModal);
                    }}>
                    <View style={styles.modal_container}>
                        <AccordionList
                            list={list}
                            header={_head}
                            isExpanded={false}
                            body={_body}
                            keyExtractor={(item) => item.key}
                        />
                        <TouchableOpacity onPress={() => settaskModal(!taskModal)}><Text>hide</Text></TouchableOpacity>
                    </View>
                </Modal>            
        </>
    )
}
export default TaskModal
const styles=StyleSheet.create({
    header:{
        borderColor:"black",
        borderWidth:1,
        padding:8,
        borderRadius:10,
        margin:5        
    },
    body_container:{
        // flex:1,

    },
    modal_container:{
        flex:1,
        backgroundColor:"whitesmoke",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        marginTop:10
    }
})