import {
  Button,
  Pressable,
  StyleSheetProperties,
  TextProps,
} from 'react-native';
import * as React from 'react';
import { View } from 'react-native/Libraries/Components/View/View';
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable';
import { PropsWithChildren } from 'react/index';

const CustomButton: React.FC<
  PropsWithChildren<PressableProps & React.RefAttributes<View>>
> = ({ children, ...props }) => <Pressable {...props}>{children}</Pressable>;
export { CustomButton };
