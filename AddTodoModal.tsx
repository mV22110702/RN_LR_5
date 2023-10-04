import { Modal, TextInput, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import { CustomButton } from './CustomButton';
import {
  DateTimePickerEvent,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
type Properties = {
  doShowAddTodoModal: boolean;
  handleCloseAddTodoModal: () => void;
  handleAddTodo: (formData: AddTodoFormData) => void;
};

type AddTodoFormData = {
  description: string;
  dueDate: Date;
};

const AddTodoModal: React.FC<Properties> = ({
  doShowAddTodoModal,
  handleCloseAddTodoModal,
  handleAddTodo,
}) => {
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const handleDescriptionChange = useCallback(
    (text: string) => {
      setDescription(text);
    },
    [setDescription],
  );
  const handleDueDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date | undefined) => {
      setDueDate(date || null);
    },
    [setDueDate],
  );

  const handleChooseDatePress = useCallback(() => {
    DateTimePickerAndroid.open({
      value: dueDate ?? new Date(),
      minimumDate: new Date(),
      onChange: handleDueDateChange,
      mode: 'date',
    });
  }, [dueDate]);

  const handleAddTodoPress = useCallback(() => {
    if (!description || !dueDate) {
      return;
    }

    handleAddTodo({ description, dueDate });
    handleCloseAddTodoModal();
  }, [handleAddTodo, handleCloseAddTodoModal, description, dueDate]);
  const handleShow = useCallback(() => {
    setDescription('');
  }, [setDescription]);
  return (
    <Modal
      transparent
      onShow={handleShow}
      visible={doShowAddTodoModal}
      onDismiss={handleCloseAddTodoModal}
      onRequestClose={handleCloseAddTodoModal}
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
        <Text style={{ fontSize: 25 }}>Add new todo</Text>
        <TextInput
          style={{
            marginVertical: 40,
            backgroundColor: '#f5f5f5',
            width: '80%',
          }}
          value={description}
          onChangeText={handleDescriptionChange}
        />
        <Text>Due date: {dueDate?.toUTCString() ?? 'Not chosen'}</Text>
        <CustomButton
          style={{
            backgroundColor: !description ? 'gray' : 'blue',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          disabled={!description}
          onPress={handleChooseDatePress}
        >
          <Text style={{ color: 'white' }}>Choose date</Text>
        </CustomButton>
        <CustomButton
          style={{
            backgroundColor: !description || !dueDate ? 'gray' : 'green',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          disabled={!description || !dueDate}
          onPress={handleAddTodoPress}
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
          onPress={handleCloseAddTodoModal}
        >
          <Text style={{ color: 'white' }}>Cancel</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};

export { AddTodoModal, type AddTodoFormData };
