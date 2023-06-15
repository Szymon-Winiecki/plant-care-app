import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '70%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
    },
    modalBody: {
        paddingHorizontal: 35,
        paddingVertical: 10,
    },
    modalFooter: {
        width: '100%',
        alignItems: 'center',
        padding: 5,
        marginTop: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 500
    },
    modalText: {

    },
});

export { styles as modalStyles };