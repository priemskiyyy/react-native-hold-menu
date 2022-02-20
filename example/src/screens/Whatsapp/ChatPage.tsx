import React, { memo, useMemo, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';
import { HoldMenuFlatList } from 'react-native-hold-menu';
import { MenuItemProps } from '../../../../src/components/menu/types';

const ChatPage = () => {
  const { theme } = useAppContext();
  const data = useMemo(() => mockWhatsAppData(100), []);

  const replyMessage = useCallback((messageId: string | number | undefined) => {
    Alert.alert(`[ACTION]: REPLY' ${messageId}`);
  }, []);

  const copyMessage = useCallback(
    (messageText: string | number | undefined) => {
      Alert.alert(`[ACTION]: REPLY' ${messageText}`);
    },
    []
  );

  const editMessage = useCallback(
    (messageText: string | number | undefined) => {
      Alert.alert(`[ACTION]: REPLY' ${messageText}`);
    },
    []
  );

  const senderMenu = useMemo(
    (): MenuItemProps[] => [
      {
        text: 'Reply',
        icon: 'corner-down-left',
        onPress: replyMessage,
      },
      {
        text: 'Copy',
        icon: 'copy',
        onPress: copyMessage,
      },
      {
        text: 'Edit',
        icon: 'edit',
        onPress: editMessage,
      },
      {
        text: 'Forward',
        icon: 'corner-up-right',
        onPress: () => {},
      },
      {
        text: 'Delete',
        isDestructive: true,
        icon: 'trash-2',
        onPress: () => {},
      },
    ],
    [replyMessage, copyMessage, editMessage]
  );

  const receiverMenu = useMemo(
    () => [
      {
        text: 'Reply',
        icon: 'corner-down-left',
        onPress: () => {},
      },
      {
        text: 'Copy',
        icon: 'copy',
        onPress: copyMessage,
      },
      {
        text: 'Like',
        icon: 'thumbs-up',
        onPress: () => {},
      },
      {
        text: 'Forward',
        icon: 'corner-up-right',
        onPress: () => {},
      },
    ],
    [copyMessage]
  );

  const renderMessage = useCallback(
    ({ item }) => (
      <MessageItem
        senderMenu={senderMenu}
        receiverMenu={receiverMenu}
        message={item}
      />
    ),
    [senderMenu, receiverMenu]
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const themeStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: StyleGuide.palette.whatsapp[theme].chatBackground,
      },
    };
  }, [theme]);

  return (
    <HoldMenuFlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      style={themeStyles.container}
      contentContainerStyle={styles.contentContainer}
      windowSize={5}
      maxToRenderPerBatch={4}
    />
  );
};

export default memo(ChatPage);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
  },
});
