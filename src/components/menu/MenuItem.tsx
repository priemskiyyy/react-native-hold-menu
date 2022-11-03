import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import Separator from './Separator';
import styles from './styles';

import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { CONTEXT_MENU_STATE, IS_IOS } from '../../constants';
import { BORDER_LIGHT_COLOR, BORDER_DARK_COLOR } from './constants';
import isEqual from 'lodash.isequal';
import { getColor } from './calculations';

const ItemComponent = IS_IOS ? TouchableOpacity : GHTouchableOpacity;
// @ts-ignore
const AnimatedTouchable = Animated.createAnimatedComponent(ItemComponent);

type MenuItemComponentProps = {
  item: MenuItemProps;
  isLast?: boolean;
};

const MenuItemComponent = ({ item, isLast }: MenuItemComponentProps) => {
  const { state, theme, menuProps } = useInternal();

  const borderStyles = useAnimatedStyle(() => {
    const borderBottomColor =
      theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR;

    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1,
    };
  }, [theme, isLast, item]);

  const textColor = useAnimatedStyle(() => {
    return { color: getColor(item.isTitle, item.isDestructive, theme.value),...item?.textStyle };
  }, [theme, item]);

  const handleOnPress = useCallback(() => {
    if (!item.isTitle) {
      const params = menuProps.value.actionParams[item.text] || [];
      if (item.onPress) item.onPress(...params);
      state.value = CONTEXT_MENU_STATE.END;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, item]);

  return (
    <>
      <AnimatedTouchable
        onPress={handleOnPress}
        activeOpacity={!item.isTitle ? 0.4 : 1}
        style={[styles.menuItem, borderStyles,item?.containerStyle]}
      >
        <Animated.Text
          style={[
            item.isTitle ? styles.menuItemTitleText : styles.menuItemText,
            textColor,
          ]}
          numberOfLines={1}
        >
          {item.text}
        </Animated.Text>
        {/*{!item.isTitle && item.icon && typeof item.icon !== 'string' && (*/}
        {/*  <AnimatedIcon name={item.icon} height={18} color={'red'} style={textColor} />*/}
        {/*)}*/}
        {!item.isTitle && item.icon && typeof item.icon !== 'string' && item.icon({
          width:18,
          height:18,
          color:getColor(item.isTitle, item.isDestructive, theme.value)
        })}
      </AnimatedTouchable>
      {item.withSeparator && <Separator />}
    </>
  );
};

const MenuItem = React.memo(MenuItemComponent, isEqual);
export default MenuItem;
