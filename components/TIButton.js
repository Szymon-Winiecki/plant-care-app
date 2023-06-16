import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { commonStyles } from '../styles/common';
import { Colors } from '../constants/colors'

const TIButton = props => {

  const buttonStyles = [];
  const textStyles = [];
  const iconStyles = [];

  if (props.flexButton) buttonStyles.push([commonStyles.flexButton, { flex: 1 }]);
  else buttonStyles.push(commonStyles.button);

  if (props.buttonStyle) buttonStyles.push(props.buttonStyle);
  else buttonStyles.push(commonStyles.primaryButton);

  if (props.textStyle) textStyles.push(props.textStyle);
  else textStyles.push(commonStyles.primaryButtonText);

  if (props.iconStyle) iconStyles.push(props.iconStyle);
  else iconStyles.push(commonStyles.buttonIcon);

  if (props.icon && props.text && props.gap) textStyles.push({ marginLeft: props.gap });
  else if (props.icon && props.text) textStyles.push({ marginLeft: 10 });



  return (
    <Pressable
      style={buttonStyles}
      onPress={() => { if (props.onPress) props.onPress() }}
    >
      <View style={commonStyles.row}>
        {props.icon && <Image style={iconStyles} source={props.icon}></Image>}
        {props.text && <Text style={textStyles}>{props.text}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listElementText: {
    width: '60%',
    fontSize: 14,
    fontWeight: 500,
  },
  plantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,

    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  }
})

export default TIButton;
