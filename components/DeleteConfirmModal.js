import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { commonStyles } from '../styles/common';
import { modalStyles } from '../styles/modal';

import { Colors } from '../constants/colors';

const DeleteConfirmModal = props => {

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
              style={[commonStyles.button, commonStyles.redButton]}
              onPress={() => {
                if (props.onConfirm) props.onConfirm();
                props.setVisibility(!props.visible);
              }}>
              <Text style={commonStyles.redButtonText}>{props.deleteButtonText ? props.deleteButtonText : 'Usuń'}</Text>
            </Pressable>
            <Pressable
              style={[commonStyles.button, commonStyles.primaryButton]}
              onPress={() => {
                if (props.onCancel) props.onCancel();
                props.setVisibility(!props.visible);
              }}>
              <Text style={commonStyles.primaryButtonText}>{props.cancelButtonText ? props.cancelButtonText : 'Anuluj'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

  
export default DeleteConfirmModal;
