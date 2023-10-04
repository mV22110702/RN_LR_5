import { Button, Modal, TextInput, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import { CustomButton } from './CustomButton';

type Properties = {
  doShowAddSectionModal: boolean;
  handleCloseAddSectionModal: () => void;
  handleAddSection: (formData: AddSectionFormData) => void;
};

type AddSectionFormData = {
  name: string;
};
const AddSectionModal: React.FC<Properties> = ({
  doShowAddSectionModal,
  handleCloseAddSectionModal,
  handleAddSection,
}) => {
  const [sectionName, setSectionName] = useState<string>('');
  const handleSectionNameChange = useCallback(
    (text: string) => {
      setSectionName(text);
    },
    [setSectionName],
  );
  const handleAddSectionPress = useCallback(() => {
    handleAddSection({ name: sectionName });
    handleCloseAddSectionModal();
  }, [handleAddSection, handleCloseAddSectionModal, sectionName]);
  const handleShow = useCallback(() => {
    setSectionName('');
  }, [setSectionName]);

  return (
    <Modal
      transparent
      onShow={handleShow}
      visible={doShowAddSectionModal}
      onDismiss={handleCloseAddSectionModal}
      onRequestClose={handleCloseAddSectionModal}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: 200,
          height: 400,
          marginHorizontal: '25%',
          marginVertical: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 25 }}>Add new group</Text>
        <TextInput
          style={{
            marginVertical: 40,
            backgroundColor: '#f5f5f5',
            width: '80%',
          }}
          value={sectionName}
          onChangeText={handleSectionNameChange}
        />
        <CustomButton
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          disabled={!sectionName}
          onPress={handleAddSectionPress}
        >
          <Text style={{ color: 'white' }}>Ok</Text>
        </CustomButton>
        <CustomButton
          style={{
            backgroundColor: 'red',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          onPress={handleCloseAddSectionModal}
        >
          <Text style={{ color: 'white' }}>Cancel</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};

export { AddSectionModal, type AddSectionFormData };
