import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Alert,
    Pressable,
    StyleSheet,
    Button
} from 'react-native'
import React from 'react'
import { AccordionList } from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-paper';
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
    const [Per, setPer] = React.useState(0)
    const [count, setCount] = React.useState([])
    const [tempNum, settempNum] = React.useState(null)
    console.log(data);
    const _head = (item) => {
        return (
            <View style={styles.header} key={item.key}>
                <View >
                    <Text style={{ textAlign: "center" }}>{item.title}</Text>
                </View>
            </View>
        );
    }

    //increase counter
    const increase = () => {
        // setPer(count => count + 1);
        if (tempNum) {
            let sum = parseInt(count) + parseInt(tempNum);
            if (sum >= 1 && sum <= 99) {
                setPer({ count: sum, tempNum: null });
            } else {
                console.log("Number should be between 1 and 99");
                setPer({ error: "Number should be between 1 and 99" })
            }

        }
        else { 
            setPer({ count: count + 1 });
        }
    };

    //decrease counter
    const decrease = () => {
        setPer({ count: count - 1 });
    };

    const handleOnTextChange = (e) => {
        console.log(e);
        const number = e;
        console.log(number)
        if (number) {
           setPer({ [e.target.name]: number })
        }
    }


    const _body = (item) => {
        return (
            <View style={styles.body_container} key={item.key}>
                <View style={styles.form_container}>
                    <Text>Date: </Text>
                    <TextInput style={styles.textinputs} ></TextInput>
                    <Text>Particular: </Text>
                    <TextInput multiline={true} style={styles.textinputs}  ></TextInput>
                    <Text>Working in Percent:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", height: 32, marginTop: 5 }}>
                        <Button style={styles.plus_minus_btn} onPress={decrease} title='-' />
                        <TextInput placeholder="%" value={tempNum}  onChangeText={handleOnTextChange} style={styles.plus_minus_text} ></TextInput>
                        <Button style={styles.plus_minus_btn} onPress={increase} title='+' />
                    </View>
                    <View style={{ alignItems: "center" }}> 
                        <Pressable style={styles.sub_btn} >
                            <TouchableOpacity><Text>{Per}</Text></TouchableOpacity>
                        </Pressable>
                    </View>
                </View>
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
                    <TouchableOpacity style={styles.sub_btn} onPress={() => settaskModal(!taskModal)}><Text>hide</Text></TouchableOpacity>
                    <AccordionList
                        list={list}
                        header={_head}
                        isExpanded={false}
                        body={_body}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
            </Modal>

        </>
    )
}
export default TaskModal
const styles = StyleSheet.create({
    header: {
        borderWidth: 1,
        borderColor: "transparent",
        padding: 8,
        borderRadius: 2,
        margin: 2,
        marginTop: 10,
        backgroundColor: "transparent",
        elevation: 1
    },
    body_container: {
        alignSelf: "flex-start",
        marginHorizontal: 10,
    },
    modal_container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 200
    },
    textinputs: {
        fontSize: 13,
        // fontWeight: "bold",
        width: 200,
        // backgroundColor: "transparent",
        height: 20,
        padding: 2,
        paddingBottom: 5,
        elevation: 1,
        marginTop: 10,
    },
    sub_btn: {
        borderWidth: 3,
        borderColor: "transparent",
        backgroundColor: "whitesmoke",
        borderRadius: 3,
        elevation: 1,
        margin: 2,
        width: 60,
        alignItems: "center",
        color: "white",
        fontWeight: "bold"
    },
    form_container: {
        borderWidth: 1,
        borderColor: "transparent",
        padding: 5,
        borderRadius: 2,
        paddingHorizontal: 80,
        backgroundColor: "transparent",
        elevation: 1
    }, plus_minus_btn: {
        backgroundColor: "green",
        color: "white"

    }, plus_minus_text: {
        fontSize: 13,
        // fontWeight: "bold",
        width: 160,
        backgroundColor: "transparent",
        height: 18,
        padding: 2,
        paddingBottom: 5,
        // elevation: 1,
        marginTop: 10,
    }

})