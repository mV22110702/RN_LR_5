import { StyleSheet, Text, View } from 'react-native';
import { TodoItem } from './App';
import { CustomButton } from './CustomButton';
import { useCallback } from 'react';

type Properies = {
  item: TodoItem;
  handleDeleteTodo: (todoId: string) => void;
};

const SectionItem: React.FC<Properies> = ({ item, handleDeleteTodo }) => {
  const handleDeleteTodoPress = useCallback(() => {
    handleDeleteTodo(item.id);
  }, []);
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardText}>{item.description}</Text>
      </View>
      <View>
        <Text style={styles.cardTextDate}>
          Due: {item.dueDate.toUTCString()}
        </Text>
      </View>
      <View style={{ width: '20%' }}>
        <CustomButton
          style={{
            backgroundColor: 'blue',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          onPress={handleDeleteTodoPress}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Done</Text>
        </CustomButton>
      </View>
    </View>
  );
};

export { SectionItem };

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  cardText: {
    fontSize: 30,
  },
  cardTextDate: {
    fontSize: 20,
  },
  hr: {
    height: StyleSheet.hairlineWidth,
  },
});
