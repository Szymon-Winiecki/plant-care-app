import { StyleSheet } from "react-native";

import { Colors } from "../constants/colors"

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 30,
        fontWeight: 600,
        color: Colors.textBrand
    },
    em: {
        fontSize: 20,
        fontWeight: 500,
        color: Colors.textPrimary,
    },
    primaryButton: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 6,
        borderRadius: 4,
    },
    primaryButtonText: {
        color: Colors.textAlt,
    },
});

export { styles as commonStyles}