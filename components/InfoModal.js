import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { commonStyles } from '../styles/common';
import { modalStyles } from '../styles/modal';

import { Colors } from '../constants/colors';

const InfoModal = props => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.setVisibility(!props.visible);
      }}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>{props.title}</Text>
          </View>
          <View style={modalStyles.modalBody}>
            {props.body}
          </View>
          <View style={modalStyles.modalFooter}>
            <Pressable
              style={[commonStyles.button, commonStyles.primaryButton]}
              onPress={() => {
                props.setVisibility(!props.visible)
              }}>
              <Text style={commonStyles.primaryButtonText}>ok</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

});

export default InfoModal;
