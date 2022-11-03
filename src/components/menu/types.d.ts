import { TransformOriginAnchorPosition } from '../../utils/calculations';
import {SVGProps} from "react";
import {TextStyle, ViewStyle} from "react-native";

export type MenuItemProps = {
  text: string;
  icon?: string | ((props:SVGProps<any>) => React.ReactElement);
  onPress?: (...args: any[]) => void;
  isTitle?: boolean;
  isDestructive?: boolean;
  withSeparator?: boolean;
  textStyle?:TextStyle;
  containerStyle?:ViewStyle
};

export type MenuListProps = {
  items: MenuItemProps[];
};

export type MenuInternalProps = {
  items: MenuItemProps[];
  itemHeight: number;
  itemWidth: number;
  itemY: number;
  itemX: number;
  anchorPosition: TransformOriginAnchorPosition;
  menuHeight: number;
  transformValue: number;
  actionParams: {
    [name: string]: (string | number)[];
  };
};
