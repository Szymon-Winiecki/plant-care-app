import { StyleSheet } from "react-native";

import { Colors } from "../constants/colors"

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 600,
        color: Colors.textPrimary,
        marginHorizontal: 0,
        marginVertical: 10,
    },
    text: {
        color: Colors.textSecondary,
    },
    em: {
        fontSize: 20,
        fontWeight: 500,
        color: Colors.textPrimary,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 6,
        borderRadius: 4,
        textAlign: 'center',
    },
    buttonText: {
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    primaryButtonText: {
        color: Colors.textAlt,
    },
    secondaryButton: {
        backgroundColor: Colors.secondary,
    },
    secondaryButtonText: {
        color: Colors.textAlt,
    },
    iconButton: {
        padding: 5,
        margin: 6,
        borderRadius: 40,
    },
    iconButtonIcon: {
        width: 20,
        height: 20,
        margin: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonText: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600
    },
    input: {
        borderBottomWidth: 1,
        height: 46,
    },
    label: {
        fontWeight: 500,
        color: Colors.darkGrey,
    },
    property: {
        fontWeight: 600,
    },
});

export { styles as commonStyles }