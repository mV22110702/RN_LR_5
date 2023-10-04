import { View, Text, Button, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { CustomButton } from './CustomButton';

type Properties = {
  title: string;
  id: string;
  handleDeleteSection: (id: string) => void;
  handleShowAddTodoModal: (sectionId: string) => void;
};
const SectionHeader: React.FC<Properties> = ({
  title,
  id,
  handleDeleteSection,
  handleShowAddTodoModal,
}) => {
  console.log(`TITLE:${title}`);
  const handleDeleteSectionPress = useCallback(() => {
    handleDeleteSection(id);
  }, [handleDeleteSection]);

  const handleAddTodoPress = useCallback(() => {
    handleShowAddTodoModal(id);
  }, [handleShowAddTodoModal]);
  return (
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <Text
        style={{ fontSize: 20, marginRight: 20, textAlignVertical: 'center' }}
      >
        {title}
      </Text>
      <CustomButton
        style={{
          backgroundColor: 'red',
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}
        onPress={handleDeleteSectionPress}
      >
        <Text style={{ color: 'white' }}>Remove</Text>
      </CustomButton>
      <CustomButton
        style={{
          backgroundColor: 'green',
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}
        onPress={handleAddTodoPress}
      >
        <Text style={{ color: 'white' }}>Add Todo</Text>
      </CustomButton>
    </View>
  );
};

export { SectionHeader };
