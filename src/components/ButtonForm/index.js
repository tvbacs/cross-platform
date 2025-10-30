import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';


export default function ButtonForm({
  title,
  icon,
  color = Colors.light.primary,
  onPress,
}) {
  return (
   <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.content}>
        {icon === 'google' ? (
          <View style={styles.iconContainer}>
            <Ionicons name="logo-google" size={20} color="red" />
          </View>
        ) : icon ? (
          <View style={styles.iconContainer}>
              <Ionicons style={styles.icon} name={icon} size={20} color='white' />
          </View>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width:"100%",
    marginTop:30
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    size:30,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft:10
  },
});